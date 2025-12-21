import { baseApi } from "../../utils/api";

export interface SubCategory{
    id: number,
    subCategoryName: string
}


interface SubCategoriesResponse{
    subCategories: SubCategory[]
}

export const subCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubCategories: builder.query<SubCategoriesResponse, void>({
            query: () => "/SubCategory/get-sub-category"
        }),         
    })
}); 

export const subCategoryByIdApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubCategoryById: builder.query<SubCategory, number>({
            query: (id) => `/SubCategory/get-sub-category-by-id?id=${id}`,
            transformResponse: (res: { data: SubCategory }) => res.data,
        }),
    })
}); 


export const {
    useGetSubCategoriesQuery,
    useGetSubCategoryByIdQuery
} = {...subCategoryApi, ...subCategoryByIdApi};   