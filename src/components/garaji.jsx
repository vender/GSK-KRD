import React, {Fragment} from "react";
import { ReferenceInput, SearchInput, BulkDeleteButton, Datagrid, ReferenceField, AutocompleteInput, List, Show, Create, Edit, Filter, SimpleShowLayout, SimpleForm, TextField, TextInput, ShowButton, EditButton } from "react-admin";

const GarajFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Поиск по номеру" source="number" alwaysOn />
  </Filter>
);

const BulkActionButtons = props => (
  <Fragment>
      <BulkDeleteButton {...props} />
  </Fragment>
);

export const GarajList = ({ permissions, ...props }) => (
  <List {...props} bulkActionButtons={permissions === 'admin' && <BulkActionButtons />} sort={{ field: 'number', order: 'ASC' }} filters={<GarajFilter />}>
    <Datagrid>
      <ReferenceField label="Владелец" source="user" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="number" label="Номер" />
      <TextField source="square" label="Площадь" />
      <ShowButton label="" />
      {permissions === 'admin' &&
        <EditButton label="" />}
    </Datagrid>
  </List>
);

export const GarajShow = ({ permissions, ...props }) => (
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

export function GarajCreate ({ permissions, ...props }) {
  return(
    <Create title="Добавить гараж" {...props} >
      <SimpleForm>
        <ReferenceInput label="Владелец" source="user" reference="users" sort={{ field: 'name', order: 'ASC' }} emptyValue={null} allowEmpty emptyText="-Отсутствует-">
          <AutocompleteInput optionText="name" emptyValue="null" emptyText="Отсутствует" allowEmpty={true} />
        </ReferenceInput>
        <TextInput source="number" label="Номер" />
        <TextInput source="square" label="Площадь" />
      </SimpleForm>
    </Create>
  )
};

export function GarajEdit({ permissions, ...props }) {
  return(
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput label="Владелец" source="user" reference="users" sort={{ field: 'name', order: 'ASC' }} emptyValue={null} allowEmpty emptyText="-Отсутствует-">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <TextInput source="number" label="Номер" />
      <TextInput source="square" label="Площадь" />
    </SimpleForm>
  </Edit>
  )
};