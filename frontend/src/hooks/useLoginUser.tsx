import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../services/auth';
import { ROUTES } from '../constants/routes';

export const useLoginUser = () => {
    const { isError, mutate } = useMutation({ mutationFn: loginUser, onSuccess: () => window.location.replace(ROUTES.DASHBOARD) });
    return { mutate, isError };
};
