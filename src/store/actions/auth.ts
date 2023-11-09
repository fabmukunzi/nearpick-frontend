import {
  AuthResponse,
  LoginPayload,
  SignupPayload,
} from '../../utils/types/auth';
import { baseAPI } from '../api';

interface IGoogleSignupPayload {
  username: string;
}
const userEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
    }),
    signup: builder.mutation<AuthResponse, SignupPayload>({
      query: (body) => ({
        url: '/users/register',
        method: 'POST',
        body,
      }),
    }),
    // googleSignup: builder.mutation<AuthResponse, IGoogleSignupPayload>({
    //   query: (body) => ({
    //     url: 'v1/auth/google/register',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // changePassword: builder.mutation<AuthResponse, { secretPhrase: string; password: string }>({
    //   query: (body) => ({
    //     url: 'v1/users/change-password',
    //     method: 'PATCH',
    //     body,
    //   }),
    // }),
    // profile: builder.query<GenericResponse<UserSchema>, void>({
    //   query: () => ({
    //     url: 'v1/users/profile',
    //     method: 'GET',
    //   }),
    // }),
    // uploadProfileImage: builder.mutation<AuthResponse, IUploadFileResponse>({
    //   query: (body) => ({
    //     url: `/v1/users/picture`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Profile'],
    // }),
    // updateProfile: builder.mutation<AuthResponse, UpdateProfilePayload>({
    //   query: (body) => ({
    //     url: `/v1/users/update-profile`,
    //     method: 'PATCH',
    //     body,
    //   }),
    //   invalidatesTags: ['Profile'],
    // }),
    // googleCallBack: builder.mutation<AuthResponse, { code: string }>({
    //   query: (body) => ({
    //     url: 'v1/auth/google',
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // imageRemoval: builder.mutation<AuthResponse, UpdateImagePayload>({
    //   query: ({ target }) => ({
    //     url: `/v1/users/remove-picture/${target}`,
    //     method: 'PATCH',
    //   }),
    // }),
    // requestOtp: builder.mutation<GenericResponse<{ email: string }>, string>({
    //   query: (body) => ({
    //     url: `v1/users/request-otp`,
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // resetPassword: builder.mutation<GenericResponse<{ message: string }>, IResetPasswordPayload>({
    //   query: (body) => ({
    //     url: `v1/users/resetPassword`,
    //     method: 'POST',
    //     body,
    //   }),
    // }),
    // checkUserName: builder.mutation<GenericResponse<{ taken: boolean }>, string>({
    //   query: (username) => ({
    //     url: `v1/users/username-checker/${username}`,
    //     method: 'GET',
    //   }),
    // }),
  }),
});

export const { useLoginMutation, useSignupMutation } = userEndpoints;
