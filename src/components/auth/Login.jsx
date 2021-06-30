import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props) {

    const classes = useStyles();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    let [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const isFormValid = () => {    //интересует
        let isValid = true;
        let errorsData = {};

        if (!email) {
            errorsData.name = true;
            isValid = false;
        }

        if (!password) {
            errorsData.profession = true;
            isValid = false;
        }

        setErrors(errorsData);

        return isValid;
    }
    const onSubmit = (event) => {

        axios.post('http://127.0.0.1:9001/api/login', { email: email, password: password })
            .then(result => {
                if (result.data.message) {
                    return;
                }
                console.log(result, 'login');
                props.setUser(result.data.user);
                sessionStorage.setItem('user', JSON.stringify(result.data.user)); //интересует  JSON.stringify-для того, 
                //что-б преобразовать данные result.data.user в JSON строку и обратно в массив (по команде ..Storage данные сохраняются но преобразуются в строку)
                // и где JSON.parse(result.data.user) getItem?? для преобразования данных в массив и получения их
                localStorage.setItem('passport', result.data.access_token);

                window.location.href = '/';
            });

        if (!isFormValid()) {
            return;
        }
    }
    const handleEmailChange = (event) => {
        let clonedErrors = Object.assign({}, errors);  //интересует
        if (!event.target.value) {
            clonedErrors.email = true;
        } else {
            clonedErrors.email = false;
        }
        setErrors(clonedErrors);
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        let clonedErrors = Object.assign({}, errors);
        if (!event.target.value) {
            clonedErrors.password = true;
        } else {
            clonedErrors.password = false;
        }
        setErrors(clonedErrors);
        setPassword(event.target.value);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={(event) => handleEmailChange(event)}

                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => handlePasswordChange(event)}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(event) => onSubmit(event)}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}
