import * as React from "react";
import { Route } from 'react-router-dom';
// import { RouteWithoutLayout } from 'react-admin';
import Foo from './Foo';
// import { SetPasswordPage } from './SetPasswordPage';
// import Bar from './Bar';
// import { authRoutes } from 'ra-supabase';

const customRoutes = [
    <Route exact path="/foo" component={Foo} />
];

export default customRoutes;