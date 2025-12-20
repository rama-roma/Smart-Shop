import { useTranslation } from "react-i18next";
import Swipper from "../components/swipper";
import img1 from "../images/banner1.jpg";
import img2 from "../images/banner2.png";
import img3 from "../images/banner3.png";
import { useGetProductsQuery } from "../store/api/productApi/product";
import { Eye, Heart, ShoppingCart } from "lucide-react";

const HomePage = () => {
  const { t } = useTranslation();
  const { data } = useGetProductsQuery();
  return (
    <>
      <main>
        <Swipper img={img1} />
        <br />

        <section className="mt-10 mb-10 flex flex-col  justify-center gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <h1 className="text-[30px] font-bold">{t("main.lol")}</h1>
            <div className="bg-[#c7c6c6] p-2 text-[black] w-20 text-center rounded-[10px]">
              <h1>{t("main.lol1")}</h1>
            </div>
          </div>

          <section className="flex flex-wrap gap-6">
            {data?.data?.products?.map((e) => (
              <div
                key={e.id}
                className="w-55 h-100 rounded-xl  shadow-2xl hover:shadow-lg transition-shadow duration-600 relative flex flex-col p-4 gap-3"
              >
                <div className="">
                  <div>
                    <h1
                      className={`text-white text-xs w-14 text-center font-bold px-2 py-1 rounded-md ${
                        e.hasDiscount ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {e.hasDiscount ? "New" : "-20%"}
                    </h1>
                  </div>
                  <button className="absolute top-2 right-2">
                    <Heart size={24} />
                  </button>
                  <button className="absolute top-10 right-2">
                    <Eye />
                  </button>
                  <br />
                </div>

                <div className="w-full h-40 flex items-center justify-center overflow-hidden">
                  <img
                    className="max-w-full max-h-full object-contain"
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                    alt={e.productName}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold text-lg">{e.productName}</h2>
                  <p className="text-sm text-gray-500">{e.color}</p>
                  <div className="flex items-center gap-2">
                    {e.hasDiscount ? (
                      <>
                        <p className="font-bold text-yellow-500">
                          ${e.discountPrice}
                        </p>
                        <p className="line-through text-gray-400">${e.price}</p>
                      </>
                    ) : (
                      <p className="font-bold">${e.price}</p>
                    )}
                  </div>
                </div>

                <button className="mt-auto flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition-colors">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            ))}
          </section>
        </section>
        <br />

        <Swipper img={img2} />
        <br />
        <section className="mt-10 mb-10 flex flex-col  justify-center gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <h1 className="text-[30px] font-bold">{t("main.lol2")}</h1>
            <div className="bg-[#c7c6c6] p-2 text-[black] w-20 text-center rounded-[10px]">
              <h1>{t("main.lol1")}</h1>
            </div>
          </div>

          <section className="flex flex-wrap gap-6">
            {data?.data?.products?.map((e) => (
              <div
                key={e.id}
                className="w-55 h-100 rounded-xl  shadow-2xl hover:shadow-lg transition-shadow duration-600 relative flex flex-col p-4 gap-3"
              >
                <div className="">
                  <div>
                    <h1
                      className={`text-white text-xs w-14 text-center font-bold px-2 py-1 rounded-md ${
                        e.hasDiscount ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {e.hasDiscount ? "New" : "-20%"}
                    </h1>
                  </div>
                  <button className="absolute top-2 right-2">
                    <Heart size={24} />
                  </button>
                  <button className="absolute top-10 right-2">
                    <Eye />
                  </button>
                  <br />
                </div>

                <div className="w-full h-40 flex items-center justify-center overflow-hidden">
                  <img
                    className="max-w-full max-h-full object-contain"
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                    alt={e.productName}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold text-lg">{e.productName}</h2>
                  <p className="text-sm text-gray-500">{e.color}</p>
                  <div className="flex items-center gap-2">
                    {e.hasDiscount ? (
                      <>
                        <p className="font-bold text-yellow-500">
                          ${e.discountPrice}
                        </p>
                        <p className="line-through text-gray-400">${e.price}</p>
                      </>
                    ) : (
                      <p className="font-bold">${e.price}</p>
                    )}
                  </div>
                </div>

                <button className="mt-auto flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition-colors">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            ))}
          </section>
        </section>

        <Swipper img={img3} />
        <br />
        <section className="mt-10 mb-10 flex flex-col  justify-center gap-[10px]">
          <div className="flex items-center gap-[10px]">
            <h1 className="text-[30px] font-bold">{t("main.lol3")}</h1>
            <div className="bg-[#c7c6c6] p-2 text-[black] w-20 text-center rounded-[10px]">
              <h1>{t("main.lol1")}</h1>
            </div>
          </div>

          <section className="flex flex-wrap gap-6">
            {data?.data?.products?.map((e) => (
              <div
                key={e.id}
                className="w-55 h-100 rounded-xl  shadow-2xl hover:shadow-lg transition-shadow duration-600 relative flex flex-col p-4 gap-3"
              >
                <div className="">
                  <div>
                    <h1
                      className={`text-white text-xs w-14 text-center font-bold px-2 py-1 rounded-md ${
                        e.hasDiscount ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {e.hasDiscount ? "New" : "-20%"}
                    </h1>
                  </div>
                  <button className="absolute top-2 right-2">
                    <Heart size={24} />
                  </button>
                  <button className="absolute top-10 right-2">
                    <Eye />
                  </button>
                  <br />
                </div>

                <div className="w-full h-40 flex items-center justify-center overflow-hidden">
                  <img
                    className="max-w-full max-h-full object-contain"
                    src={`https://store-api.softclub.tj/images/${e.image}`}
                    alt={e.productName}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold text-lg">{e.productName}</h2>
                  <p className="text-sm text-gray-500">{e.color}</p>
                  <div className="flex items-center gap-2">
                    {e.hasDiscount ? (
                      <>
                        <p className="font-bold text-yellow-500">
                          ${e.discountPrice}
                        </p>
                        <p className="line-through text-gray-400">${e.price}</p>
                      </>
                    ) : (
                      <p className="font-bold">${e.price}</p>
                    )}
                  </div>
                </div>

                <button className="mt-auto flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition-colors">
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
              </div>
            ))}
          </section>
        </section>
      </main>
    </>
  );
};

export default HomePage;
