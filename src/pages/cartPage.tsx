import { Eye, Heart, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import {
  useAddToCartMutation,
  useDeleteCartMutation,
  useGetCartQuery,
  useIncreaseMutation,
  useReduceMutation,
  useClearCartMutation,
} from "../store/api/cartApi/cart";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Product } from "../store/api/productApi/product";
import { useTheme } from "../contextApi/theme/ThemeContext";

const CartPage = () => {
  interface Order {
    name: string;
    phone: string;
    address: string;
    items: string;
    total: string;
  }
  const submitOrder = async (): Promise<void> => {
    const order: Order = {
      name: "name",
      phone: "phone",
      address: "adress",
      items: "Shoes x1, Hoodie x2",
      total: "$120",
    };
    try {
      const response = await fetch("http://localhost:3001/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      const data: { success: boolean } = await response.json();
      if (data.success) {
        alert("Order sent to Telegram");
      } else {
        alert("Order failed");
      }
    } catch {
      alert("Backend not reachable");
    }

  };
  const { data } = useGetCartQuery();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [deleteFromCart] = useDeleteCartMutation();
  const [increase] = useIncreaseMutation();
  const [reduce] = useReduceMutation();
  const [clearCart] = useClearCartMutation();
  const [favorites, setFavorites] = useState<Product[]>([]);

  const productsInCart = data?.data?.[0]?.productsInCart || [];
  const totalPrice = productsInCart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

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
  const themeClasses =
    theme == "dark"
      ? "bg-[#2b2b2b] text-white shadow-2xl"
      : "bg-[#ffffffa5] text-black shadow-2xl";

  return (
    <>
      <div className="hidden md:block">
        {data?.data[0].productsInCart?.length > 0 ? (
          <main
            className={`p-4  transition-all  duration-300  rounded-[10px]  ${themeClasses}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl">{t("cart.ca")}</h1>

              <button
                onClick={() => clearCart()}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/90 hover:bg-red-600 transition text-white"
              >
                <Trash2 size={18} />
                {t("cart.ca1")}
              </button>
            </div>

            <section>
              <table className="w-full border-separate border-spacing-y-3">
                <thead className="text-sm opacity-70">
                  <tr>
                    <th className="text-left px-4">{t("cart.ca2")}</th>
                    <th>{t("cart.ca3")}</th>
                    <th>{t("cart.ca4")}</th>
                    <th>{t("cart.ca5")}</th>
                    <th>{t("cart.ca6")}</th>
                    <th>{t("cart.ca7")}</th>
                    <th>{t("cart.ca8")}</th>
                  </tr>
                </thead>

                <tbody>
                  {data?.data[0].productsInCart.map((e) => {
                    const isFavorite = favorites.some(
                      (f) => f.id === e.product.id
                    );

                    return (
                      <tr
                        key={e.id}
                        className={`rounded-2xl ${
                          theme === "dark" ? "bg-[#1f1f1f]" : "bg-white"
                        } transition hover:scale-[1.01]`}
                      >
                        <td className="p-4 flex items-center gap-4 rounded-2xl">
                          <img
                            src={`https://store-api.softclub.tj/images/${e.product.image}`}
                            className="w-16 h-16 object-contain rounded-lg"
                          />
                          <div>
                            <p className="font-semibold">
                              {e.product.productName}
                            </p>
                            <Link
                              to={`/infoPage/${e.product.id}`}
                              className="text-sm text-blue-400 hover:underline flex items-center gap-1"
                            >
                              <Eye size={14} /> {t("cart.ca9")}
                            </Link>
                          </div>
                        </td>

                        <td className="text-center">{e.product.color}</td>

                        <td className="text-center font-bold text-yellow-400">
                          ${e.product.price}
                        </td>

                        <td className="text-center">
                          <button
                            onClick={() => handleAddToFavorites(e.product)}
                          >
                            <Heart
                              size={20}
                              className={
                                isFavorite
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-400 hover:text-red-400 transition"
                              }
                            />
                          </button>
                        </td>

                        <td className="text-center">
                          <div className="flex items-center justify-center gap-3">
                            <button
                              onClick={() => reduce(e.id)}
                              className="p-2 rounded-lg bg-black/10 hover:bg-black/20 transition"
                            >
                              <Minus size={16} />
                            </button>

                            <span className="font-semibold">{e.quantity}</span>

                            <button
                              onClick={() => increase(e.id)}
                              className="p-2 rounded-lg bg-black/10 hover:bg-black/20 transition"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>

                        <td className="text-center">
                          <button
                            onClick={() => deleteFromCart(e.id)}
                            className="text-red-400 hover:text-red-600 transition"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>

                        <td className="text-center rounded-r-xl">
                          <h1>${e.product.price * e.quantity}</h1>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
            <section className="flex items-center justify-start">
              <div
                className={`w-100 h-100 p-4 border 
          ${
            theme === "dark"
              ? "border-[#3b3a3a] border-[3px] bg-[#303030] rounded-2xl"
              : "border-[white] border-[3px] bg-[white] shadow-2xl rounded-2xl"
          }
          `}
              >
                <h1 className="text-[20px]">{t("cart.ca11")}</h1>
                <br />
                <div className="flex justify-between items-center">
                  <h1>{t("cart.ca2")}</h1>
                  <p>${totalPrice}</p>
                </div>
                <br />
                <div className="flex justify-between items-center">
                  <h1>{t("cart.ca12")}</h1>
                  <p onClick={() => submitOrder()}>$20</p>
                </div>
                <br />
                <div className="flex justify-between items-center">
                  <h1>{t("cart.ca13")}</h1>
                  <p>$0</p>
                </div>
                <br />
                <div className="flex justify-between items-center">
                  <h1>{t("cart.ca14")}</h1>
                  <p>$0</p>
                </div>
                <br />
                <div className="flex justify-between items-center">
                  <h1 className="text-[22px] font-bold">{t("cart.ca8")}</h1>
                  <p>${totalPrice - 20}</p>
                </div>
                <br />
                <button className="p-3 h-15 rounded-[10px] border border-amber-400 w-full bg-amber-400">
                  {t("cart.ca16")}
                </button>
              </div>
            </section>
          </main>
        ) : (
          <div className="h-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2.5">
              <ShoppingBag />
              <h1>{t("cart.ca10")}</h1>
            </div>
          </div>
        )}
      </div>

      <div className="block md:hidden px-4 pb-32">
        {productsInCart.length > 0 ? (
          <>
            <h1 className="text-xl font-bold mb-4">{t("cart.ca")}</h1>

            <div className="flex flex-col gap-4">
              {productsInCart.map((e) => {
                const isFavorite = favorites.some((f) => f.id === e.product.id);

                return (
                  <div
                    key={e.id}
                    className={`rounded-2xl p-4 flex gap-4
              ${
                theme === "dark"
                  ? "bg-[#1f1f1f] text-white"
                  : "bg-white text-black shadow"
              }`}
                  >
                    <img
                      src={`https://store-api.softclub.tj/images/${e.product.image}`}
                      className="w-20 h-20 object-contain rounded-xl"
                    />

                    <div className="flex-1 flex flex-col gap-1">
                      <h2 className="font-semibold">{e.product.productName}</h2>
                      <p className="text-sm opacity-70">{e.product.color}</p>

                      <div className="flex items-center gap-3 mt-1">
                        <span className="font-bold text-yellow-400">
                          ${e.product.price}
                        </span>

                        <button onClick={() => handleAddToFavorites(e.product)}>
                          <Heart
                            size={18}
                            className={
                              isFavorite
                                ? "fill-red-500 text-red-500"
                                : "opacity-60"
                            }
                          />
                        </button>

                        <Link to={`/infoPage/${e.product.id}`}>
                          <Eye size={18} />
                        </Link>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => reduce(e.id)}
                            className="p-2 rounded-lg bg-black/10"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="font-semibold">{e.quantity}</span>

                          <button
                            onClick={() => increase(e.id)}
                            className="p-2 rounded-lg bg-black/10"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => deleteFromCart(e.id)}
                          className="text-red-400"
                        >
                          <Trash2 />
                        </button>
                      </div>

                      <div className="text-right font-bold mt-2">
                        ${e.product.price * e.quantity}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className={`mt-6 p-4 rounded-2xl
        ${
          theme === "dark"
            ? "bg-[#1f1f1f] text-white"
            : "bg-white text-black shadow"
        }`}
            >
              <h2 className="text-lg font-bold mb-3">{t("cart.ca11")}</h2>

              <div className="flex justify-between mb-2">
                <span>{t("cart.ca2")}</span>
                <span>${totalPrice}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>{t("cart.ca12")}</span>
                <span>$20</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>{t("cart.ca8")}</span>
                <span>${totalPrice - 20}</span>
              </div>

              <button className="mt-4 w-full bg-amber-400 text-black py-3 rounded-xl font-semibold">
                {t("cart.ca16")}
              </button>

              <button
                onClick={() => clearCart()}
                className="mt-3 w-full text-red-400 text-sm"
              >
                {t("cart.ca1")}
              </button>
            </div>
          </>
        ) : (
          <div className="h-[60vh] flex flex-col items-center justify-center gap-3 opacity-70">
            <ShoppingBag size={32} />
            <h1>{t("cart.ca10")}</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
