import * as React from "react";
import { Datagrid, ReferenceField, AutocompleteInput, List, Show, Create, Edit, Filter, SimpleShowLayout, SimpleForm, TextField, TextInput, ShowButton, EditButton } from "react-admin";
import { dataProvider } from '../utils/dataProvider';

let usersList = '';
dataProvider.getList('users', { pagination: { page: 1 , perPage: 10}, sort: { field: 'name', order: 'ASC' }, filter: {q:''}})
.then(response => usersList = response.data);

const GarajFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Поиск по номеру" source="number" alwaysOn />
  </Filter>
);

export const GarajList = (props) => (
  <List {...props} sort={{ field: 'number', order: 'ASC' }} filters={<GarajFilter />}>
    <Datagrid>
      <ReferenceField label="Владелец" source="user" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="number" label="Номер" />
      <TextField source="square" label="Площадь" />
      <ShowButton label="" />
      <EditButton label="" />
    </Datagrid>
  </List>
);

export const GarajShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <ReferenceField label="Владелец" source="user" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="number" label="Номер" />
      <TextField source="square" label="Площадь" />
    </SimpleShowLayout>
  </Show>
);

export const GarajCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <AutocompleteInput label="Владелец" optionText="name" source="user" choices={usersList} translateChoice={false} />
      <TextInput source="number" label="Номер" />
      <TextInput source="square" label="Площадь" />
    </SimpleForm>
  </Create>
);

export const GarajEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <AutocompleteInput label="Владелец" optionText="name" source="user" choices={usersList} translateChoice={false} />
      <TextInput source="number" label="Номер" />
      <TextInput source="square" label="Площадь" />
    </SimpleForm>
  </Edit>
);