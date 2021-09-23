import dotenv from "dotenv";
import * as React from "react";
import { Admin, Resource } from 'react-admin';
import { UserList, UserShow, UserCreate, UserEdit } from './components/users';
import { GarajList, GarajShow, GarajCreate, GarajEdit } from './components/garaji';
import { DockList, DockShow, DockCreate, DockEdit } from './components/docks';
import UserIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import Dashboard from './components/Dashboard';
import polyglotI18nProvider from 'ra-i18n-polyglot';
import russianMessages from 'ra-language-russian';
// import { authRoutes } from 'ra-supabase';
import dataFilesProvider from './utils/dataFilesProvider';
import { authProvider } from './utils/authProvider';
import SignIn from './components/Login';
import customRoutes from './components/customRoutes';

dotenv.config();
const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru');

const App = () => (
    <Admin dashboard={Dashboard} dataProvider={dataFilesProvider} loginPage={SignIn} authProvider={authProvider} customRoutes={customRoutes} i18nProvider={i18nProvider} >
        <Resource name="users" options={{ label: 'Владельцы' }} icon={UserIcon} list={UserList} show={UserShow} create={UserCreate} edit={UserEdit} />
        <Resource name="garaji" options={{ label: 'Гаражи' }} icon={HomeIcon} list={GarajList} show={GarajShow} create={GarajCreate} edit={GarajEdit} />
        <Resource name="docks" options={{ label: 'Документы' }} icon={DescriptionIcon} list={DockList} show={DockShow} create={DockCreate} edit={DockEdit} />
    </Admin>
);

export default App;