import { API, baseApi } from "../../utils/api";

export const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<any, void>({
      query: () => "/Cart/get-products-from-cart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Cart/add-product-to-cart?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Cart"],
    }),

    deleteCart: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Cart/delete-product-from-cart?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    increase: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Cart/increase-product-in-cart?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Cart"],
    }),

    reduce: builder.mutation<void, number>({
      query: (id) => ({
        url: `/Cart/reduce-product-in-cart?id=${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<void, void>({
      query: () => ({
        url: "/Cart/clear-cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteCartMutation,
  useIncreaseMutation,
  useReduceMutation,
  useClearCartMutation,
} = cartApi;
