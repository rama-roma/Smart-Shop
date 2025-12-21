import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Swipper from "../components/swipper";
import img1 from "../images/banner1.jpg";
import img2 from "../images/banner2.png";
import img3 from "../images/banner3.png";
import { useGetProductsQuery } from "../store/api/productApi/product";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router";

interface Product {
  id: number;
  productName: string;
  price: number;
  discountPrice?: number;
  hasDiscount?: boolean;
  color?: string;
  image?: string;
}

const HomePage = () => {
  const { t } = useTranslation();
  const { data } = useGetProductsQuery();

  const [favorites, setFavorites] = useState<Product[]>([]);


  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
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
          {data?.data?.products?.map((e: Product) => {
            const isFavorite = favorites.some((f) => f.id === e.id);
            return (
              <div
                key={e.id}
                className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition relative flex flex-col p-4 gap-3 "
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
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : ""
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
                        ${e.discountPrice}
                      </span>
                      <span className="line-through text-gray-400">
                        ${e.price}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold">${e.price}</span>
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
          {data?.data?.products?.map((e: Product) => {
            const isFavorite = favorites.some((f) => f.id === e.id);

            return (
              <div
                key={e.id}
                className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition relative flex flex-col p-4 gap-3 "
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
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : ""
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
                        ${e.discountPrice}
                      </span>
                      <span className="line-through text-gray-400">
                        ${e.price}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold">${e.price}</span>
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
          {data?.data?.products?.map((e: Product) => {
            const isFavorite = favorites.some((f) => f.id === e.id);

            return (
              <div
                key={e.id}
                className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition relative flex flex-col p-4 gap-3 "
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
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : ""
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
                        ${e.discountPrice}
                      </span>
                      <span className="line-through text-gray-400">
                        ${e.price}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold">${e.price}</span>
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
      </section>
    </main>
  );
};

export default HomePage;
