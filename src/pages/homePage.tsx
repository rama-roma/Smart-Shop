import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import Swipper from "../components/swipper";
// @ts-ignore
import img1 from "../assets/banner1.jpg";
// @ts-ignore
import img2 from "../assets/banner2.png";
// @ts-ignore
import img3 from "../assets/banner3.png";

import { useAddToCartMutation } from "../store/api/cartApi/cart";
import { useGetProductsQuery, Product } from "../store/api/productApi/product";

const HomePage = () => {
  const { t } = useTranslation();
  const { data: products } = useGetProductsQuery({});
  const [addToCart] = useAddToCartMutation();

  const navigate = useNavigate();

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
    <>
      <div className="hidden md:block">
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
                        className={
                          isFavorite ? "fill-red-500 text-red-500" : ""
                        }
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
                      onClick={() =>
                        localStorage.getItem("token")
                          ? handleClickAdd(e.id)
                          : navigate("/loginPage")
                      }
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
                        className={
                          isFavorite ? "fill-red-500 text-red-500" : ""
                        }
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
                        className={
                          isFavorite ? "fill-red-500 text-red-500" : ""
                        }
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
      </div>

      <div className="block md:hidden">
        <main className="px-3 pb-24 flex flex-col gap-8">
          <Swipper img={img1} />

          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">{t("main.lol")}</h1>
              <Link
                to="/productPage"
                className="text-sm bg-gray-200 px-3 py-1 rounded-lg"
              >
                {t("main.lol1")}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {products?.map((e) => {
                const isFavorite = favorites.some((f) => f.id === e.id);

                return (
                  <div
                    key={e.id}
                    className="rounded-xl shadow-md flex flex-col p-2 gap-2 relative bg-white"
                  >
                    <span
                      className={`text-white text-[10px] w-fit px-2 py-[2px] rounded ${
                        e.hasDiscount ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {e.hasDiscount ? "New" : "-20%"}
                    </span>

                    <button
                      className="absolute top-2 right-2"
                      onClick={() => handleAddToFavorites(e)}
                    >
                      <Heart
                        size={18}
                        className={
                          isFavorite ? "fill-red-500 text-red-500" : ""
                        }
                      />
                    </button>

                    <Link
                      to={`/infoPage/${e.id}`}
                      className="absolute top-7 right-2"
                    >
                      <Eye size={18} />
                    </Link>

                    <div className="h-28 flex items-center justify-center">
                      <img
                        src={`https://store-api.softclub.tj/images/${e.image}`}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <h2 className="text-sm font-semibold line-clamp-2">
                      {e.productName}
                    </h2>

                    <p className="text-xs text-gray-500">{e.color}</p>

                    {e.hasDiscount ? (
                      <div className="flex gap-1 items-center">
                        <span className="text-yellow-500 font-bold text-sm">
                          ${e.price}
                        </span>
                        <span className="line-through text-gray-400 text-xs">
                          ${e.discountPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-sm">${e.price}</span>
                    )}

                    <button
                      onClick={() =>
                        localStorage.getItem("token")
                          ? handleClickAdd(e.id)
                          : navigate("/loginPage")
                      }
                      className="mt-auto bg-yellow-400 rounded-lg py-1 text-sm font-semibold flex items-center justify-center gap-1"
                    >
                      <ShoppingCart size={16} />
                      {t("main.lol6")}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <Swipper img={img2} />

          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold">{t("main.lol3")}</h1>
              <Link
                to="/productPage"
                className="text-sm bg-gray-200 px-3 py-1 rounded-lg"
              >
                {t("main.lol1")}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {products?.map((e) => {
                const isFavorite = favorites.some((f) => f.id === e.id);

                return (
                  <div
                    key={e.id}
                    className="rounded-xl shadow-md flex flex-col p-2 gap-2 relative bg-white"
                  >
                    <span
                      className={`text-white text-[10px] w-fit px-2 py-[2px] rounded ${
                        e.hasDiscount ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {e.hasDiscount ? "New" : "-20%"}
                    </span>

                    <button
                      className="absolute top-2 right-2"
                      onClick={() => handleAddToFavorites(e)}
                    >
                      <Heart
                        size={18}
                        className={
                          isFavorite ? "fill-red-500 text-red-500" : ""
                        }
                      />
                    </button>

                    <Link
                      to={`/infoPage/${e.id}`}
                      className="absolute top-7 right-2"
                    >
                      <Eye size={18} />
                    </Link>

                    <div className="h-28 flex items-center justify-center">
                      <img
                        src={`https://store-api.softclub.tj/images/${e.image}`}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <h2 className="text-sm font-semibold line-clamp-2">
                      {e.productName}
                    </h2>

                    <p className="text-xs text-gray-500">{e.color}</p>

                    {e.hasDiscount ? (
                      <div className="flex gap-1 items-center">
                        <span className="text-yellow-500 font-bold text-sm">
                          ${e.price}
                        </span>
                        <span className="line-through text-gray-400 text-xs">
                          ${e.discountPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-sm">${e.price}</span>
                    )}

                    <button
                      onClick={() =>
                        localStorage.getItem("token")
                          ? handleClickAdd(e.id)
                          : navigate("/loginPage")
                      }
                      className="mt-auto bg-yellow-400 rounded-lg py-1 text-sm font-semibold flex items-center justify-center gap-1"
                    >
                      <ShoppingCart size={16} />
                      {t("main.lol6")}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          <Swipper img={img3} />

          <section className="flex flex-col gap-3">
            <h1 className="text-xl font-bold">{t("main.lol2")}</h1>
            <div className="grid grid-cols-2 gap-3">
              {products?.map((e) => {
                const isFavorite = favorites.some((f) => f.id === e.id);

                return (
                  <div
                    key={e.id}
                    className="rounded-xl shadow-md flex flex-col p-2 gap-2 relative bg-white"
                  >
                    <span
                      className={`text-white text-[10px] w-fit px-2 py-[2px] rounded ${
                        e.hasDiscount ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {e.hasDiscount ? "New" : "-20%"}
                    </span>

                    <button
                      className="absolute top-2 right-2"
                      onClick={() => handleAddToFavorites(e)}
                    >
                      <Heart
                        size={18}
                        className={
                          isFavorite ? "fill-red-500 text-red-500" : ""
                        }
                      />
                    </button>

                    <Link
                      to={`/infoPage/${e.id}`}
                      className="absolute top-7 right-2"
                    >
                      <Eye size={18} />
                    </Link>

                    <div className="h-28 flex items-center justify-center">
                      <img
                        src={`https://store-api.softclub.tj/images/${e.image}`}
                        className="max-h-full object-contain"
                      />
                    </div>

                    <h2 className="text-sm font-semibold line-clamp-2">
                      {e.productName}
                    </h2>

                    <p className="text-xs text-gray-500">{e.color}</p>

                    {e.hasDiscount ? (
                      <div className="flex gap-1 items-center">
                        <span className="text-yellow-500 font-bold text-sm">
                          ${e.price}
                        </span>
                        <span className="line-through text-gray-400 text-xs">
                          ${e.discountPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-sm">${e.price}</span>
                    )}

                    <button
                      onClick={() =>
                        localStorage.getItem("token")
                          ? handleClickAdd(e.id)
                          : navigate("/loginPage")
                      }
                      className="mt-auto bg-yellow-400 rounded-lg py-1 text-sm font-semibold flex items-center justify-center gap-1"
                    >
                      <ShoppingCart size={16} />
                      {t("main.lol6")}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default HomePage;
