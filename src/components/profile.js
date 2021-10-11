import React from "react";
import { Toolbar, TextField, SaveButton, TextInput, Edit, SimpleForm, useGetIdentity, SaveContextProvider, Loading } from "react-admin";

const CustomToolbar = props => (
    <Toolbar {...props}>
        <SaveButton />
    </Toolbar>
);

export const ProfileEdit = ({ staticContext, ...props }) => {
  const { identity, loading } = useGetIdentity();
  if (loading) { return <Loading />; }

  return (
    <SaveContextProvider>
        <Edit title="Мои данные" id={identity.id} resource="users" basePath="/profile" redirect={false} {...props}>
            <SimpleForm toolbar={<CustomToolbar />}>
                <TextInput source="name" fullWidth={true} label="Ф.И.О" />
                <TextInput source="phone" label="Номер телефона" />
                <TextInput source="adress" fullWidth={true} label="Адрес регистрации по месту жительства (пребывания)" />
                <TextField source="dolya" label="Доля земельного участка" />
                <TextField source="data" label="Дата и номер регистрации права собственности" />
                <TextField source="boxnum" label="Номер бокса (гаража)" />
                <TextField source="moneydate" label="Дата последнего взноса" />
                <TextField source="member" label="Член ГСК с" />
                <TextField source="dolg" label="Сумма долга" />
            </SimpleForm>
        </Edit>
    </SaveContextProvider>
  );
};