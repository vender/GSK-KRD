import * as React from "react";
import RichTextInput from 'ra-input-rich-text';
import { Datagrid, List, Show, Create, Edit, Filter, SimpleShowLayout, SimpleForm, TextField, NumberInput, TextInput, ShowButton, EditButton, DateInput, } from "react-admin";

const UserFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Поиск" source="title" alwaysOn />
  </Filter>
);

export const UserList = (props) => (
  <List {...props} filters={<UserFilter />}>
    <Datagrid>
      <TextField source="name" label="Ф.И.О" />
      <TextField source="phone" label="Номер телефона" />
      <TextField source="adress" label="Адрес" />
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
      <TextField source="adress" label="Адрес" />
      <TextField source="dolya" label="Доля земельного участка" />
      <TextField source="data" fullWidth="true" label="Дата и номер регистрации права собственности" />
      <TextField source="boxnum" label="Номер бокса (гаража)" />
      <TextField source="moneydate" label="Дата последнего взноса" />
      <TextField source="dolg" label="Сумма долга" />
      <TextField source="about" multiline="true" label="Заметка" />
    </SimpleShowLayout>
  </Show>
);

export const UserCreate = (props) => (
  <Create {...props} >
    <SimpleForm>
      <TextInput source="name" label="Ф.И.О" />
      <TextInput source="phone" label="Номер телефона" />
      <TextInput source="adress" label="Адрес" />
      <NumberInput source="dolya" label="Доля земельного участка" />
      <TextInput source="data" fullWidth="true" label="Дата и номер регистрации права собственности" />
      <TextInput source="boxnum" label="Номер бокса (гаража)" />
      <DateInput source="moneydate" label="Дата последнего взноса" />
      <TextInput source="dolg" label="Сумма долга" />
      <RichTextInput source="about" multiline="true" label="Заметка" />
    </SimpleForm>
  </Create>
);

export const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" label="Ф.И.О" />
      <TextInput source="phone" label="Номер телефона" />
      <TextInput source="adress" label="Адрес" />
      <NumberInput source="dolya" label="Доля земельного участка" />
      <TextInput source="data" fullWidth="true" label="Дата и номер регистрации права собственности" />
      <TextInput source="boxnum" label="Номер бокса (гаража)" />
      <DateInput source="moneydate" label="Дата последнего взноса" />
      <TextInput source="dolg" label="Сумма долга" />
      <RichTextInput source="about" multiline="true" label="Заметка" />
    </SimpleForm>
  </Edit>
);