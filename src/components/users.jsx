import * as React from "react";
import RichTextInput from 'ra-input-rich-text';
import { Datagrid, SearchInput, List, Show, Create, Edit, SimpleShowLayout, SimpleForm, TextField, TextInput, ShowButton, EditButton, DateInput, } from "react-admin";

const postFilters = [
  <SearchInput source="q" alwaysOn />,
];

export const UserList = (props) => (
  <List {...props} filters={postFilters}>
    <Datagrid>
      <TextField source="name" label="Ф.И.О" />
      <TextField source="member" label="Член ГСК с" sortable={false} />
      <TextField source="dolg" label="Сумма долга" sortable={false} />
      <ShowButton label="" />
      <EditButton label="" />
    </Datagrid>
  </List>
);

export const UserShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="name" label="Ф.И.О" />
      <TextField source="phone" label="Номер телефона" />
      <TextField source="adress" label="Адрес регистрации по месту жительства (пребывания)" />
      <TextField source="dolya" label="Доля земельного участка" />
      <TextField source="data" fullWidth="true" label="Дата и номер регистрации права собственности" />
      <TextField source="boxnum" label="Номер бокса (гаража)" />
      <TextField source="moneydate" label="Дата последнего взноса" />
      <TextField source="member" label="Член ГСК с" />
      <TextField source="dolg" label="Сумма долга" />
      <TextField source="about" multiline="true" label="Заметка" />
    </SimpleShowLayout>
  </Show>
);

export const UserCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextInput source="name" fullWidth="true" label="Ф.И.О" />
      <TextInput source="phone" label="Номер телефона" />
      <TextInput source="adress" fullWidth="true" label="Адрес регистрации по месту жительства (пребывания)" />
      <TextInput source="dolya" label="Доля земельного участка" />
      <TextInput source="data" fullWidth="true" label="Дата и номер регистрации права собственности" />
      <TextInput source="boxnum" label="Номер бокса (гаража)" />
      <DateInput source="moneydate" label="Дата последнего взноса" />
      <DateInput source="member" label="Член ГСК с" />
      <TextInput source="dolg" label="Сумма долга" />
      <RichTextInput source="about" multiline="true" label="Заметка" />
    </SimpleForm>
  </Create>
);

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" fullWidth="true" label="Ф.И.О" />
      <TextInput source="phone" label="Номер телефона" />
      <TextInput source="adress" fullWidth="true" label="Адрес регистрации по месту жительства (пребывания)" />
      <TextInput source="dolya" label="Доля земельного участка" />
      <TextInput source="data" fullWidth="true" label="Дата и номер регистрации права собственности" />
      <TextInput source="boxnum" label="Номер бокса (гаража)" />
      <DateInput source="moneydate" label="Дата последнего взноса" />
      <DateInput source="member" label="Член ГСК с" />
      <TextInput source="dolg" label="Сумма долга" />
      <RichTextInput source="about" multiline="true" label="Заметка" />
    </SimpleForm>
  </Edit>
);