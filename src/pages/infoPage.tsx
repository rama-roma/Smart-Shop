import { useNavigate, useParams } from "react-router";
import { useGetProductByIdQuery } from "../store/api/productApi/product";
import { useTranslation } from "react-i18next";
import { Copy, MessageCircleMore, ShoppingCart } from "lucide-react";
import { useState } from "react";

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

  return (
    <>
      <main>
        <div className="flex flex-col items-start gap-[10px]">
          <div className="mt-10 mb-10">
            <button
              className="text-start w-40 p-2 border rounded-[5px] bg-[#ffd36a] border-[#ffd36a]  text-[black]"
              onClick={() => navigate(-1)}
            >
              ⮜ {t("xa.xaxa7")}
            </button>
          </div>
          <div className="flex items-center gap-[10px]">
            <h1 className="text-[30px]">{data?.productName}</h1>
            <p>
              <span className="text-[grey]">{t("main.lol8")}</span> (
              {data?.color})
            </p>
          </div>
          <div className="flex items-center gap-[10px]">
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
            <br />
            <br />
            <br />
            <MessageCircleMore />
            <span>{t("main.lol10")}</span>
          </div>
        </div>
        <br />
        <section className="flex items-center gap-[40px]">
          <article className="flex flex-col items-center gap-[20px]">
            <div>
              {data?.images?.map((e) => {
                return (
                  <div>
                    <img
                      src={`https://store-api.softclub.tj/images/${e.images}`}
                      alt={data?.productName}
                      className="w-25 h-25 rounded-[8px] shadow-2xl"
                    />
                  </div>
                );
              })}
            </div>
            <div>
              {data?.images?.map((e) => {
                return (
                  <div>
                    <img
                      src={`https://store-api.softclub.tj/images/${e.images}`}
                      alt={data?.productName}
                      className="w-25 h-25 rounded-[8px] shadow-2xl"
                    />
                  </div>
                );
              })}
            </div>
            <div>
              {data?.images?.map((e) => {
                return (
                  <div>
                    <img
                      src={`https://store-api.softclub.tj/images/${e.images}`}
                      alt={data?.productName}
                      className="w-25 h-25 rounded-[8px] shadow-2xl"
                    />
                  </div>
                );
              })}
            </div>
            <div>
              {data?.images?.map((e) => {
                return (
                  <div>
                    <img
                      src={`https://store-api.softclub.tj/images/${e.images}`}
                      alt={data?.productName}
                      className="w-25 h-25 rounded-[8px] shadow-2xl"
                    />
                  </div>
                );
              })}
            </div>
          </article>
          <article>
            <div>
              {data?.images?.map((e) => {
                return (
                  <div>
                    <img
                      src={`https://store-api.softclub.tj/images/${e.images}`}
                      alt={data?.productName}
                      className="w-120 h-115 rounded-[8px] shadow-2xl"
                    />
                  </div>
                );
              })}
            </div>
          </article>
          <article className="p-4 h-115 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center justify-between w-140 p-2 border-b border-gray-100">
              <span>{t("xa.xaxa")}</span>
              <div className="flex items-center gap-[10px]">
                <h1>{data?.code}</h1>
                <button
                  onClick={() => handleCopy(data?.code || "")}
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
              <h1>{data?.brand}</h1>
            </div>

            <div className="flex items-center justify-between w-140 p-2 border-b border-gray-100">
              <span>{t("xa.xaxa2")}</span>
              <h1>{data?.color}</h1>
            </div>

            <div className="flex items-center justify-between w-140 p-2 border-b border-gray-100">
              <span>{t("xa.xaxa3")}</span>
              <h1>{data?.price}</h1>
            </div>

            <div className="flex items-center justify-between w-140 p-2 border-b border-gray-100">
              <span>{t("xa.xaxa4")}</span>
              <h1>{data?.hasDiscount ? "New" : "-20%"}</h1>
            </div>

            <div className="flex items-center justify-between w-140 p-2 border-b border-gray-100">
              <span>{t("xa.xaxa5")}</span>
              <h1>{data?.discountPrice}</h1>
            </div>

            <div className="flex items-center justify-between w-140 p-2">
              <span>{t("xa.xaxa6")}</span>
              <h1 className="font-normal">{data?.description}</h1>
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
      <br />
    </>
  );
};

export default InfoPage;
