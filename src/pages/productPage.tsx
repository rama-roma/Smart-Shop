import { useTranslation } from "react-i18next";
import { useTheme } from "../store/theme/ThemeContext";
import { useGetBrandsQuery } from "../store/api/brandApi/brand";
import { useGetColorsQuery } from "../store/api/colorApi/color";
import { useGetCategoriesQuery } from "../store/api/categoryApi/category";
import { useGetProductsQuery } from "../store/api/productApi/product";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const ProductPage = () => {
  interface Product {
    id: number;
    productName: string;
    price: number;
    discountPrice?: number;
    hasDiscount?: boolean;
    color?: string;
    image?: string;
  }
  
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };

  const { data: brandData = [] } = useGetBrandsQuery();
  const { data: colorData = [] } = useGetColorsQuery();
  const { data: categoryData = [] } = useGetCategoriesQuery();
  const { data: productData = [] } = useGetProductsQuery();

  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const handleAddToFavorites = (product: Product) => {
    const exists = favorites.some((f) => f.id === product.id);

    let updatedFavorites: Product[];

    if (exists) {
      updatedFavorites = favorites.filter((f) => f.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <main className="flex mt-10 items-start gap-[20px] justify-start">
        <section className="w-[30%] flex flex-col items-start justify-center gap-[10px]">
          <div className="flex flex-col gap-6">
            <section
              className={`
      rounded-2xl p-4 transition-all
      ${
        theme === "dark"
          ? "bg-[#1f1f1f] border border-[#333]"
          : "bg-white border border-gray-200"
      }
      shadow-sm
    `}
            >
              <h1 className="text-lg font-semibold mb-4">{t("amin.maga")}</h1>

              <div className="flex items-center gap-4">
                {[t("amin.maga1"), t("amin.maga2")].map((label, idx) => (
                  <article
                    key={idx}
                    className={`
            flex flex-col justify-center
            w-36 h-16 px-3 rounded-xl transition-all
            border focus-within:border-[#ffd36a] focus-within:shadow-md
            ${
              theme === "dark"
                ? "bg-[#2b2b2b] border-[#444]"
                : "bg-[#f9f9f9] border-gray-300"
            }
          `}
                  >
                    <span className="text-[11px] text-gray-400 font-medium">
                      {label}
                    </span>
                    <input
                      type="number"
                      placeholder={idx === 0 ? "0" : "999"}
                      className={`
              bg-transparent w-full text-sm
              border-none outline-none focus:ring-0
              ${
                theme === "dark"
                  ? "text-white placeholder-gray-500"
                  : "text-black placeholder-gray-400"
              }
            `}
                    />
                  </article>
                ))}
              </div>
            </section>

            <section
              className={`
      rounded-2xl p-4
      ${
        theme === "dark"
          ? "bg-[#1f1f1f] border border-[#333]"
          : "bg-white border border-gray-200"
      }
      shadow-sm
    `}
            >
              <h1 className="text-lg font-semibold mb-3">{t("amin.maga3")}</h1>

              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                {brandData?.map((brand) => (
                  <label
                    key={brand.id}
                    className={`
            flex items-center gap-3 p-2 rounded-lg cursor-pointer transition
            hover:bg-[#ffd36a]/20
          `}
                  >
                    <input
                      type="checkbox"
                      className="accent-[#ffd36a] w-4 h-4"
                    />
                    <span className="text-sm">{brand.brandName}</span>
                  </label>
                ))}
              </div>
            </section>

            <section
              className={`
      rounded-2xl p-4
      ${
        theme === "dark"
          ? "bg-[#1f1f1f] border border-[#333]"
          : "bg-white border border-gray-200"
      }
      shadow-sm
    `}
            >
              <h1 className="text-lg font-semibold mb-3">{t("amin.maga4")}</h1>

              <div className="flex flex-col gap-2">
                {colorData?.map((color) => (
                  <label
                    key={color.id}
                    className="
            flex items-center gap-3 p-2 rounded-lg cursor-pointer transition
            hover:bg-[#ffd36a]/20
          "
                  >
                    <input
                      type="radio"
                      name="color"
                      className="accent-[#ffd36a] w-4 h-4"
                    />
                    <span className="text-sm">{color.colorName}</span>
                  </label>
                ))}
              </div>
            </section>

            <section
              className={`
      rounded-2xl p-4
      ${
        theme === "dark"
          ? "bg-[#1f1f1f] border border-[#333]"
          : "bg-white border border-gray-200"
      }
      shadow-sm
    `}
            >
              <h1 className="text-lg font-semibold mb-3">{t("amin.maga5")}</h1>

              <div
                className={`
    max-h-100 overflow-y-auto pr-2 space-y-4
    scrollbar-thin scrollbar-thumb-[#ffd36a]/70 scrollbar-track-transparent
  `}
              >
                {categoryData?.map((category) => (
                  <div
                    key={category.id}
                    className={`
        rounded-xl p-3 transition
        ${
          theme === "dark"
            ? "bg-[#1f1f1f] border border-[#333]"
            : "bg-white border border-gray-200"
        }
      `}
                  >
                    <h2
                      className={`
          font-semibold mb-2 sticky top-0 z-10
          ${
            theme === "dark" ? "bg-[#1f1f1f] text-white" : "bg-white text-black"
          }
        `}
                    >
                      {category.categoryName}
                    </h2>

                    <div className="flex flex-col gap-1 pl-2">
                      {category.subCategories.map((sub) => (
                        <label
                          key={sub.id}
                          className="
              flex items-center gap-3 p-2 rounded-lg cursor-pointer
              transition hover:bg-[#ffd36a]/20
            "
                        >
                          <input
                            type="checkbox"
                            className="accent-[#ffd36a] w-4 h-4"
                          />
                          <span className="text-sm">{sub.subCategoryName}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="w-[70%] flex flex-wrap gap-[20px]">
          {productData?.map((product) => {
            const isFavorite = favorites.some((f) => f.id === product.id);
            return (
              <div
                key={product.id}
                className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition relative flex flex-col p-4 gap-3 "
              >
                <h1
                  className={`text-white text-xs w-14 text-center font-bold px-2 py-1 rounded-md ${
                    product.hasDiscount ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {product.hasDiscount ? "New" : "-20%"}
                </h1>

                <button
                  className="absolute top-2 right-2"
                  onClick={() => handleAddToFavorites(product)}
                >
                  <Heart
                    size={22}
                    className={isFavorite ? "fill-red-500 text-red-500" : ""}
                  />
                </button>

                <Link
                  to={`/infoPage/${product.id}`}
                  className="absolute top-10 right-2"
                >
                  <Eye size={22} />
                </Link>

                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    className="max-w-full max-h-full object-contain"
                    src={`https://store-api.softclub.tj/images/${product.image}`}
                    alt={product.productName}
                  />
                </div>

                <div>
                  <h2 className="font-semibold">{product.productName}</h2>
                  <p className="text-sm text-gray-500">{product.color}</p>

                  {product.hasDiscount ? (
                    <div className="flex gap-2 items-center">
                      <span className="text-yellow-500 font-bold">
                        ${product.price}
                      </span>
                      <span className="line-through text-gray-400">
                        ${product.discountPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold">${product.price}</span>
                  )}
                </div>

                <button className="mt-auto flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg">
                  <ShoppingCart size={18} />
                  {t("main.lol6")}
                </button>
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
};

export default ProductPage;
