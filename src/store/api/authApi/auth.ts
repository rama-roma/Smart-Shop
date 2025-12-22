import { baseApi } from "../../utils/api";

interface AuthResponse {
  data: string; 
}

export interface AuthState {
  user: null | string;
  token: null | string;
  userData: null | string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/Account/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: build.mutation<
      AuthResponse,
      {
        userName: string;
        phoneNumber: string;
        email: string;
        password: string;
        confirmPassword: string;
      }
    >({
      query: (body) => ({
        url: "/Account/register",
        method: "POST",
        body,
      }),
    }),
    userProfile: build.query<AuthResponse, number>({
      query: (id) => ({
        url: `/UserProfile/get-user-profile-by-id?id=${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation, useUserProfileQuery } = authApi;
