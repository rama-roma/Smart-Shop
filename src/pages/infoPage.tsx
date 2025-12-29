import { useNavigate, useParams } from "react-router";
import { useGetProductByIdQuery } from "../store/api/productApi/product";
import { useTranslation } from "react-i18next";
import { Copy, MessageCircleMore, ShoppingCart } from "lucide-react";
import { useState } from "react";
import LoadingFunc from "../components/loadingFunc";
import { useTheme } from "../contextApi/theme/ThemeContext";
import { useAddToCartMutation } from "../store/api/cartApi/cart";
import { Modal, notification } from "antd";

const InfoPage = () => {
  const { id } = useParams();
  const { data } = useGetProductByIdQuery(Number(id));
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [copied, setCopied] = useState(false);
  const [addToCart] = useAddToCartMutation();
  const handleClickAdd = (productId: number) => {
    addToCart(productId);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const [animatingId, setAnimatingId] = useState<number | null>(null);

  if (!data)
    return (
      <div className="h-[70vh] flex items-center justify-center">
        <LoadingFunc />
      </div>
    );

  const imageSrc = data.images?.length
    ? `https://store-api.softclub.tj/images/${data.images[0].images}`
    : "";

  const bg =
    theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-[#f6f7f9] text-black";

  const card =
    theme === "dark"
      ? "bg-[#1b1b1b] border-white/10"
      : "bg-white border-black/10";

  const Row = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between items-center">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );

  return (
    <>
      <div className={`hidden md:block `}>
        <main className="mt-10 mb-20">
          <div className="mb-6 text-sm text-blue-500">
            <span
              className="cursor-pointer hover:underline"
              onClick={() => navigate("/homePage")}
            >
              {t("pol.po")}
            </span>{" "}
            / <span className="text-gray-400">{data.productName}</span>
          </div>

          <section className="grid grid-cols-[580px_1fr] grid-rows-[580px_1fr] gap-10 items-start">
            <div
              className={`rounded-3xl border ${card} p-6 flex items-center justify-center
            transition-all duration-500 hover:scale-[1.02]`}
            >
              {imageSrc ? (
                <img
                  src={imageSrc}
                  className="w-full h-[530px] object-contain
                transition-all duration-700 ease-out hover:scale-105"
                />
              ) : (
                <div className="text-gray-400">No image</div>
              )}
            </div>

            <article
              className={`rounded-3xl border ${card} p-8 space-y-6
            transition-all duration-500`}
            >
              <div>
                <h1 className="text-3xl font-bold mb-1">{data.productName}</h1>
                <p className="text-gray-500">
                  {t("main.lol8")} ({data.color})
                </p>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  ⭐ {t("main.lol9")}
                </span>
                <span className="flex items-center gap-2">
                  <MessageCircleMore size={16} /> {t("main.lol10")}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <Row label={t("xa.xaxa")} value={data.code} />
                <Row label={t("xa.xaxa1")} value={data.brand} />
                <Row label={t("xa.xaxa2")} value={data.color} />
                <Row label={t("xa.xaxa3")} value={`$${data.price}`} />
                <Row
                  label={t("xa.xaxa4")}
                  value={data.hasDiscount ? "New" : "-20%"}
                />
                <Row label={t("xa.xaxa5")} value={`$${data.discountPrice}`} />
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">{t("xa.xaxa6")}</p>
                <p className="text-sm leading-relaxed">{data.description}</p>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(data.code.toString());
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="text-sm flex items-center gap-2 text-gray-500 hover:text-blue-500 transition"
              >
                <Copy size={16} />
                {copied ? "Copied" : "Copy code"}
              </button>

              <button
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    addToCart(data.id);

                    notification.success({
                      message: t("set.ttt"),
                      placement: "bottomRight",
                      duration: 2,
                    });
                  } else {
                    setOpenDialog(true);
                  }
                }}
                className="w-full mt-4 py-4 rounded-2xl
  bg-amber-300 text-black
  font-semibold text-lg
  flex items-center justify-center gap-2
  transition-all duration-300
  hover:scale-[1.02] active:scale-[0.97]"
              >
                <ShoppingCart size={20} />
                {t("main.lol6")}
              </button>
            </article>
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

      <div className="block md:hidden p-4">
        <div
          className={`rounded-3xl border ${card} p-4 mb-4 flex items-center justify-center`}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              className="w-full h-[300px] object-contain transition-all duration-500"
            />
          ) : (
            <div className="text-gray-400">No image</div>
          )}
        </div>

        <div className={`rounded-3xl border ${card} p-4 space-y-4`}>
          <h1 className="text-2xl font-bold">{data.productName}</h1>
          <p className="text-gray-500">
            {t("main.lol8")} ({data.color})
          </p>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">⭐ {t("main.lol9")}</span>
            <span className="flex items-center gap-2">
              <MessageCircleMore size={16} /> {t("main.lol10")}
            </span>
          </div>

          <div className="space-y-2 text-sm">
            <Row label={t("xa.xaxa")} value={data.code} />
            <Row label={t("xa.xaxa1")} value={data.brand} />
            <Row label={t("xa.xaxa2")} value={data.color} />
            <Row label={t("xa.xaxa3")} value={`$${data.price}`} />
            <Row
              label={t("xa.xaxa4")}
              value={data.hasDiscount ? "New" : "-20%"}
            />
            <Row label={t("xa.xaxa5")} value={`$${data.discountPrice}`} />
          </div>

          <p className="text-sm text-gray-500">{t("xa.xaxa6")}</p>
          <p className="text-sm leading-relaxed">{data.description}</p>

          <button
            onClick={() => {
              navigator.clipboard.writeText(data.code.toString());
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
            className="text-sm flex items-center gap-2 text-gray-500 hover:text-blue-500 transition"
          >
            <Copy size={16} /> {copied ? "Copied" : "Copy code"}
          </button>

          <button
            onClick={() => {
              if (localStorage.getItem("token")) {
                addToCart(data.id);
                notification.success({
                  message: t("set.ttt"),
                  placement: "bottomRight",
                  duration: 2,
                });
              } else {
                setOpenDialog(true);
              }
            }}
            className="w-full py-4 mt-4 rounded-2xl bg-amber-300 text-black font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.97]"
          >
            <ShoppingCart size={20} /> {t("main.lol6")}
          </button>
        </div>
      </div>
    </>
  );
};

export default InfoPage;
