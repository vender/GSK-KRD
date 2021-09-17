import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { UserList, UserShow, UserCreate, UserEdit } from './components/users';
import UserIcon from '@material-ui/icons/People';
import { FirebaseAuthProvider, FirebaseDataProvider } from 'react-admin-firebase';
import Dashboard from './components/Dashboard';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const firebaseConfig = {
  apiKey: "AIzaSyAyE8aSocFpN7rdr4SzyIcfnTgQkJBIE4Q",
  authDomain: "gsk-krd.firebaseapp.com",
  databaseURL: "https://gsk-krd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gsk-krd",
  storageBucket: "gsk-krd.appspot.com",
  messagingSenderId: "538029631041",
  appId: "1:538029631041:web:2e74333af2c68a7c3548c0",
  measurementId: "G-Z6TNCX7FB1"
};

const options = {};

const dataProvider = FirebaseDataProvider(firebaseConfig, options);
const authProvider = FirebaseAuthProvider(firebaseConfig, options);

const App = () => (
    <Admin dashboard={Dashboard} title="My Custom Admin" dataProvider={dataProvider} authProvider={authProvider} i18nProvider={i18nProvider} >
        <Resource name="users" options={{ label: 'Владельцы' }} icon={UserIcon} list={UserList} show={UserShow} create={UserCreate} edit={UserEdit} />
    </Admin>
);

export default App;