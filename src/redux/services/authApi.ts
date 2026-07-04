/* eslint-disable @typescript-eslint/no-explicit-any */
// import { setToken } from '@/redux/authSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type ApiResponse<T = any> = {
    data: T
    status: string
    message: string
}

type AuthResponse = ApiResponse<null> & {
    token: string
}

type LoginResponse = {
    status: string
    token: string
    message: string
    data: {
        role: string
        id: string
        email: string
    } | null
}

type UserProfileData = {
    id: string;
    email: string;
    full_name: string;
    username: string;
    role: string;
    phone: string;
    avatar: string;
    created_at: string;
  
    // add any other fields like phone, avatar URL, etc.
   // add any other fields like phone, avatar URL, etc.
}

export const authApi = createApi({
    reducerPath: 'authApi',
    tagTypes: ['User'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://golang-fashion-backend.onrender.com',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as any).auth.token

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        register: builder.mutation<ApiResponse, { username: string; fullname: string, email: string; password: string }>({
            query: (credentials) => ({
                url: '/users/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation<LoginResponse, { email: string; password: string }>({
            query: (credentials) => ({
                url: '/users/login',
                method: 'POST',
                body: credentials,
            }),
            // async onQueryStarted(_, { dispatch, queryFulfilled }) {
            //     try {
            //         const { data } = await queryFulfilled
            //         console.log('Login data', data);
            //         dispatch(setToken(data.token))
            //     } catch (error) {
            //         console.error('Login failed:', error);
            //     }
            // },
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
            invalidatesTags: ['User'],
        }),
        getUser: builder.query<ApiResponse, string>({
            query: (id) => `/users/${id}`,
            providesTags: ['User'],
        }),
        getUserProfile: builder.query<ApiResponse<UserProfileData>, void>({
            // Since we don't pass arguments, the query is just the endpoint string
            query: () => `/users/userprofile`,
            providesTags: ['User'],
        }),
    }),
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetUserQuery,
    useLazyGetUserQuery,
    useGetUserProfileQuery,
} = authApi