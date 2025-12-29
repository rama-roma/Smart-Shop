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
import { Modal, notification } from "antd";
import { HeartFilled } from "@ant-design/icons";
import LoadingFunc from "../components/loadingFunc";

const ProductPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };

  const { data: brandData = [] } = useGetBrandsQuery();
  const { data: colorData = [] } = useGetColorsQuery();
  const [openDialog, setOpenDialog] = useState(false);
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  const [favorites, setFavorites] = useState<Product[]>([]);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [colorId, setColorId] = useState<number | null>(null);
  const [hasDiscount, setHasDiscount] = useState<boolean>(false);
  const [subCategoryIds, setSubCategoryIds] = useState<number[]>([]);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const { data: products = [], isLoading } = useGetProductsQuery({
    minPrice: minPrice || undefined,
    maxPrice: maxPrice || undefined,
    brandId: brandId || undefined,
    colorId: colorId || undefined,
    categoryId: categoryId || undefined,
    subCategoryId: subCategoryIds.length ? subCategoryIds[0] : undefined,
    hasDiscount: hasDiscount || undefined,
  });

  const { data: colorProducts = [] } = useGetProductsByColorQuery(colorId!, {
    skip: !colorId,
  });

  const productData = colorId ? colorProducts : products;

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    search
      ? product.productName.toLowerCase().includes(search.toLowerCase())
      : true
  );

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

    notification.open({
      message: exists ? t("set.t2") : t("set.t1"),
      icon: exists ? (
        <HeartFilled style={{ color: "gray" }} />
      ) : (
        <HeartFilled style={{ color: "red" }} />
      ),
      placement: "bottomRight",
      duration: 2,
    });
  };

  return (
    <>
      <div className="hidden md:block">
        <main className="flex mt-10 items-start gap-[20px] justify-start">
          <section className="w-[30%] flex flex-col items-start justify-center gap-[10px]">
            <input
              className={`w-85 p-2 border-[2.5px] focus:outline-none rounded-[10px]  ${
                theme === "dark"
                  ? "border-[#555] placeholder-[#aaa] text-white bg-[#2b2b2b]"
                  : "border-[#ffd36a] placeholder-black text-black bg-white"
              }`}
              placeholder={t("navbar.title1")}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="flex justify-between items-center w-80 mb-4">
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
            {isLoading ? (
              <div>
                <LoadingFunc />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="w-full text-center text-lg text-gray-500 py-10">
                {t("main.noProducts")}
              </div>
            ) : (
              filteredProducts.map((product) => {
                const isFavorite = favorites.some((f) => f.id === product.id);
                const isAnimating = animatingId === product.id;

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
                        className={
                          isFavorite ? "fill-red-500 text-red-500" : ""
                        }
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
                      onClick={() => {
                        const isLoggedIn = !!localStorage.getItem("token");
                        if (!isLoggedIn) {
                          setOpenDialog(true);
                          return;
                        }

                        addToCart(product.id)
                          .unwrap()
                          .then(() => {
                            notification.success({
                              message: t("set.ttt"),
                              placement: "bottomRight",
                              duration: 2,
                            });
                            setAnimatingId(product.id);
                            setTimeout(() => setAnimatingId(null), 600);
                          });
                      }}
                      className={`mt-auto flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition-transform ${
                        isAnimating ? "scale-105" : ""
                      }`}
                    >
                      <ShoppingCart size={18} />
                      {t("main.lol6")}
                    </button>
                  </div>
                );
              })
            )}
          </section>
        </main>

        <Modal
          open={openDialog}
          onCancel={() => setOpenDialog(false)}
          onOk={() => {
            setOpenDialog(false);
            navigate("/loginPage");
          }}
          centered
          okText={t("set.t6")}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{
            style: {
              background: "linear-gradient(135deg, #FFD36A, #FFB703)",
              color: "#2b2b2b",
              borderRadius: "12px",
              border: "none",
              fontWeight: 600,
              padding: "6px 20px",
              boxShadow: "0 6px 15px rgba(255, 193, 7, 0.4)",
            },
          }}
          styles={{
            content: {
              borderRadius: "20px",
              background: "linear-gradient(180deg, #FFF6D6, #FFE9A3)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              padding: "30px",
            },
            header: {
              borderBottom: "none",
              textAlign: "center",
            },
            footer: {
              borderTop: "none",
              textAlign: "center",
            },
          }}
          title={
            <div style={{ fontSize: "22px", fontWeight: 700 }}>
              🐝 {t("set.t")}
            </div>
          }
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "16px",
              color: "#3a3a3a",
              marginTop: "10px",
              lineHeight: "1.5",
            }}
          >
            {t("set.tt")}
          </p>
        </Modal>
      </div>

      <div className="block md:hidden p-4">
        <input
          className={`w-full p-2 border-2 rounded-lg mb-4 ${
            theme === "dark"
              ? "border-[#555] bg-[#2b2b2b] text-white placeholder-[#aaa]"
              : "border-[#ffd36a] bg-white text-black placeholder-black"
          }`}
          placeholder={t("navbar.title1")}
          onChange={(e) => setSearch(e.target.value)}
        />


        <div className="flex flex-col gap-3 mb-4">
          <details className="border rounded-lg p-2">
            <summary className="font-semibold cursor-pointer">
              {t("amin.maga")}
            </summary>
            <div className="flex gap-2 mt-2">
              <input
                type="number"
                value={minPrice || ""}
                placeholder="Min"
                className="w-1/2 p-1 border rounded"
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
              <input
                type="number"
                value={maxPrice || ""}
                placeholder="Max"
                className="w-1/2 p-1 border rounded"
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </details>

          <details className="border rounded-lg p-2">
            <summary className="font-semibold cursor-pointer">
              {t("amin.maga3")}
            </summary>
            <div className="flex flex-col mt-2 max-h-40 overflow-y-auto">
              {brandData.map((brand) => (
                <label
                  key={brand.id}
                  className="flex items-center gap-2 p-1 cursor-pointer hover:bg-[#ffd36a]/20 rounded"
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
          </details>

          <details className="border rounded-lg p-2">
            <summary className="font-semibold cursor-pointer">
              {t("amin.maga4")}
            </summary>
            <div className="flex flex-col mt-2 max-h-40 overflow-y-auto">
              {colorData.map((color) => (
                <label
                  key={color.id}
                  className="flex items-center gap-2 p-1 cursor-pointer hover:bg-[#ffd36a]/20 rounded"
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
          </details>

          <button
            onClick={resetFilters}
            className="bg-red-500 text-white p-2 rounded-lg mt-2 w-full"
          >
            {t("main.reset")}
          </button>
        </div>


        <section className="flex flex-col gap-4">
          {isLoading ? (
            <LoadingFunc />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              {t("main.noProducts")}
            </div>
          ) : (
            filteredProducts.map((product) => {
              const isFavorite = favorites.some((f) => f.id === product.id);
              const isAnimating = animatingId === product.id;

              return (
                <div
                  key={product.id}
                  className="relative flex flex-col gap-2 border rounded-xl p-3 shadow hover:shadow-lg transition"
                >

                  <span
                    className={`absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded-md ${
                      product.hasDiscount ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {product.hasDiscount ? "New" : "-20%"}
                  </span>


                  <div className="absolute top-2 right-2 flex gap-2">
                    <button onClick={() => handleAddToFavorites(product)}>
                      <Heart
                        size={22}
                        className={
                          isFavorite ? "fill-red-500 text-red-500" : ""
                        }
                      />
                    </button>
                    <Link to={`/infoPage/${product.id}`}>
                      <Eye size={22} />
                    </Link>
                  </div>


                  <div className="w-full h-40 flex items-center justify-center">
                    <img
                      src={`https://store-api.softclub.tj/images/${product.image}`}
                      alt={product.productName}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <h2 className="font-semibold">{product.productName}</h2>
                  <span className="text-gray-500 text-sm">{product.color}</span>
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

    
                  <button
                    onClick={() => {
                      const isLoggedIn = !!localStorage.getItem("token");
                      if (!isLoggedIn) {
                        setOpenDialog(true);
                        return;
                      }

                      addToCart(product.id)
                        .unwrap()
                        .then(() => {
                          notification.success({
                            message: t("set.ttt"),
                            placement: "bottomRight",
                            duration: 2,
                          });
                          setAnimatingId(product.id);
                          setTimeout(() => setAnimatingId(null), 600);
                        });
                    }}
                    className={`mt-2 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition-transform ${
                      isAnimating ? "scale-105" : ""
                    }`}
                  >
                    <ShoppingCart size={18} />
                    {t("main.lol6")}
                  </button>
                </div>
              );
            })
          )}
        </section>


        <Modal
          open={openDialog}
          onCancel={() => setOpenDialog(false)}
          onOk={() => {
            setOpenDialog(false);
            navigate("/loginPage");
          }}
          centered
          okText={t("set.t6")}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{
            style: {
              background: "linear-gradient(135deg, #FFD36A, #FFB703)",
              color: "#2b2b2b",
              borderRadius: "12px",
              border: "none",
              fontWeight: 600,
              padding: "6px 20px",
              boxShadow: "0 6px 15px rgba(255, 193, 7, 0.4)",
            },
          }}
          title={
            <div style={{ fontSize: "22px", fontWeight: 700 }}>
              🐝 {t("set.t")}
            </div>
          }
          style={{ borderRadius: "20px" }}
        >
          <p className="text-center text-gray-700 mt-2">{t("set.tt")}</p>
        </Modal>
      </div>
    </>
  );
};

export default ProductPage;
