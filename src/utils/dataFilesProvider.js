import { dataProvider } from './dataProvider';
import { supabase } from './supabase';

const dataFilesProvider = {
    ...dataProvider,
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


        data.map(fileUrl => removeFile(fileUrl));

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
    // console.log([parts[1]+'/'+parts[2]]);
    return error;
};

export default dataFilesProvider;