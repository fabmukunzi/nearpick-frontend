import {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  UserSchema,
} from '../../utils/types/auth';
import { baseAPI } from '../api';

// interface IGoogleSignupPayload {
//   username: string;
// }
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
    profile: builder.query<{ user: UserSchema }, void>({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
      providesTags: ['profile'],
    }),
    changePassword: builder.mutation<
      { message: string },
      { old_password: string; new_password: string }
    >({
      query: (body) => ({
        url: '/users/update-password',
        method: 'PATCH',
        body,
      }),
    }),
    updateProfile: builder.mutation<{ message: string }, FormData>({
      query: (body) => ({
        url: `/users/profile`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['profile'],
    }),
    verifyEmail: builder.query<{ message: string }, { token: string }>({
      query: ({ token }) => ({
        url: `/users/verify-email/${token}`,
        method: 'GET',
      }),
    }),
    getUsers: builder.query<{ items: UserSchema[] }, void>({
      query: () => ({
        url: `/users`,
        method: 'GET',
      }),
      providesTags: ['users'],
    }),

    changeAccountStatus: builder.mutation<
      { message: string },
      { status: string; userId: string }
    >({
      query: ({ status, userId }) => ({
        url: `/users/${userId}/status?status=${status}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['users'],
    }),
    changeUserRole: builder.mutation<
      { message: string },
      { role: string; userId: string }
    >({
      query: ({ role, userId }) => ({
        url: `/users/${userId}?role=${role}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['users'],
    }),
    deleteUser: builder.mutation<{ message: string }, { userId: string }>({
      query: ({ userId }) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
    // googleSignup: builder.mutation<AuthResponse, IGoogleSignupPayload>({
    //   query: (body) => ({
    //     url: 'v1/auth/google/register',
    //     method: 'POST',
    //     body,
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
    verifyCode: builder.mutation<any, { authCode: string; id?: string }>({
      query: ({ authCode, id }) => ({
        url: `/users/login/verify/${id}`,
        method: 'POST',
        body: authCode,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useProfileQuery,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useVerifyCodeMutation,
  useVerifyEmailQuery,
  useGetUsersQuery,
  useChangeAccountStatusMutation,
  useChangeUserRoleMutation,
  useDeleteUserMutation,
} = userEndpoints;
