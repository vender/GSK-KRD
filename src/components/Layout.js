import React from "react";
import { Layout } from "react-admin";
import AppBar from './AppBar';

const customLayout = props => <Layout {...props} appBar={AppBar} />;

export default customLayout;