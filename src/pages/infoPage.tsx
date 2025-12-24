import { useNavigate, useParams } from "react-router";
import { useGetProductByIdQuery } from "../store/api/productApi/product";
import { useTranslation } from "react-i18next";
import { Copy, MessageCircleMore, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useTheme } from "../store/theme/ThemeContext";


const InfoPage = () => {
  const { id } = useParams();
  const { data } = useGetProductByIdQuery(Number(id));

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const { theme } = useTheme();

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="hidden md:block">
        <main>
          <div className="mt-10 mb-10">
            <button
              className="text-start w-40 p-2 border rounded-[5px] bg-[#ffd36a] border-[#ffd36a] text-black"
              onClick={() => navigate(-1)}
            >
              ⮜ {t("xa.xaxa7")}
            </button>
          </div>

          <div className="flex items-center gap-[10px]">
            <h1 className="text-[30px]">{data.productName}</h1>
            <p>
              <span className="text-[grey]">{t("main.lol8")}</span> (
              {data.color})
            </p>
          </div>

          <div className="flex items-center gap-[10px] mt-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="#FFA500"
              stroke="none"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="mr-5">{t("main.lol9")}</span>
            <MessageCircleMore />
            <span>{t("main.lol10")}</span>
          </div>

          <section className="flex items-start gap-[40px] mt-6">
            <aside className="flex flex-col gap-4">
              {data.images.map((img, idx) => (
                <img
                  key={`thumb1-${idx}`}
                  src={`https://store-api.softclub.tj/images/${img.images}`}
                  alt={data.productName}
                  className="w-25 h-25 object-cover rounded-[8px] shadow-2xl"
                />
              ))}
              {data.images.map((img, idx) => (
                <img
                  key={`thumb2-${idx}`}
                  src={`https://store-api.softclub.tj/images/${img.images}`}
                  alt={data.productName}
                  className="w-25 h-25 object-cover rounded-[8px] shadow-2xl"
                />
              ))}
              {data.images.map((img, idx) => (
                <img
                  key={`thumb3-${idx}`}
                  src={`https://store-api.softclub.tj/images/${img.images}`}
                  alt={data.productName}
                  className="w-25 h-25 object-cover rounded-[8px] shadow-2xl"
                />
              ))}
              {data.images.map((img, idx) => (
                <img
                  key={`thumb4-${idx}`}
                  src={`https://store-api.softclub.tj/images/${img.images}`}
                  alt={data.productName}
                  className="w-25 h-25 object-cover rounded-[8px] shadow-2xl"
                />
              ))}
            </aside>

            <div>
              <img
                src={`https://store-api.softclub.tj/images/${data.images[0]?.images}`}
                alt={data.productName}
                className="w-120 h-115 object-contain rounded-[8px] shadow-2xl"
              />
            </div>

            <article className="p-4 h-115 rounded-lg shadow-md border border-gray-200">
              <div className="flex items-center justify-between w-140 p-2 border-b border-gray-100">
                <span>{t("xa.xaxa")}</span>
                <div className="flex items-center gap-[10px]">
                  <h1>{data.code}</h1>
                  <button
                    onClick={() => handleCopy(data.code.toString())}
                    className="p-1 rounded hover:bg-gray-200"
                  >
                    <Copy
                      size={20}
                      className={copied ? "text-green-500" : "text-black"}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between w-140 p-2 border-b border-gray-100">
                <span>{t("xa.xaxa1")}</span>
                <h1>{data.brand}</h1>
              </div>

              <div className="flex items-center justify-between w-140 p-2 border-b border-gray-100">
                <span>{t("xa.xaxa2")}</span>
                <h1>{data.color}</h1>
              </div>

              <div className="flex items-center justify-between w-140 p-2 border-b border-gray-100">
                <span>{t("xa.xaxa3")}</span>
                <h1>{data.price}</h1>
              </div>

              <div className="flex items-center justify-between w-140 p-2 border-b border-gray-100">
                <span>{t("xa.xaxa4")}</span>
                <h1>{data.hasDiscount ? "New" : "-20%"}</h1>
              </div>

              <div className="flex items-center justify-between w-140 p-2 border-b border-gray-100">
                <span>{t("xa.xaxa5")}</span>
                <h1>{data.discountPrice}</h1>
              </div>

              <div className="flex items-center justify-between w-140 p-2">
                <span>{t("xa.xaxa6")}</span>
                <h1 className="font-normal">{data.description}</h1>
              </div>

              <div className="p-2">
                <button className="mt-auto flex w-40 items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg">
                  <ShoppingCart size={18} />
                  {t("main.lol6")}
                </button>
              </div>
            </article>
          </section>
        </main>
      </div>


      <div className="block md:hidden p-4">
        <button
          className="w-32 p-2 mb-4 bg-[#ffd36a] rounded-lg text-black font-semibold"
          onClick={() => navigate(-1)}
        >
          {t("xa.xaxa7")}
        </button>

        <div className="flex flex-col gap-3">
          <h1 className="text-xl font-bold">{data.productName}</h1>
          <p className="text-sm text-gray-400">
            {t("main.lol8")} ({data.color})
          </p>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-yellow-400">★</span>
            <span>{t("main.lol9")}</span>
            <MessageCircleMore size={16} />
            <span>{t("main.lol10")}</span>
          </div>

          <div className="flex gap-2 overflow-x-auto mt-2">
            {data.images.map((img, idx) => (
              <img
                key={idx}
                src={`https://store-api.softclub.tj/images/${img.images}`}
                alt={data.productName}
                className="w-full h-full object-cover rounded-lg flex-shrink-0 shadow-md"
              />
            ))}
          </div>

          <div
            className={`mt-4 p-4 rounded-xl shadow-md border
        ${
          theme === "dark"
            ? "bg-[#2b2b2b] text-white border-[#555]"
            : "bg-white text-black border-gray-200"
        }`}
          >
            <div className="flex justify-between items-center mb-2">
              <span>{t("xa.xaxa")}</span>
              <div className="flex items-center gap-2">
                <span>{data.code}</span>
                <button
                  onClick={() => handleCopy(data.code.toString())}
                  className="p-1 rounded hover:bg-gray-300"
                >
                  <Copy
                    size={18}
                    className={
                      copied
                        ? "text-green-500"
                        : theme === "dark"
                        ? "text-white"
                        : "text-black"
                    }
                  />
                </button>
              </div>
            </div>

            <div className="flex justify-between mb-1">
              <span>{t("xa.xaxa1")}</span>
              <span>{data.brand}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>{t("xa.xaxa2")}</span>
              <span>{data.color}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>{t("xa.xaxa3")}</span>
              <span>${data.price}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>{t("xa.xaxa4")}</span>
              <span>{data.hasDiscount ? "New" : "-20%"}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>{t("xa.xaxa5")}</span>
              <span>${data.discountPrice}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span>{t("xa.xaxa6")}</span>
              <span className="font-normal">{data.description}</span>
            </div>

            <button className="w-full mt-2 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg flex items-center justify-center gap-2 font-semibold">
              <ShoppingCart size={18} />
              {t("main.lol6")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPage;
