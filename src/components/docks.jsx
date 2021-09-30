import React, {Fragment} from "react";
import { Datagrid, FileInput, BulkDeleteButton, UrlField, FileField, List, Show, Create, Edit, SimpleShowLayout, SimpleForm, TextField, TextInput } from "react-admin";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const BulkActionButtons = props => (
  <Fragment>
      <BulkDeleteButton {...props} />
  </Fragment>
);

const DownloadButton = props => {
  return (
    <Fragment>
      <Button variant="contained" href={props.record.fullurl} color="primary" size="small" startIcon={<SaveIcon />} > Скачать </Button>
    </Fragment>
)};


export const DockList = ({ permissions, ...props }) => {
  // console.log(linkToRecord(props.basePath || `/${props.resource}`, record.id));
  return (
    <List {...props} bulkActionButtons={permissions === 'admin' && <BulkActionButtons />} exporter={false}>
      <Datagrid>
        <TextField source="name" label="Название" />
        <DownloadButton />
      </Datagrid>
    </List>
  )
};

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
      <TextInput source="name" fullWidth={true} label="Название файла" />
    </SimpleForm>
  </Create>
);

export const DockEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <FileInput source="files" label="Документ">
        <FileField source="src" title="title" />
      </FileInput>
      <TextInput source="name" fullWidth={true} label="Название файла" />
    </SimpleForm>
  </Edit>
);