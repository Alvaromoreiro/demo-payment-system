import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './LoginForm.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginUser } from '../../hooks/useLoginUser';
import { LoginAuth } from '../../models/auth';
import { UserLoginSchema } from '../../schemas/auth';

export const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { isError, mutate } = useLoginUser();
    const onSubmit: SubmitHandler<LoginAuth> = (data) => mutate(data);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginAuth>({ resolver: zodResolver(UserLoginSchema) });

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} aria-label="Login Form">
                <h2>Login</h2>
                <label className={styles.srOnly} htmlFor="email">
                    Email
                </label>
                <input id="email" type="email" placeholder="email" {...register('email')} aria-invalid={errors.email ? 'true' : 'false'} />
                {errors.email && <span className={styles.error}>Este campo es obligatorio</span>}

                <label className={styles.srOnly} htmlFor="password">
                    password
                </label>
                <div className={styles.passwordWrapper}>
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="password"
                        {...register('password')}
                        aria-invalid={errors.password ? 'true' : 'false'}
                    />
                </div>
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className={styles.togglePasswordButton}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                    {showPassword ? 'Hide password' : 'Show password'}
                </button>
                {errors.password && <span className={styles.error}>Este campo es obligatorio</span>}

                <div className={styles.buttonGroup}>
                    <input type="submit" value="Login" aria-label="Iniciar sesión" />
                </div>
                {isError && <span className={styles.error}>Error al iniciar sesión</span>}
            </form>
        </div>
    );
};
