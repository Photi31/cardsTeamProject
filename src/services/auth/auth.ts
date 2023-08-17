import { createApi } from '@reduxjs/toolkit/query/react'

import { ResetPasswordMessage } from 'assets/email-messages/reset-password-message.ts'
import {
  ArgChangeProfile,
  CreateNewPasswordType,
  ForgotPasswordType,
  RegisterType,
  UserType,
} from 'services/auth/type.ts'
import { baseQueryWithReauth } from 'services/common/base-query-with-reauth.ts'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Me'],
  endpoints: build => ({
    me: build.query<UserType | null, void>({
      query: () => ({
        url: 'v1/auth/me',
      }),
      providesTags: ['Me'],
    }),
    login: build.mutation<void, { email: string; password: string; rememberMe?: boolean }>({
      query: body => ({
        url: 'v1/auth/login',
        method: 'POST',
        body,
      }),
      extraOptions: {
        maxRetries: 0,
      },
      invalidatesTags: ['Me'],
    }),
    changeProfile: build.mutation<any, ArgChangeProfile>({
      query: body => ({
        url: 'v1/auth/me',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Me'],
    }),
    register: build.mutation<any, RegisterType>({
      query: body => ({
        url: 'v1/auth/sign-up',
        method: 'POST',
        body,
      }),
    }),
    forgotPassword: build.mutation<any, ForgotPasswordType>({
      query: body => ({
        url: 'v1/auth/recover-password',
        method: 'POST',
        body: {
          ...body,
          html: ResetPasswordMessage,
        },
      }),
    }),
    createNewPassword: build.mutation<any, CreateNewPasswordType>({
      query: body => {
        const { token, password } = body

        return {
          url: `v1/auth/reset-password/${token}`,
          method: 'POST',
          body: { password },
        }
      },
    }),
    logout: build.mutation<unknown, void>({
      query: body => ({
        url: 'v1/auth/logout',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          authApi.util.updateQueryData('me', undefined, () => {
            return null
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})

export const {
  useMeQuery,
  useForgotPasswordMutation,
  useLogoutMutation,
  useLoginMutation,
  useRegisterMutation,
  useCreateNewPasswordMutation,
  useChangeProfileMutation,
} = authApi
