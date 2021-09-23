import React from "react";
import { ReferenceInput, Datagrid, ReferenceField, AutocompleteInput, List, Show, Create, Edit, Filter, SimpleShowLayout, SimpleForm, TextField, TextInput, ShowButton, EditButton } from "react-admin";

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

export function GarajCreate(props) {
  // const { data, loading, error } = useQueryWithStore({ 
  //   type: 'getList',
  //   resource: 'users',
  //   payload: { pagination: { page: 1 , perPage: 10}, sort: { field: 'name', order: 'ASC' }, filter: {q:''}}
  // });

  return (
  <Create {...props} >
    <SimpleForm>
      <ReferenceInput label="Владелец" source="user" reference="users" sort={{ field: 'name', order: 'ASC' }}>
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="number" label="Номер" />
      <TextInput source="square" label="Площадь" />
    </SimpleForm>
  </Create>
  )
};

export function GarajEdit(props) {
  return(
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput label="Владелец" source="user" reference="users">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="number" label="Номер" />
      <TextInput source="square" label="Площадь" />
    </SimpleForm>
  </Edit>
  )
};