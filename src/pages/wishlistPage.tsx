import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAddToCartMutation } from "../store/api/cartApi/cart";
import { Modal, notification } from "antd";
import { Link, useNavigate } from "react-router";
// @ts-ignore
import img from "../assets/wishCat.png";
const LoadingFunc = () => (
  <div className="flex items-center justify-center py-10">
    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

interface Product {
  id: number;
  productName: string;
  price: number;
  discountPrice?: number;
  hasDiscount?: boolean;
  image?: string;
  color?: string;
}

const WishlistPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCart] = useAddToCartMutation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickAdd = (productId: number) => {
    addToCart(productId);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      const data: Product[] = JSON.parse(
        localStorage.getItem("favorites") || "[]"
      );
      setFavorites(data);
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const handleRemoveFromFavorites = (productId: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== productId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <>
      <div className="hidden md:block">
        <main className="max-w-[1500px] m-auto p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Heart className="text-red-500 fill-red-500" />
              {t("main.lol5")}
            </h1>

            {favorites.length > 0 && (
              <button
                onClick={handleClearFavorites}
                className="mt-[-10px] p-3 rounded-[10px] bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300 transition-colors duration-300"
              >
                {t("main.lol20")}
              </button>
            )}
          </div>

          {isLoading ? (
            <LoadingFunc />
          ) : favorites.length === 0 ? (
            <div className="h-120 flex flex-col items-center gap-[10px] justify-center">
              <img src={img} alt="" />
              <h1 className="font-bold">{t("main.lol4")}</h1>
              <p className="flex items-center gap-[5px]">
                {t("main.lol21")}{" "}
                <Heart className="text-red-500 fill-red-500 w-5 h-5 drop-shadow-md" />{" "}
              </p>
              <Link to="/homePage">
                <button className="p-4 bg-amber-400 w-80 rounded-[10px]">
                  {t("set.t5")}
                </button>
              </Link>
            </div>
          ) : (
            <section className="flex flex-wrap gap-6">
              {favorites.map((e) => (
                <div
                  key={e.id}
                  className="w-56 rounded-xl shadow-2xl hover:shadow-xl transition p-4 flex flex-col gap-3 relative transform hover:-translate-y-1 duration-300"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                    onClick={() => handleRemoveFromFavorites(e.id)}
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="mt-[-10px]">
                    <h1
                      className={`text-white text-xs w-14 text-center font-bold px-2 py-1 rounded-md ${
                        e.hasDiscount ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {e.hasDiscount ? "New" : "-20%"}
                    </h1>
                  </div>

                  <div className="w-full h-40 flex items-center justify-center">
                    <img
                      className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
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
              ))}
            </section>
          )}

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
        </main>
      </div>

      <div className="block md:hidden">
        <main className="max-w-[500px] m-auto p-4">
          <div className="flex flex-col items-center justify-between mb-6 w-full">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Heart className="text-red-500 fill-red-500 w-6 h-6" />
              {t("main.lol5")}
            </h1>

            {favorites.length > 0 && (
              <button
                onClick={handleClearFavorites}
                className="mt-2 p-3 rounded-lg w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-black hover:from-yellow-300 hover:to-orange-300 transition-colors duration-300"
              >
                {t("main.lol20")}
              </button>
            )}
          </div>

          {isLoading ? (
            <LoadingFunc />
          ) : favorites.length === 0 ? (
            <div className="flex flex-col items-center gap-4 justify-center">
              <img src={img} alt="" className="w-60" />
              <h1 className="font-bold text-center">{t("main.lol4")}</h1>
              <p className="flex items-center gap-1 text-center">
                {t("main.lol21")}{" "}
                <Heart className="text-red-500 fill-red-500 w-5 h-5 drop-shadow-md" />
              </p>
              <Link to="/homePage" className="w-full">
                <button className="p-4 w-full bg-amber-400 rounded-lg font-semibold">
                  {t("set.t5")}
                </button>
              </Link>
            </div>
          ) : (
            <section className="flex flex-col gap-4">
              {favorites.map((e) => (
                <div
                  key={e.id}
                  className="w-full rounded-xl shadow-2xl hover:shadow-xl transition p-4 flex flex-col gap-3 relative transform hover:-translate-y-1 duration-300 bg-white dark:bg-gray-800"
                >
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                    onClick={() => handleRemoveFromFavorites(e.id)}
                  >
                    <Trash2 size={20} />
                  </button>

                  <div className="mt-[-10px]">
                    <h1
                      className={`text-white text-xs w-14 text-center font-bold px-2 py-1 rounded-md ${
                        e.hasDiscount ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {e.hasDiscount ? "New" : "-20%"}
                    </h1>
                  </div>

                  <div className="w-full h-40 flex items-center justify-center">
                    <img
                      className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
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
                    className={`cursor-pointer mt-2 flex items-center justify-center gap-2 font-semibold py-2 rounded-lg
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
              ))}
            </section>
          )}
        </main>
      </div>
    </>
  );
};

export default WishlistPage;
