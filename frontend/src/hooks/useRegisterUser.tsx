import { useMutation } from '@tanstack/react-query';
import { ROUTES } from '../constants/routes';
import { registerUser } from '../services/auth';

export const useRegisterUser = () => {
    const { isError, mutate } = useMutation({ mutationFn: registerUser, onSuccess: () => window.location.replace(ROUTES.DASHBOARD) });
    return { mutate, isError };
};
