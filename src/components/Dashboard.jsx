import * as React from "react";
import {CardContent,Card} from '@material-ui/core';
import { Title } from 'react-admin';

const Dashboard = () => (
    <Card>
        <Title title="Welcome to the administration" />
        <CardContent>Lorem ipsum sic dolor amet...</CardContent>
    </Card>
);

export default Dashboard;