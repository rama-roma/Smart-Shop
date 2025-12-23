import { API, baseApi } from "../../utils/api";

interface AuthResponse<T = any> {
  data: T;
}

export interface AuthState {
  user: null | string;
  token: null | string;
  userData: null | string;
}

export interface UserProfile {
  userName: string;
  phoneNumber: string;
  email: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, { userName: string; password: string }>({
      query: (credentials) => ({
        url: `${API}/Account/login`,
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
        url: `${API}/Account/register`,
        method: "POST",
        body,
      }),
    }),
    userProfile: build.query<AuthResponse<UserProfile>, string>({
      query: (id) => ({
        url: `${API}/UserProfile/get-user-profile-by-id?id=${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});
export const { useLoginMutation, useRegisterMutation, useUserProfileQuery } =
  authApi;
