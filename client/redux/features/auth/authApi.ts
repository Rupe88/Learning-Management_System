import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration } from "../auth/authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //end points here sign up
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    //activation token
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "auth/activate-user",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),
    //login
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.activationToken,
              user: result.data.user,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useActivationMutation ,useLoginMutation} = authApi;
