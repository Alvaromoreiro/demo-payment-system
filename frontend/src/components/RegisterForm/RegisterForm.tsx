import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './RegisterForm.module.css';
import { useRegisterUser } from '../../hooks/useRegisterUser';
import { UserRegisterSchema } from '../../schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterAuth } from '../../models/auth';

export const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterAuth>({ resolver: zodResolver(UserRegisterSchema) });
    const { isError, mutate } = useRegisterUser();
    const onSubmit: SubmitHandler<RegisterAuth> = (data) => mutate(data);

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit(onSubmit)} aria-label="Register Form">
                <h2>Register</h2>
                <label className={styles.srOnly} htmlFor="email">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="email"
                    {...register('email', { required: true })}
                    aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email && <span className={styles.error}>{errors.email?.message || 'Required field'}</span>}

                <label className={styles.srOnly} htmlFor="password">
                    password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="password"
                    {...register('password', { required: true })}
                    aria-invalid={errors.password ? 'true' : 'false'}
                />
                {errors.password && <span className={styles.error}>{errors.password?.message || 'Required field'}</span>}

                <label className={styles.srOnly} htmlFor="confirmPassword">
                    Repeat password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="password"
                    {...register('confirmPassword', { required: true })}
                    aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                />
                {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword?.message || 'Este campo es obligatorio'}</span>}

                <div className={styles.buttonGroup}>
                    <input type="submit" value="Register" aria-label="Registrarse" />
                </div>
                {isError && <span className={styles.error}>Error al registrarse</span>}
            </form>
        </div>
    );
};
