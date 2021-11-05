import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import axios from 'axios';
import { Notification, useNotify, Loading } from 'react-admin';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUp = () => {
  const classes = useStyles();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    
    const fio = `${e.target[0].value} ${e.target[2].value} ${e.target[4].value}`;
    let { data: users, error: Uerror } = await supabase
      .from('users')
      .select('name, id')
      .eq('name', fio)
    if(Uerror) return notify(Uerror.message, 'info', {}, false);

    if(users.length === 0) return notify(`Такой собственник не найден`, 'info', {}, false);
    let { data: garaji, error: Gerror } = await supabase
      .from('garaji')
      .select('user, number')
      .eq('user', users[0].id)

    if(Gerror) return notify(Gerror.message, 'info', {}, false);

    if(garaji.some(item => item.number == e.target[6].value)) {
      setLoading(true);
      let { user, error: Rerror } = await supabase.auth.signUp({
        email: `${e.target[8].value}`,
        password: `${e.target[10].value}`
      })
      if(Rerror) return notify(Rerror.message, 'info', {}, false);

      if(user) {
        const { data, Uerror } = await supabase
          .from('users')
          .update({ email: user.email })
          .eq('name', fio)
        if(Uerror) notify(Uerror.message, 'info', {}, false);

        axios({
          method: 'post',
          url: '/mail/process.php',
          headers: { 'content-type': 'application/json' },
          data: {email: user.email,fio: fio, garaj: e.target[6].value}
        })
          .then(result => {
            e.target.reset();
            setLoading(false);
            notify(`Вам на почту отправленно письмо с подтверждением.`, 'info', {}, false, 5000);
          })
          .catch(error => console.log(error));
      }
    } else {
      return notify(`Собственник и номер гаража не совпадают`, 'info', {}, false);
    }

  };

  if (loading) { return <Loading />; }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Регистрация
        </Typography>
        <form className={classes.form} onSubmit={submit}>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                name="lastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Фамилия"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Имя"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="secondName"
                variant="outlined"
                required
                fullWidth
                id="secondName"
                label="Отчество"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="garaj"
                variant="outlined"
                required
                fullWidth
                id="garaj"
                label="Номер гаража"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email адрес"
                name="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            зарегистрироваться
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#/login" variant="body2">
                Уже зарегистрированы? Войти
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Notification />
    </Container>
  );
}