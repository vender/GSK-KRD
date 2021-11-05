import * as React from "react";
import { Route } from 'react-router-dom';
import { RouteWithoutLayout } from 'react-admin';
import { ProfileEdit } from './profile';
import { SignUp } from './SignUp';

const customRoutes = [
    <Route key="profile" path="/profile" component={ProfileEdit} />,
    <RouteWithoutLayout exact path="/register" component={SignUp} />,
];

export default customRoutes;