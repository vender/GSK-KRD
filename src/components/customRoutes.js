import * as React from "react";
import { Route } from 'react-router-dom';
import { RouteWithoutLayout } from 'ra-core';
import Foo from './Foo';
import { MySetPasswordPage } from './SetPasswordPage';


const customRoutes = [
    <Route exact path="/foo" component={Foo} />,
    <RouteWithoutLayout noLayout path="/set-password" render={() => <MySetPasswordPage />}
    />
];

export default customRoutes;