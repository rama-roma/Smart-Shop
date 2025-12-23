import { baseApi } from "../../utils/api";

export interface ProductImage {
  images: string;
}

export interface ProductFromList {
  id: number;
  productName: string;
  price: number;
  discountPrice: number;
  hasDiscount: boolean;
  color: string;
  image: string; 
}

export interface Product extends Omit<ProductFromList, "images"> {
  images: ProductImage[]; 
  description: string;
  brand: string;
  code: number;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/Product/get-products",
      transformResponse: (res: { data: { products: ProductFromList[] } }) =>
        res.data.products.map((p) => ({
          ...p,
          images: [{ images: p.image }],
          description: "",
          brand: "",
          code: 0,
        })),
    }),

    getProductById: builder.query<Product, number>({
      query: (id) => `/Product/get-product-by-id?id=${id}`,
      transformResponse: (res: { data: Product }) => res.data,
    }),


    getProductByIdSubCategory: builder.query<Product[], number>({
      query: (subCategoryId) =>
        `/Product/get-products?SubcategoryId=${subCategoryId}`,
      transformResponse: (res: { data: ProductFromList[] }) =>
        res.data.map((p) => ({
          ...p,
          images: [{ images: p.image }],
          description: "",
          brand: "",
          code: 0,
        })),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductByIdSubCategoryQuery,
} = productApi;
