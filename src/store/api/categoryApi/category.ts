import { baseApi } from "../../utils/api";
import type { SubCategory } from "../subCategoryApi/subCategory";

export interface Category {
  id: number;
  categoryImage: string;
  categoryName: string;
  subCategories: SubCategory[];
}

interface CategoriesResponse{
    categories: Category[]
}

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesResponse, void>({
            query: () => "/Category/get-categories"
        }),         
    })
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
    useGetCategoriesQuery,
    useGetCategoryByIdQuery
} = {...categoryApi, ...categoryByIdApi};