import { baseApi } from "../../utils/api";

export interface Brand {
    id: number;
    brandName: string;
}

export const brandApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query<Brand[], void>({
            query: () => "/Brand/get-brands",
            transformResponse: (res: { data: Brand[] }) => res.data,
        }),         
    })
});
export const {
    useGetBrandsQuery
} = brandApi;