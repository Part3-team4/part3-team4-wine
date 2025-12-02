import { authApi } from '../api/authApi';
import type { SignInFormData } from '../types/signIn.types';
import type { SignUpRequest } from '../types/signUp.types';

/**
 * Auth Mutation Options
 */
export const authMutations = {
  signIn: () => ({
    mutationFn: (data: SignInFormData) => authApi.signIn(data),
  }),

  signUp: () => ({
    mutationFn: (data: SignUpRequest) => authApi.signUp(data),
  }),
};
