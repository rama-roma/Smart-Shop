import { baseApi } from "../../utils/api";

export interface Color {
    id: number;
    colorName: string;
    colorCode: string;
}


export const colorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getColors: builder.query<Color[], void>({   
            query: () => "/Color/get-colors",
            transformResponse: (res: { data: Color[] }) => res.data,
        }),         
    })
});
export const {
    useGetColorsQuery
} = colorApi;