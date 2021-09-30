import { dataProvider, resources } from './dataProvider';
import { supabase } from './supabase';

const dataFilesProvider = {
    ...dataProvider,
    getList: async (resource, params) => {
        return getList({ supabase, resources, resource, params });
    },
    create: async (resource, params) => {
        if (!params.data.files) {
            return dataProvider.create(resource, params);
        }

        const fileSrc = await uploadFile(params.data);

        return dataProvider.create(resource, {
            data: {
                ...params.data,
                files: {
                    src: fileSrc.Key,
                    title: params.data.files.title
                },
                src: fileSrc.Key,
                fullurl: 'https://vjsfowlwcghxnnklprpu.supabase.in/storage/v1/object/public/'+fileSrc.Key,
                name: params.data.name
            }
        });
    },
    delete: async (resource, { id, previousData }) => {
        if(!previousData.src) {
            return dataProvider.delete(resource, id);
        }

        await removeFile(previousData);
        return dataProvider.delete(resource, {
            id: id
        });
    },
    deleteMany: async (resource, { ids }) => {
        const { data, err } = await supabase
        .from(resource)
        .select()
        .in('id', ids);

        if (err) {
            throw err;
        }

        data.map(fileUrl => {
            if(fileUrl.src) return removeFile(fileUrl)
            return null
        });

        const { data: records, error } = await supabase
            .from(resource)
            .delete()
            .in('id', ids);

        if (error) {
            throw error;
        }
        return { data: records?.map(record => record.id) };
    },
};

const uploadFile = async (file) => {
    const { data, error } = await supabase
    .storage
    .from('user-data')
    .upload('files/'+file.files.title, file.files.rawFile, {
        cacheControl: '3600',
        upsert: false
    })
    if(error){
        console.log('Error: ', error)
    }
    return data;
};

const removeFile = async (file) => {
    const parts = file.src.split('/');
    const { error } = await supabase
    .storage
    .from('user-data')
    .remove([parts[1]+'/'+parts[2]])
    if(error) {
        throw error
    }
    return error;
};

const getList = async ({ supabase, resources, resource, params }) => {
    const {
        pagination,
        sort,
        filter: { q, ...filter },
    } = params;

    const resourceOptions = resources[resource];
    const fields = Array.isArray(resourceOptions)
        ? resourceOptions
        : resourceOptions.fields;

    const rangeFrom = (pagination.page - 1) * pagination.perPage;
    const rangeTo = rangeFrom + pagination.perPage;

    let query = supabase
        .from(resource)
        .select(fields.join(', '), { count: 'exact' })
        .order(sort.field, { ascending: sort.order === 'ASC' })
        .range(rangeFrom, rangeTo);

    if (Object.keys(filter).length > 0) {
        console.log(Object.entries(filter));
        query.or(
            Object.entries(filter).map(field => field[1] > 0 ? `${field[0]}.eq.${field[1]}` : `${field[0]}.gt.${field[1]}`).join(',')
        );
    } else {
        query.match(filter)
    }

    if (q) {
        const fullTextSearchFields = Array.isArray(resourceOptions)
            ? resourceOptions
            : resourceOptions.fullTextSearchFields;

        query.or(
            fullTextSearchFields.map(field => `${field}.ilike.%${q}%`).join(',')
        );
    }

    const { data, error, count } = await query;

    if (error) {
        throw error;
    }
    return { data: data ?? [], total: count ?? 0 };
};

export default dataFilesProvider;