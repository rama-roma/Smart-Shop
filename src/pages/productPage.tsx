import { useTranslation } from "react-i18next";
import { useTheme } from "../contextApi/theme/ThemeContext";
import { useGetBrandsQuery } from "../store/api/brandApi/brand";
import { useGetColorsQuery } from "../store/api/colorApi/color";
import {
  useGetProductsQuery,
  useGetProductsByColorQuery,
  Product,
} from "../store/api/productApi/product";
import { Eye, Heart, ShoppingCart, RotateCcw } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAddToCartMutation } from "../store/api/cartApi/cart";
import { Input } from "antd";

const ProductPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };

  const { data: brandData = [] } = useGetBrandsQuery();
  const { data: colorData = [] } = useGetColorsQuery();

  const [favorites, setFavorites] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [colorId, setColorId] = useState<number | null>(null);
  const [hasDiscount, setHasDiscount] = useState<boolean>(false);
  const [subCategoryIds, setSubCategoryIds] = useState<number[]>([]);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const { data: baseProducts = [] } = useGetProductsQuery({
    minPrice: minPrice !== null && !isNaN(minPrice) ? minPrice : undefined,
    maxPrice: maxPrice !== null && !isNaN(maxPrice) ? maxPrice : undefined,
    brandId: brandId || undefined,
    hasDiscount: hasDiscount || undefined,
    categoryId: categoryId || undefined,
  });

  const { data: colorProducts = [] } = useGetProductsByColorQuery(colorId!, {
    skip: !colorId,
  });

  const productData = colorId ? colorProducts : baseProducts;

   const [search, setSearch] = useState(null);

  const filteredProducts = productData.filter((product) => {
    // if (!product.productName.toLowerCase().includes(search.toLowerCase())) return false
    if (categoryId && product.categoryId !== categoryId) return false;
    if (subCategoryIds.length === 0) return true;
    return product.subCategoryId
      ? subCategoryIds.includes(product.subCategoryId)
      : false;
  });

  const resetFilters = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setColorId(null);
    setBrandId(null);
    setHasDiscount(false);
    setSubCategoryIds([]);
    setCategoryId(null);
  };

  const [addToCart] = useAddToCartMutation();

  const navigate = useNavigate();

  const handleClickAdd = (productId: number) => {
    addToCart(productId);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
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


  return (
    <>
      <div className="hidden md:block">
        <main className="flex mt-10 items-start gap-[20px] justify-start">
          <section className="w-[30%] flex flex-col items-start justify-center gap-[10px]">
            <Input style={{width:"350px", height:"40px"}} placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
            <div className="flex justify-between items-center w-80 mb-4">
              <h2 className="text-xl font-bold">{t("amin.maga")}</h2>
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                <RotateCcw size={16} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <section
                className={`rounded-2xl p-4 transition-all ${
                  theme === "dark"
                    ? "bg-[#1f1f1f] border border-[#333]"
                    : "bg-white border border-gray-200"
                } shadow-sm`}
              >
                <h1 className="text-lg font-semibold mb-4">{t("amin.maga")}</h1>
                <div className="flex items-center gap-4">
                  {[t("amin.maga1"), t("amin.maga2")].map((label, idx) => (
                    <article
                      key={idx}
                      className={`flex flex-col justify-center w-36 h-16 px-3 rounded-xl transition-all border focus-within:border-[#ffd36a] focus-within:shadow-md ${
                        theme === "dark"
                          ? "bg-[#2b2b2b] border-[#444]"
                          : "bg-[#f9f9f9] border-gray-300"
                      }`}
                    >
                      <span className="text-[11px] text-gray-400 font-medium">
                        {label}
                      </span>
                      <input
                        type="number"
                        value={idx === 0 ? minPrice || "" : maxPrice || ""}
                        onChange={(e) =>
                          idx === 0
                            ? setMinPrice(Number(e.target.value))
                            : setMaxPrice(Number(e.target.value))
                        }
                        placeholder={idx === 0 ? "0" : "999"}
                        className={`bg-transparent w-full text-sm border-none outline-none focus:ring-0 ${
                          theme === "dark"
                            ? "text-white placeholder-gray-500"
                            : "text-black placeholder-gray-400"
                        }`}
                      />
                    </article>
                  ))}
                </div>
              </section>
              <section
                className={`rounded-2xl p-4 ${
                  theme === "dark"
                    ? "bg-[#1f1f1f] border border-[#333]"
                    : "bg-white border border-gray-200"
                } shadow-sm`}
              >
                <h1 className="text-lg font-semibold mb-3">
                  {t("amin.maga3")}
                </h1>
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-1">
                  {brandData.map((brand) => (
                    <label
                      key={brand.id}
                      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-[#ffd36a]/20"
                    >
                      <input
                        type="radio"
                        name="brand"
                        value={brand.id}
                        checked={brandId === brand.id}
                        onChange={() => setBrandId(brand.id)}
                      />
                      <span className="text-sm">{brand.brandName}</span>
                    </label>
                  ))}
                </div>
              </section>

              <section
                className={`rounded-2xl p-4 ${
                  theme === "dark"
                    ? "bg-[#1f1f1f] border border-[#333]"
                    : "bg-white border border-gray-200"
                } shadow-sm`}
              >
                <h1 className="text-lg font-semibold mb-3">
                  {t("amin.maga4")}
                </h1>
                <div className="flex flex-col gap-2">
                  {colorData.map((color) => (
                    <label
                      key={color.id}
                      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-[#ffd36a]/20"
                    >
                      <input
                        type="radio"
                        name="color"
                        value={color.id}
                        checked={colorId === color.id}
                        onChange={() => setColorId(color.id)}
                        className="accent-[#ffd36a] w-4 h-4"
                      />
                      <span className="text-sm">{color.colorName}</span>
                    </label>
                  ))}
                </div>
              </section>
            </div>
          </section>

          <section className="w-[70%] flex flex-wrap gap-[20px]">
            {filteredProducts.map((product) => {
              const isFavorite = favorites.some((f) => f.id === product.id);
              return (
                <div
                  key={product.id}
                  className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition relative flex flex-col p-4 gap-3"
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
                  <button
                    onClick={() =>
                      localStorage.getItem("token")
                        ? handleClickAdd(product.id)
                        : navigate("/loginPage")
                    }
                    className="mt-auto flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg"
                  >
                    <ShoppingCart size={18} />
                    {t("main.lol6")}
                  </button>
                </div>
              );
            })}
          </section>
        </main>
      </div>

      <div className="block md:hidden p-4">
        <section className="flex flex-col gap-4 mb-4">
          <button
            onClick={resetFilters}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            <RotateCcw size={16} />
            {t("amin.reset")}
          </button>

          <div className="flex gap-2">
            <input
              type="number"
              value={minPrice || ""}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              placeholder="Min"
              className="w-1/2 p-2 rounded-lg border border-gray-300 focus:outline-none"
            />
            <input
              type="number"
              value={maxPrice || ""}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              placeholder="Max"
              className="w-1/2 p-2 rounded-lg border border-gray-300 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
            {brandData.map((brand) => (
              <label
                key={brand.id}
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer border hover:bg-[#ffd36a]/20"
              >
                <input
                  type="radio"
                  name="brand"
                  checked={brandId === brand.id}
                  onChange={() => setBrandId(brand.id)}
                />
                <span className="text-sm">{brand.brandName}</span>
              </label>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto">
            {colorData.map((color) => (
              <label
                key={color.id}
                className="flex items-center gap-2 p-2 rounded-lg cursor-pointer border hover:bg-[#ffd36a]/20"
              >
                <input
                  type="radio"
                  name="color"
                  checked={colorId === color.id}
                  onChange={() => setColorId(color.id)}
                  className="accent-[#ffd36a]"
                />
                <span className="text-sm">{color.colorName}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => {
            const isFavorite = favorites.some((f) => f.id === product.id);
            return (
              <div
                key={product.id}
                className="rounded-xl shadow-md p-2 flex flex-col gap-2 relative"
              >
                <h1
                  className={`text-xs text-center font-bold px-2 py-1 rounded-md absolute top-2 left-2 ${
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
                    size={18}
                    className={isFavorite ? "fill-red-500 text-red-500" : ""}
                  />
                </button>

                <Link
                  to={`/infoPage/${product.id}`}
                  className="absolute top-8 right-2"
                >
                  <Eye size={18} />
                </Link>

                <div className="w-full h-32 flex items-center justify-center">
                  <img
                    src={`https://store-api.softclub.tj/images/${product.image}`}
                    alt={product.productName}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-sm">
                    {product.productName}
                  </h2>
                  <p className="text-xs text-gray-500">{product.color}</p>
                  <div className="flex gap-1 items-center">
                    {product.hasDiscount ? (
                      <>
                        <span className="text-yellow-500 font-bold">
                          ${product.price}
                        </span>
                        <span className="line-through text-gray-400 text-xs">
                          ${product.discountPrice}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold">${product.price}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() =>
                    localStorage.getItem("token")
                      ? handleClickAdd(product.id)
                      : navigate("/loginPage")
                  }
                  className="mt-auto flex items-center justify-center gap-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-1 rounded-lg text-xs"
                >
                  <ShoppingCart size={14} />
                  {t("main.lol6")}
                </button>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default ProductPage;
