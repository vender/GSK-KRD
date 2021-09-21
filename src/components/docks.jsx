import * as React from "react";
import { Datagrid, FileInput, UrlField, FileField, List, Show, Create, Edit, Filter, SimpleShowLayout, SimpleForm, TextField, TextInput, ShowButton, EditButton } from "react-admin";

const DockFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Поиск по номеру" source="number" alwaysOn />
  </Filter>
);

export const DockList = (props) => (
  <List {...props} filters={<DockFilter />}>
    <Datagrid>
      <TextField source="name" />
      <ShowButton label="" />
      <EditButton label="" />
    </Datagrid>
  </List>
);

export const DockShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <UrlField source="fullurl" label="Документ" />
      <TextField source="name" label="Название файла" />
    </SimpleShowLayout>
  </Show>
);

export const DockCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <FileInput source="files" label="Документ">
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput source="name" fullWidth="true" label="Название файла" />
    </SimpleForm>
  </Create>
);

export const DockEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <FileInput source="files" label="Документ">
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput source="name" fullWidth="true" label="Название файла" />
    </SimpleForm>
  </Edit>
);