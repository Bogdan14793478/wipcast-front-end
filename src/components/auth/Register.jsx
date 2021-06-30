import react, { useState } from 'react';
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

const useStyles = makeStyles((theme) => ({      // зачем это? оно применяется 1 раз перед конст
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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function Register(props) {
    const classes = useStyles();

    const [name, setName] = useState();   //обьявили State для хранения имени 
    const [email, setEmail] = useState();   //обьявили State для хранения имейла
    const [password, setPassword] = useState();  //обьявили State для хранения пароля
    const [confirmPassword, setConfirmPassword] = useState();  //обьявили State для хранения конфиг-пароля
    const [errors, setErrors] = useState({});  //обьявили State для хранения ошибок

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleNameChange = (event) => {           //функция получает событие из инпута и передает в setName
        setName(event.target.value);
        const clonedErrors = { ...errors };         //clonedErrors копирует массив errors для перезаписи ошибок в clonedErrors
        if (event.target.value.length === 0) {      //если длина введенного текста в инпуте равна 0
            const clonedErrors = { ...errors };     // clonedErrors = массиву errors и выдает ошибку
            clonedErrors.name = "name is requaired fieled"    // имя ошибки name is requaired fieled
        } else {
            delete clonedErrors.name;                          //или массив с копиями ошибок удаляется 
        }
        setErrors(clonedErrors);                       //для перезаписи ошибки в массив clonedErrors ???
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);

        const clonedErrors = { ...errors };
        const isValidEmail = validateEmail(event.target.value);   //проверяет на валидность введенное в инпут
        if (!isValidEmail && event.target.value.length > 0) {     //если не валиден и длина текста в инпуте > 0
            clonedErrors['email'] = 'Email is not valid';          //массив клонированной ошибки = .. почему имя в верху?
        } else {
            delete clonedErrors.email;
        }
        setErrors(clonedErrors);
    }

    const handlePasswordChange = (event) => {                   //получает событие 
        setPassword(event.target.value);                        //сравнивает полученное в инпуте с массивом password
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    const validatePassword = () => {
        const clonedError = { ...errors }
        if (confirmPassword !== password) {
            clonedError['confirmPassword'] = 'Невідповідність паролів';
        } else {
            delete clonedError.confirmPassword;
        }
        setErrors(clonedError);
    }

    const onSubmit = () => {
        if ((!name && !email) || Object.keys(errors).length !== 0) {  //если не имя и не имейл или в еррор есть названия ключей и их длина не равна 0 \ почему ключи а не значения??
            return;                                                 //возврат
        }                                                           //если вверху ошибка, то сформировать запрос к аксиос с получаемыми переменными name: name ... confirmPassword???

        axios.post('http://127.0.0.1:9001/api/register', { name: name, email: email, password: password, password_confirmation: confirmPassword })
            .then(result => {                                              //потом результат ответа если:
                if (result.data.user) {                                     //если результат дата юзер?
                    props.setUser(result.data.user)                         //с Апп - передать пропс в Апп результат дата юзер?
                    localStorage.setItem('password', result.data.access_token); //куда сетАйтем и где локалсторедж?? не нашел, передаем в сетАйтем ключ пароль с результатом токеном
                    window.location.href = '/';                             //возвращает адрес URL на главную страницу?? или что отображает в урле ?
                }
                if (result.error) {
                    localStorage.setItem('passporrt', result.data.access_token)
                }
            });
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                            error={errors.hasOwnProperty('name')}   //интересует
                            autoComplete="name"
                            name="name"
                            variant="outlined"
                            required
                            fullWidth
                            id="name"
                            label="name"
                            autoFocus
                            onChange={(event) => handleNameChange(event)}   //интересует
                            helperText={errors.hasOwnProperty('name') ? errors.name : ""}   //интересует
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            error={errors.hasOwnProperty('email')}
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(event) => handleEmailChange(event)}
                            helperText={errors.hasOwnProperty['email'] ? errors.email : ""}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) => handlePasswordChange(event)}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password-confiration"
                            label="Password Confirmation"
                            type="password"
                            id="password-confiration"
                            autoComplete="password-confiration"
                            onChange={(event) => handleConfirmPasswordChange(event)}
                            onBlur={validatePassword}     //интересует
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => onSubmit()}
                >
                    Sign Up
                </Button>
                <Grid container justify="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}