import { Eye, Heart, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import {
  useAddToCartMutation,
  useDeleteCartMutation,
  useGetCartQuery,
  useIncreaseMutation,
  useReduceMutation,
  useClearCartMutation,
} from "../store/api/cartApi/cart";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Product } from "../store/api/productApi/product";
import { useTheme } from "../contextApi/theme/ThemeContext";
// @ts-ignore
import img from "../assets/box.png";
import { Modal, notification } from "antd";
import axios from "axios";
import { HeartFilled } from "@ant-design/icons";

const CartPage = () => {
  const navigate = useNavigate();
  interface Order {
    name: string;
    phone: string;
    address: string;
    items: string;
    total: string;
  }
  const submitOrder = async () => {
    const order: Order = {
      name: "Client",
      phone: "Iphone",
      address: "sino 136/6",
      items: "Shoes",
      total: "120$",
    };
    const message = `
Name: ${order.name}
Phone: ${order.phone}
Address: ${order.address}
Items: ${order.items}
Total: ${order.total}
`;
    try {
      await axios.post(
        `https://api.telegram.org/bot8513823374:AAG7vH7hqu8ksXMD0bxJ9A3CQA1s38wsfdE/sendMessage`,
        {
          chat_id: "-5138152234",
          text: message,
        }
      );
    } catch (error) {
      console.error("Telegram error:", error);
    }
    setOpenModal(false);
    clearCart();
    navigate("/homePage");
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
  const themeClasses =
    theme == "dark"
      ? "bg-[#2b2b2b] text-white shadow-2xl"
      : "bg-[#ffffffa5] text-black shadow-2xl";

  const [openModal, setOpenModal] = useState(false);

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

            <section
              className={`border p-4 rounded-2xl 
              ${
                theme == "dark"
                  ? "border-[#444343] border-[3px]"
                  : "border-[#c2c1c1] border-[3px]"
              }
              `}
            >
              <table className="w-full border-separate border-spacing-y-3">
                <thead className="text-sm opacity-70">
                  <tr>
                    <th
                      className={`px-4 ${
                        theme === "dark"
                          ? "border-r border-gray-600"
                          : "border-r border-yellow-200"
                      } text-left`}
                    >
                      {t("cart.ca2")}
                    </th>
                    <th
                      className={`px-4 ${
                        theme === "dark"
                          ? "border-r border-gray-600"
                          : "border-r border-yellow-200"
                      }`}
                    >
                      {t("cart.ca3")}
                    </th>
                    <th
                      className={`px-4 ${
                        theme === "dark"
                          ? "border-r border-gray-600"
                          : "border-r border-yellow-200"
                      }`}
                    >
                      {t("cart.ca4")}
                    </th>
                    <th
                      className={`px-4 ${
                        theme === "dark"
                          ? "border-r border-gray-600"
                          : "border-r border-yellow-200"
                      }`}
                    >
                      {t("cart.ca5")}
                    </th>
                    <th
                      className={`px-4 ${
                        theme === "dark"
                          ? "border-r border-gray-600"
                          : "border-r border-yellow-200"
                      }`}
                    >
                      {t("cart.ca6")}
                    </th>
                    <th
                      className={`px-4 ${
                        theme === "dark"
                          ? "border-r border-gray-600"
                          : "border-r border-yellow-200"
                      }`}
                    >
                      {t("cart.ca7")}
                    </th>
                    <th
                      className={`px-4 ${
                        theme === "dark"
                          ? "border-r border-gray-600"
                          : "border-r border-yellow-200"
                      }`}
                    >
                      {t("cart.ca8")}
                    </th>
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
                        <td
                          className={`p-4 flex items-center gap-4 ${
                            theme === "dark"
                              ? "border-r border-gray-600"
                              : "border-r border-yellow-200"
                          }`}
                        >
                          <img
                            src={`https://store-api.softclub.tj/images/${e.product.image}`}
                            className="w-16 h-16 object-contain rounded-[10px]"
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

                        <td
                          className={`text-center ${
                            theme === "dark"
                              ? "border-r border-gray-600"
                              : "border-r border-yellow-200"
                          }`}
                        >
                          {e.product.color}
                        </td>

                        <td
                          className={`text-center ${
                            theme === "dark"
                              ? "border-r  border-gray-600"
                              : "border-r border-yellow-200"
                          }`}
                        >
                          ${e.product.price}
                        </td>

                        <td
                          className={`text-center ${
                            theme === "dark"
                              ? "border-r border-gray-600"
                              : "border-r border-yellow-200"
                          }`}
                        >
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

                        <td
                          className={`text-center ${
                            theme === "dark"
                              ? "border-r border-gray-600"
                              : "border-r border-yellow-200"
                          }`}
                        >
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

                        <td
                          className={`text-center ${
                            theme === "dark"
                              ? "border-r border-gray-600"
                              : "border-r border-yellow-200"
                          }`}
                        >
                          <button
                            onClick={() => deleteFromCart(e.id)}
                            className="text-red-400 hover:text-red-600 transition"
                          >
                            <Trash2 size={20} />
                          </button>
                        </td>

                        <td
                          className={`text-center ${
                            theme === "dark"
                              ? "border-r border-gray-600"
                              : "border-r border-yellow-200"
                          }`}
                        >
                          <h1>${e.product.price * e.quantity}</h1>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
            <section className="flex items-center ml-260 mt-10 justify-start">
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
                <button
                  onClick={() => setOpenModal(true)}
                  className="p-3 h-15 rounded-[10px] border border-amber-400 w-full bg-amber-400"
                >
                  {t("cart.ca16")}
                </button>
              </div>
            </section>
          </main>
        ) : (
          <div className="h-130 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-2.5">
              <img src={img} alt="" />
              <h1 className="font-bold">{t("cart.ca10")}</h1>
              <p>{t("cart.ca17")}</p>
              <Link to="/homePage">
                <button className="p-4 w-80 bg-amber-400 rounded-[10px]">
                  {t("set.t5")}
                </button>
              </Link>
            </div>
          </div>
        )}
        <Modal
          open={openModal}
          onCancel={() => setOpenModal(false)}
          onOk={submitOrder}
          centered
          okText={t("cart.ca16")}
          cancelButtonProps={{ style: { display: "none" } }}
          okButtonProps={{
            style: {
              background: "linear-gradient(135deg, #FFD36A, #FFB703)",
              color: "#2b2b2b",
              borderRadius: "12px",
              border: "none",
              fontWeight: 600,
              padding: "6px 22px",
              boxShadow: "0 6px 15px rgba(255, 193, 7, 0.4)",
            },
          }}
          styles={{
            body: {
              borderRadius: "20px",
              background: "linear-gradient(180deg, #FFF6D6, #FFE9A3)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.18)",
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
              🐝 {t("set.t7")}
            </div>
          }
        ></Modal>
      </div>

      <div className="block md:hidden px-4 py-6">
        {productsInCart.length > 0 ? (
          <div className="flex flex-col gap-4">
            {productsInCart.map((e) => {
              const isFavorite = favorites.some((f) => f.id === e.product.id);

              return (
                <div
                  key={e.id}
                  className={`rounded-2xl p-4 shadow-md
              ${
                theme === "dark"
                  ? "bg-[#1f1f1f] border border-[#3a3a3a]"
                  : "bg-white border border-yellow-200"
              }
            `}
                >
                  <div className="flex gap-4">
                    <img
                      src={`https://store-api.softclub.tj/images/${e.product.image}`}
                      className="w-20 h-20 object-contain rounded-xl"
                    />

                    <div className="flex-1">
                      <h2 className="font-semibold">{e.product.productName}</h2>
                      <p className="text-sm opacity-70">{e.product.color}</p>

                      <div className="flex items-center gap-3 mt-2">
                        <span className="font-bold text-amber-500">
                          ${e.product.price}
                        </span>

                        <button onClick={() => handleAddToFavorites(e.product)}>
                          <Heart
                            size={18}
                            className={
                              isFavorite
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400"
                            }
                          />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteFromCart(e.id)}
                      className="text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="my-3 h-[1px] bg-yellow-200/60" />

                  <div className="flex items-center justify-between">
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

                    <span className="font-bold">
                      ${e.product.price * e.quantity}
                    </span>
                  </div>
                </div>
              );
            })}

            <div
              className={`mt-4 p-4 rounded-2xl
          ${
            theme === "dark"
              ? "bg-[#2a2a2a] border border-[#3b3a3a]"
              : "bg-white border border-yellow-300"
          }
        `}
            >
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

              <button
                onClick={() => setOpenModal(true)}
                className="mt-4 w-full p-3 rounded-xl bg-amber-400 font-semibold"
              >
                {t("cart.ca16")}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 mt-20">
            <img src={img} className="w-40" />
            <h1 className="font-bold">{t("cart.ca10")}</h1>
            <Link to="/homePage">
              <button className="mt-3 px-6 py-3 bg-amber-400 rounded-xl">
                {t("set.t5")}
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
