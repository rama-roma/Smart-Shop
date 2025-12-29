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
import { Modal, notification } from "antd";
import { HeartFilled } from "@ant-design/icons";
import LoadingFunc from "../components/loadingFunc";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "../index.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: products, isLoading } = useGetProductsQuery({});
  const [addToCart] = useAddToCartMutation();

  const [favorites, setFavorites] = useState<Product[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  useEffect(() => {
    const stored = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    ) as Product[];
    setFavorites(stored);
  }, []);

  const handleClickAdd = (productId: number) => {
    addToCart(productId);
  };

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

  const [openLoginDialog, setOpenLoginDialog] = useState(false);

  return (
    <>
      <div className="hidden md:block">
        <main>
          <Swipper img={img1} />

          <section className="mt-10 mb-10 flex flex-col gap-4">
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <LoadingFunc />
              </div>
            )}

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
              {!isLoading &&
                products?.slice(0, 6).map((e) => {
                  const isFavorite = favorites.some((f) => f.id === e.id);

                  return (
                    <div
                      key={e.id}
                      className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition-all duration-300
                                 hover:-translate-y-2 relative flex flex-col p-4 gap-3"
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
                          className={`transition-transform duration-300 ${
                            isFavorite
                              ? "fill-red-500 text-red-500 scale-110"
                              : "hover:scale-110"
                          }`}
                        />
                      </button>

                      <Link
                        to={`/infoPage/${e.id}`}
                        className="absolute top-10 right-2 hover:scale-110 transition"
                      >
                        <Eye size={22} />
                      </Link>

                      <div className="w-full h-40 flex items-center justify-center">
                        <div className="w-full h-40 bee-swiper">
                          <Swiper
                            modules={[Pagination, Navigation]}
                            pagination={{ clickable: true }}
                            navigation
                            loop
                            className="w-full h-full"
                          >
                            {[e.image, e.image, e.image].map((img, idx) => (
                              <SwiperSlide key={idx}>
                                <img
                                  className="w-full h-40 object-contain transition-transform duration-300 hover:scale-105"
                                  src={`https://store-api.softclub.tj/images/${img}`}
                                  alt={e.productName}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
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
                        onClick={() => {
                          if (localStorage.getItem("token")) {
                            handleClickAdd(e.id);
                            setAnimatingId(e.id);

                            setTimeout(() => setAnimatingId(null), 600);

                            notification.success({
                              message: t("set.ttt"),
                              placement: "bottomRight",
                              duration: 2,
                            });
                          } else {
                            setOpenDialog(true);
                          }
                        }}
                        className={`cursor-pointer mt-auto flex items-center justify-center gap-2 font-semibold py-2 rounded-lg
                          bg-yellow-400 hover:bg-yellow-500 text-black
                          transition-all duration-300
                          ${
                            animatingId === e.id
                              ? "scale-110 shadow-[0_0_20px_rgba(255,193,7,0.9)]"
                              : "hover:scale-105"
                          }
                        `}
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
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <LoadingFunc />
              </div>
            )}

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
              {!isLoading &&
                products?.slice(0, 6).map((e) => {
                  const isFavorite = favorites.some((f) => f.id === e.id);

                  return (
                    <div
                      key={e.id}
                      className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition-all duration-300
                                 hover:-translate-y-2 relative flex flex-col p-4 gap-3"
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
                          className={`transition-transform duration-300 ${
                            isFavorite
                              ? "fill-red-500 text-red-500 scale-110"
                              : "hover:scale-110"
                          }`}
                        />
                      </button>

                      <Link
                        to={`/infoPage/${e.id}`}
                        className="absolute top-10 right-2 hover:scale-110 transition"
                      >
                        <Eye size={22} />
                      </Link>

                      <div className="w-full h-40 flex items-center justify-center">
                        <div className="w-full h-40 bee-swiper">
                          <Swiper
                            modules={[Pagination, Navigation]}
                            pagination={{ clickable: true }}
                            navigation
                            loop
                            className="w-full h-full"
                          >
                            {[e.image, e.image, e.image].map((img, idx) => (
                              <SwiperSlide key={idx}>
                                <img
                                  className="w-full h-40 object-contain transition-transform duration-300 hover:scale-105"
                                  src={`https://store-api.softclub.tj/images/${img}`}
                                  alt={e.productName}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
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
                        onClick={() => {
                          if (localStorage.getItem("token")) {
                            handleClickAdd(e.id);
                            setAnimatingId(e.id);

                            setTimeout(() => setAnimatingId(null), 600);

                            notification.success({
                              message: t("set.ttt"),
                              placement: "bottomRight",
                              duration: 2,
                            });
                          } else {
                            setOpenDialog(true);
                          }
                        }}
                        className={`cursor-pointer mt-auto flex items-center justify-center gap-2 font-semibold py-2 rounded-lg
                          bg-yellow-400 hover:bg-yellow-500 text-black
                          transition-all duration-300
                          ${
                            animatingId === e.id
                              ? "scale-110 shadow-[0_0_20px_rgba(255,193,7,0.9)]"
                              : "hover:scale-105"
                          }
                        `}
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
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <LoadingFunc />
              </div>
            )}

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
              {!isLoading &&
                products?.slice(0, 6).map((e) => {
                  const isFavorite = favorites.some((f) => f.id === e.id);

                  return (
                    <div
                      key={e.id}
                      className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition-all duration-300
                                 hover:-translate-y-2 relative flex flex-col p-4 gap-3"
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
                          className={`transition-transform duration-300 ${
                            isFavorite
                              ? "fill-red-500 text-red-500 scale-110"
                              : "hover:scale-110"
                          }`}
                        />
                      </button>

                      <Link
                        to={`/infoPage/${e.id}`}
                        className="absolute top-10 right-2 hover:scale-110 transition"
                      >
                        <Eye size={22} />
                      </Link>

                      <div className="w-full h-40 flex items-center justify-center">
                        <div className="w-full h-40 bee-swiper">
                          <Swiper
                            modules={[Pagination, Navigation]}
                            pagination={{ clickable: true }}
                            navigation
                            loop
                            className="w-full h-full"
                          >
                            {[e.image, e.image, e.image].map((img, idx) => (
                              <SwiperSlide key={idx}>
                                <img
                                  className="w-full h-40 object-contain transition-transform duration-300 hover:scale-105"
                                  src={`https://store-api.softclub.tj/images/${img}`}
                                  alt={e.productName}
                                />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
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
                        onClick={() => {
                          if (localStorage.getItem("token")) {
                            handleClickAdd(e.id);
                            setAnimatingId(e.id);

                            setTimeout(() => setAnimatingId(null), 600);

                            notification.success({
                              message: t("set.ttt"),
                              placement: "bottomRight",
                              duration: 2,
                            });
                          } else {
                            setOpenDialog(true);
                          }
                        }}
                        className={`cursor-pointer mt-auto flex items-center justify-center gap-2 font-semibold py-2 rounded-lg
                          bg-yellow-400 hover:bg-yellow-500 text-black
                          transition-all duration-300
                          ${
                            animatingId === e.id
                              ? "scale-110 shadow-[0_0_20px_rgba(255,193,7,0.9)]"
                              : "hover:scale-105"
                          }
                        `}
                      >
                        <ShoppingCart size={18} /> {t("main.lol6")}
                      </button>
                    </div>
                  );
                })}
            </section>
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
            body: {
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

      <div className="block md:hidden px-4 py-6">
        <main className="flex flex-col gap-8">
          <Swipper img={img1} />

          <section className="flex flex-col gap-4">
            {isLoading && (
              <div className="flex justify-center py-4">
                <LoadingFunc />
              </div>
            )}

            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{t("main.lol")}</h1>
              <Link
                to="/productPage"
                className="bg-gray-300 px-3 py-1 rounded-lg text-black text-sm"
              >
                {t("main.lol1")}
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              {!isLoading &&
                products?.slice(0, 6).map((e) => {
                  const isFavorite = favorites.some((f) => f.id === e.id);

                  return (
                    <div
                      key={e.id}
                      className="rounded-xl shadow-xl p-4 flex flex-col gap-3 bg-white relative transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <h1
                        className={`text-white text-xs w-16 text-center font-bold px-2 py-1 rounded-md absolute top-2 left-2 ${
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
                          className={`transition-transform duration-300 ${
                            isFavorite
                              ? "fill-red-500 text-red-500 scale-110"
                              : "hover:scale-110"
                          }`}
                        />
                      </button>

                      <Link
                        to={`/infoPage/${e.id}`}
                        className="absolute top-10 right-2 hover:scale-110 transition"
                      >
                        <Eye size={22} />
                      </Link>

                      <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-lg">
                        <Swiper
                          modules={[Pagination, Navigation]}
                          pagination={{ clickable: true }}
                          navigation
                          loop
                          className="w-full h-full"
                        >
                          {[e.image, e.image, e.image].map((img, idx) => (
                            <SwiperSlide key={idx}>
                              <img
                                className="w-full h-48 object-contain transition-transform duration-300 hover:scale-105"
                                src={`https://store-api.softclub.tj/images/${img}`}
                                alt={e.productName}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>

                      <div>
                        <h2 className="font-semibold text-base">
                          {e.productName}
                        </h2>
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
                        onClick={() => {
                          if (localStorage.getItem("token")) {
                            handleClickAdd(e.id);
                            setAnimatingId(e.id);

                            setTimeout(() => setAnimatingId(null), 600);

                            notification.success({
                              message: t("set.ttt"),
                              placement: "bottomRight",
                              duration: 2,
                            });
                          } else {
                            setOpenDialog(true);
                          }
                        }}
                        className={`mt-auto flex items-center justify-center gap-2 font-semibold py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 ${
                          animatingId === e.id
                            ? "scale-110 shadow-[0_0_15px_rgba(255,193,7,0.7)]"
                            : "hover:scale-105"
                        }`}
                      >
                        <ShoppingCart size={18} /> {t("main.lol6")}
                      </button>
                    </div>
                  );
                })}
            </div>
          </section>

          <Swipper img={img2} />

          <section className="flex flex-col gap-4">
            {isLoading && (
              <div className="flex justify-center py-4">
                <LoadingFunc />
              </div>
            )}

            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{t("main.lol2")}</h1>
              <Link
                to="/productPage"
                className="bg-gray-300 px-3 py-1 rounded-lg text-black text-sm"
              >
                {t("main.lol1")}
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              {!isLoading &&
                products?.slice(0, 2).map((e) => {
                  const isFavorite = favorites.some((f) => f.id === e.id);

                  return (
                    <div
                      key={e.id}
                      className="rounded-xl shadow-xl p-4 flex flex-col gap-3 bg-white relative transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <h1
                        className={`text-white text-xs w-16 text-center font-bold px-2 py-1 rounded-md absolute top-2 left-2 ${
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
                          className={`transition-transform duration-300 ${
                            isFavorite
                              ? "fill-red-500 text-red-500 scale-110"
                              : "hover:scale-110"
                          }`}
                        />
                      </button>

                      <Link
                        to={`/infoPage/${e.id}`}
                        className="absolute top-10 right-2 hover:scale-110 transition"
                      >
                        <Eye size={22} />
                      </Link>

                      <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-lg">
                        <Swiper
                          modules={[Pagination, Navigation]}
                          pagination={{ clickable: true }}
                          navigation
                          loop
                          className="w-full h-full"
                        >
                          {[e.image, e.image, e.image].map((img, idx) => (
                            <SwiperSlide key={idx}>
                              <img
                                className="w-full h-48 object-contain transition-transform duration-300 hover:scale-105"
                                src={`https://store-api.softclub.tj/images/${img}`}
                                alt={e.productName}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>

                      <div>
                        <h2 className="font-semibold text-base">
                          {e.productName}
                        </h2>
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
                        onClick={() => {
                          if (localStorage.getItem("token")) {
                            handleClickAdd(e.id);
                            setAnimatingId(e.id);

                            setTimeout(() => setAnimatingId(null), 600);

                            notification.success({
                              message: t("set.ttt"),
                              placement: "bottomRight",
                              duration: 2,
                            });
                          } else {
                            setOpenDialog(true);
                          }
                        }}
                        className={`mt-auto flex items-center justify-center gap-2 font-semibold py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 ${
                          animatingId === e.id
                            ? "scale-110 shadow-[0_0_15px_rgba(255,193,7,0.7)]"
                            : "hover:scale-105"
                        }`}
                      >
                        <ShoppingCart size={18} /> {t("main.lol6")}
                      </button>
                    </div>
                  );
                })}
            </div>
          </section>

          <Swipper img={img3} />
          <section className="flex flex-col gap-4">
            {isLoading && (
              <div className="flex justify-center py-4">
                <LoadingFunc />
              </div>
            )}

            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{t("main.lol3")}</h1>
              <Link
                to="/productPage"
                className="bg-gray-300 px-3 py-1 rounded-lg text-black text-sm"
              >
                {t("main.lol1")}
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              {!isLoading &&
                products?.slice(0, 4).map((e) => {
                  const isFavorite = favorites.some((f) => f.id === e.id);

                  return (
                    <div
                      key={e.id}
                      className="rounded-xl shadow-xl p-4 flex flex-col gap-3 bg-white relative transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <h1
                        className={`text-white text-xs w-16 text-center font-bold px-2 py-1 rounded-md absolute top-2 left-2 ${
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
                          className={`transition-transform duration-300 ${
                            isFavorite
                              ? "fill-red-500 text-red-500 scale-110"
                              : "hover:scale-110"
                          }`}
                        />
                      </button>

                      <Link
                        to={`/infoPage/${e.id}`}
                        className="absolute top-10 right-2 hover:scale-110 transition"
                      >
                        <Eye size={22} />
                      </Link>

                      <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-lg">
                        <Swiper
                          modules={[Pagination, Navigation]}
                          pagination={{ clickable: true }}
                          navigation
                          loop
                          className="w-full h-full"
                        >
                          {[e.image, e.image, e.image].map((img, idx) => (
                            <SwiperSlide key={idx}>
                              <img
                                className="w-full h-48 object-contain transition-transform duration-300 hover:scale-105"
                                src={`https://store-api.softclub.tj/images/${img}`}
                                alt={e.productName}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>

                      <div>
                        <h2 className="font-semibold text-base">
                          {e.productName}
                        </h2>
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
                        onClick={() => {
                          if (localStorage.getItem("token")) {
                            handleClickAdd(e.id);
                            setAnimatingId(e.id);

                            setTimeout(() => setAnimatingId(null), 600);

                            notification.success({
                              message: t("set.ttt"),
                              placement: "bottomRight",
                              duration: 2,
                            });
                          } else {
                            setOpenDialog(true);
                          }
                        }}
                        className={`mt-auto flex items-center justify-center gap-2 font-semibold py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black transition-all duration-300 ${
                          animatingId === e.id
                            ? "scale-110 shadow-[0_0_15px_rgba(255,193,7,0.7)]"
                            : "hover:scale-105"
                        }`}
                      >
                        <ShoppingCart size={18} /> {t("main.lol6")}
                      </button>
                    </div>
                  );
                })}
            </div>
          </section>
        </main>

        <Modal
          open={openLoginDialog}
          onCancel={() => setOpenLoginDialog(false)}
          onOk={() => {
            setOpenLoginDialog(false);
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
            body: {
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
    </>
  );
};

export default HomePage;
