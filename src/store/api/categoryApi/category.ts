import { baseApi } from "../../utils/api";
import type { SubCategory } from "../subCategoryApi/subCategory";

export interface Category {
  id: number;
  categoryImage: string;
  categoryName: string;
  subCategories: SubCategory[];
}


export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/Category/get-categories",
      transformResponse: (res: { data: Category[] }) => res.data,
    }),
  }),
});


export const categoryByIdApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategoryById: builder.query<Category, number>({
            query: (id) => `/Category/get-category-by-id?id=${id}`,
            transformResponse: (res: { data: Category }) => res.data,
        }),         
    })
});

export const {
  useGetCategoriesQuery: useGetCategoriesQuery,
} = categoryApi;

export const {
  useGetCategoryByIdQuery: useGetCategoryByIdQuery,
} = categoryByIdApi;
