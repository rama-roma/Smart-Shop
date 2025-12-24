import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCategoryByIdQuery } from "../store/api/categoryApi/category";
import { useTranslation } from "react-i18next";
import { useTheme } from "../store/theme/ThemeContext";
import { useEffect, useState } from "react";
import {
  useGetProductByIdSubCategoryQuery,
  Product,
} from "../store/api/productApi/product";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useAddToCartMutation } from "../store/api/cartApi/cart";

const CatalogByIdPage = () => {
  const { id } = useParams();
  const { data } = useGetCategoryByIdQuery(Number(id));
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme() as { theme: "light" | "dark" };

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    number | null
  >(null);

  const { data: products } = useGetProductByIdSubCategoryQuery(
    selectedSubCategoryId!,
    { skip: selectedSubCategoryId === null }
  );

  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as Product[];
    setFavorites(stored);
  }, []);

  const handleAddToFavorites = (product: Product) => {
    const exists = favorites.some((f) => f.id === product.id);
    const updatedFavorites = exists
      ? favorites.filter((f) => f.id !== product.id)
      : [...favorites, product];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const [addToCart] = useAddToCartMutation();

  const handleClickAdd = (productId: number) => {
    addToCart(productId);
  };
  return (
    <>
      <main>
        <div className="mb-10">
          <button
            className="text-start w-40 p-2 border rounded-[5px] bg-[#ffd36a] border-[#ffd36a]  text-[black]"
            onClick={() => navigate(-1)}
          >
            ⮜ {t("xa.xaxa7")}
          </button>
        </div>
        <div className="flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide ml-2">
          {data?.subCategories.map((sub) => (
            <div
              key={sub.id}
              onClick={() => setSelectedSubCategoryId(sub.id)}
              className={`w-auto h-20 pr-5 pl-5 text-[13px] flex items-center justify-center rounded-2xl shadow-lg gap-3
            ${
              theme === "dark"
                ? "bg-[#3b3b3b] hover:bg-[#ffd36a] hover:text-[black]"
                : "bg-[#ffffff70] hover:bg-[#ffd36a] border hover:shadow-2xl   border-gray-200 hover:border-[#ffd36a] "
            }
            `}
            >
              <img
                src={`https://store-api.softclub.tj/images/${sub.subCategoryImage}`}
                className="w-10 h-10 object-cover rounded-[5px]"
              />
              <h1>{sub.subCategoryName}</h1>
            </div>
          ))}
        </div>
        {selectedSubCategoryId && (
          <section className="mt-6">
            {products && products.length > 0 ? (
              <div>
                {products.map((p) => {
                  const isFavorite = favorites.some((f) => f.id === p.id);
                  return (
                    <div
                      key={p.id}
                      className={`p-4 rounded-xl shadow w-90 h-auto
                ${theme === "dark" ? "bg-[#3b3b3b] text-white" : "bg-white"}
              `}
                    >
                      <img
                        src={`https://store-api.softclub.tj/images/${p.image}`}
                        className="w-full h-full object-cover rounded mb-3"
                      />
                      <h1 className="font-semibold">{p.productName}</h1>
                      <div className="flex items-center gap-[10px]">
                        <p className="text-[#ffd36a] font-bold">{p.price} c</p>
                        <p className="line-through text-[grey]">
                          {p.discountPrice}c
                        </p>
                      </div>
                      <div className="flex items-center justify-start gap-[10px]">
                        <button onClick={() => handleAddToFavorites(p)}>
                          <Heart
                            size={22}
                            className={
                              isFavorite ? "fill-red-500 text-red-500" : ""
                            }
                          />
                        </button>
                        <button
                          onClick={() =>
                            localStorage.getItem("token")
                              ? handleClickAdd(p.id)
                              : navigate("/loginPage")
                          }
                        >
                          <ShoppingCart size={20} />
                        </button>
                        <Link
                          to={`/infoPage/${p.id}`}
                        >
                          <Eye size={22} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className={`text-center py-20 text-lg font-semibold
          ${theme === "dark" ? "text-gray-400" : "text-gray-500"}
        `}
              >
                🛒 Товаров нет
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
};

export default CatalogByIdPage;
