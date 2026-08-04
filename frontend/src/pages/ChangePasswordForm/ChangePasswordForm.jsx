import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "./changepasswordform.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { selectIsAuth, fetchRegister } from "../../redux/slices/auth";
import instance from "../../Axios";



export const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset, formState: { errors, isValid } } = useForm({
    mode: 'onChange',
  });


  const newPasswordValue = watch('newPassword');

  const onSubmit = async (values) => {
    try {
      const { data } = await instance.patch('api/auth/changepassword', {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      if (data.success) {
        alert('Пароль успешно обновлен!');
        reset();
        navigate('/admin') 
      }
    } catch (err) {
      console.warn(err);
      alert(err.response?.data?.message || 'Ошибка при смене пароля');
    }
  };

  return (
    <Paper style={{ padding: 30, maxWidth: 400, margin: '50px auto' }} elevation={3}>
      <Typography variant="h6" style={{ marginBottom: 20 }}>
        Смена пароля администратора
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Текущий пароль */}
        <TextField
          type="password"
          label="Текущий пароль"
          fullWidth
          margin="normal"
          error={Boolean(errors.oldPassword?.message)}
          helperText={errors.oldPassword?.message}
          {...register('oldPassword', { required: 'Введите текущий пароль' })}
        />

      
        <TextField
          type="password"
          label="Новый пароль"
          fullWidth
          margin="normal"
          error={Boolean(errors.newPassword?.message)}
          helperText={errors.newPassword?.message}
          {...register('newPassword', {
            required: 'Введите новый пароль',
            minLength: { value: 6, message: 'Минимум 6 символов' },
          })}
        />

       
        <TextField
          type="password"
          label="Подтвердите новый пароль"
          fullWidth
          margin="normal"
          error={Boolean(errors.confirmPassword?.message)}
          helperText={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Повторите новый пароль',
            validate: (value) => value === newPasswordValue || 'Пароли не совпадают',
          })}
        />

        <Button
          disabled={!isValid}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 20 }}
        >
          Сохранить новый пароль
        </Button>
      </form>
    </Paper>
  );
};
