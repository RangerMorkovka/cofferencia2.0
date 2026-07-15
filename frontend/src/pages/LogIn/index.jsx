import React , {useEffect} from 'react';
import  {Typography}  from '@mui/material';
import {TextField} from '@mui/material';
import {Paper} from '@mui/material';
import {Button} from '@mui/material';
import styles from './Login.module.css';
import { useForm } from 'react-hook-form'; //библиотека для работы с формами
import { useDispatch, useSelector } from 'react-redux';// изменение и получение данных
import {fetchAuth, selectIsAuth} from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 

    const Login = () => {
  const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {
        register, handleSubmit, formState: {errors, isValid},
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        mode: "onChange",

    });
   
    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));
        if(!data.payload){
            return alert ("Не удалось авторизоваться!");
            console.log(data);
        }
        if('token' in data.payload){
            window.localStorage.setItem('token', data.payload.token)
        }else{
            alert('Не удалось авторизоваться!');
        }
    };
    if(isAuth){
        return <Navigate to= "/" />
    };
    
    return(
            <Paper classes= {{root: styles.root}}>
                <Typography classes={{root: styles.title}} variant = 'h5'>
                    Вход в аккаунт
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                            className = {styles.field}
                            label= 'username'
                            type= "text"
                           error= {Boolean(errors.username?.message)}
                           helperText= {errors.username?.message}
                            {...register("username", {required: 'Введите логин'})}
                            fullWidth
                    />
                    <TextField 
                    className = {styles.field}
                    label= 'Пароль'
                    type = 'password'
                    error = {Boolean(errors.password?.message)}
                    helperText = {errors.password?.message}
                    {...register('password',{required: 'Укажите пароль'})}
                    fullWidth
                    />
                    <Button
                            disabled = {!isValid}
                            type = 'submit'
                            size = 'large'
                            variant = 'contained'
                            fullWidth
                    >
                        Войти
                    </Button>
                </form>
                </Paper>
    )
}
export default Login;