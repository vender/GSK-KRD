import * as React from "react";
import {Container,Grid,Typography,Card,CardContent,makeStyles,Button} from '@material-ui/core';
import { useQueryWithStore } from 'react-admin';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

const Dashboard = () => {
    const classes = useStyles();
    const { total:users } = useQueryWithStore({ 
        type: 'getList',
        resource: 'users',
        payload: { pagination: { page: 1, perPage: 1 }, sort: { field: 'id', order: 'ASC' }, filter: {q:''} }
    });
    const { total:garaji } = useQueryWithStore({ 
        type: 'getList',
        resource: 'garaji',
        payload: { pagination: { page: 1, perPage: 1 }, sort: { field: 'id', order: 'ASC' }, filter: {q:''} }
    });
    const { total:docks } = useQueryWithStore({ 
        type: 'getList',
        resource: 'docks',
        payload: { pagination: { page: 1, perPage: 1 }, sort: { field: 'id', order: 'ASC' }, filter: {q:''} }
    });

    return(
    <Container maxWidth="lg">
        <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Владельцев - {users}
                        </Typography>
                        <Button variant="contained" href="#/users" color="primary">Открыть</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Гаражей - {garaji}
                        </Typography>
                        <Button variant="contained" href="#/garaji" color="primary">Открыть</Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Документов - {docks}
                        </Typography>
                        <Button variant="contained" href="#/docks" color="primary">Открыть</Button>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </Container>
    )
};

export default Dashboard;