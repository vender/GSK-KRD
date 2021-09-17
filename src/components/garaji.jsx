import * as React from "react";
import { Datagrid, ReferenceInput, ReferenceField, AutocompleteInput, List, Show, Create, Edit, Filter, SimpleShowLayout, SimpleForm, TextField, TextInput, ShowButton, EditButton } from "react-admin";

const GarajFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Поиск" source="name" alwaysOn />
  </Filter>
);

export const GarajList = (props) => (
  <List {...props} filters={<GarajFilter />}>
    <Datagrid>
      <ReferenceField label="Владелец" source="user.id" reference="users">
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
      <ReferenceField label="Владелец" source="user.id" reference="users">
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
      <ReferenceInput label="Владелец" source="user.id" reference="users">
        <AutocompleteInput optionText="name" translateChoice={false} />
      </ReferenceInput>
      <TextInput source="number" label="Номер" />
      <TextInput source="square" label="Площадь" />
    </SimpleForm>
  </Create>
);

export const GarajEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput label="Владелец" source="user.id" reference="users">
        <AutocompleteInput optionText="name" translateChoice={false} />
      </ReferenceInput>
      <TextInput source="number" label="Номер" />
      <TextInput source="square" label="Площадь" />
    </SimpleForm>
  </Edit>
);