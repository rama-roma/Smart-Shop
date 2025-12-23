import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import Swipper from "../components/swipper";
// @ts-ignore
import img1 from "../assets/banner1.jpg";
// @ts-ignore
import img2 from "../assets/banner2.png";
// @ts-ignore
import img3 from "../assets/banner3.png";

import { useGetProductsQuery, Product } from "../store/api/productApi/product";
import { useAddToCartMutation } from "../store/api/cartApi/cart";

const HomePage = () => {
  const { t } = useTranslation();
  const { data: products } = useGetProductsQuery();
  const [addToCart] = useAddToCartMutation();

  const handleClickAdd = (productId: number) => {
    addToCart(productId);
  };

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

  return (
    <main>
      <Swipper img={img1} />

      <section className="mt-10 mb-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{t("main.lol")}</h1>
          <Link
            to="/productPage"
            className="bg-gray-300 px-4 py-2 rounded-lg text-black"
          >
            {t("main.lol1")}
          </Link>
        </div>

        <section className="flex flex-wrap gap-6">
          {products?.map((e) => {
            const isFavorite = favorites.some((f) => f.id === e.id);

            return (
              <div
                key={e.id}
                className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition relative flex flex-col p-4 gap-3"
              >
                <h1
                  className={`text-white text-xs w-14 text-center font-bold px-2 py-1 rounded-md ${
                    e.hasDiscount ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {e.hasDiscount ? "New" : "-20%"}
                </h1>

                <button
                  className="absolute top-2 right-2"
                  onClick={() => handleAddToFavorites(e)}
                >
                  <Heart
                    size={22}
                    className={isFavorite ? "fill-red-500 text-red-500" : ""}
                  />
                </button>

                <Link
                  to={`/infoPage/${e.id}`}
                  className="absolute top-10 right-2"
                >
                  <Eye size={22} />
                </Link>

                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    className="max-w-full max-h-full object-contain"
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                    alt={e.productName}
                  />
                </div>

                <div>
                  <h2 className="font-semibold">{e.productName}</h2>
                  <p className="text-sm text-gray-500">{e.color}</p>

                  {e.hasDiscount ? (
                    <div className="flex gap-2 items-center">
                      <span className="text-yellow-500 font-bold">
                        ${e.price}
                      </span>
                      <span className="line-through text-gray-400">
                        ${e.discountPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold">${e.price}</span>
                  )}
                </div>

                <button
                  onClick={() => handleClickAdd(e.id)}
                  className="mt-auto flex items-center justify-center gap-2 font-semibold py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  <ShoppingCart size={18} /> {t("main.lol6")}
                </button>
              </div>
            );
          })}
        </section>
      </section>

      <Swipper img={img2} />

      <section className="mt-10 mb-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{t("main.lol3")}</h1>
          <Link
            to="/productPage"
            className="bg-gray-300 px-4 py-2 rounded-lg text-black"
          >
            {t("main.lol1")}
          </Link>
        </div>

        <section className="flex flex-wrap gap-6">
          {products?.map((e) => {
            const isFavorite = favorites.some((f) => f.id === e.id);

            return (
              <div
                key={e.id}
                className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition relative flex flex-col p-4 gap-3"
              >
                <h1
                  className={`text-white text-xs w-14 text-center font-bold px-2 py-1 rounded-md ${
                    e.hasDiscount ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {e.hasDiscount ? "New" : "-20%"}
                </h1>

                <button
                  className="absolute top-2 right-2"
                  onClick={() => handleAddToFavorites(e)}
                >
                  <Heart
                    size={22}
                    className={isFavorite ? "fill-red-500 text-red-500" : ""}
                  />
                </button>

                <Link
                  to={`/infoPage/${e.id}`}
                  className="absolute top-10 right-2"
                >
                  <Eye size={22} />
                </Link>

                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    className="max-w-full max-h-full object-contain"
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                    alt={e.productName}
                  />
                </div>

                <div>
                  <h2 className="font-semibold">{e.productName}</h2>
                  <p className="text-sm text-gray-500">{e.color}</p>

                  {e.hasDiscount ? (
                    <div className="flex gap-2 items-center">
                      <span className="text-yellow-500 font-bold">
                        ${e.price}
                      </span>
                      <span className="line-through text-gray-400">
                        ${e.discountPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold">${e.price}</span>
                  )}
                </div>

                <button
                  onClick={() => handleClickAdd(e.id)}
                  className="mt-auto flex items-center justify-center gap-2 font-semibold py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  <ShoppingCart size={18} /> {t("main.lol6")}
                </button>
              </div>
            );
          })}
        </section>
      </section>

      <Swipper img={img3} />

      <section className="mt-10 mb-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">{t("main.lol2")}</h1>
          <Link
            to="/productPage"
            className="bg-gray-300 px-4 py-2 rounded-lg text-black"
          >
            {t("main.lol1")}
          </Link>
        </div>

        <section className="flex flex-wrap gap-6">
          {products?.map((e) => {
            const isFavorite = favorites.some((f) => f.id === e.id);

            return (
              <div
                key={e.id}
                className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition relative flex flex-col p-4 gap-3"
              >
                <h1
                  className={`text-white text-xs w-14 text-center font-bold px-2 py-1 rounded-md ${
                    e.hasDiscount ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {e.hasDiscount ? "New" : "-20%"}
                </h1>

                <button
                  className="absolute top-2 right-2"
                  onClick={() => handleAddToFavorites(e)}
                >
                  <Heart
                    size={22}
                    className={isFavorite ? "fill-red-500 text-red-500" : ""}
                  />
                </button>

                <Link
                  to={`/infoPage/${e.id}`}
                  className="absolute top-10 right-2"
                >
                  <Eye size={22} />
                </Link>

                <div className="w-full h-40 flex items-center justify-center">
                  <img
                    className="max-w-full max-h-full object-contain"
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                    alt={e.productName}
                  />
                </div>

                <div>
                  <h2 className="font-semibold">{e.productName}</h2>
                  <p className="text-sm text-gray-500">{e.color}</p>

                  {e.hasDiscount ? (
                    <div className="flex gap-2 items-center">
                      <span className="text-yellow-500 font-bold">
                        ${e.price}
                      </span>
                      <span className="line-through text-gray-400">
                        ${e.discountPrice}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold">${e.price}</span>
                  )}
                </div>

                <button
                  onClick={() => handleClickAdd(e.id)}
                  className="mt-auto flex items-center justify-center gap-2 font-semibold py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black"
                >
                  <ShoppingCart size={18} /> {t("main.lol6")}
                </button>
              </div>
            );
          })}
        </section>
      </section>
    </main>
  );
};

export default HomePage;
