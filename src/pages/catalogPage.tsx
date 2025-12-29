import { useTranslation } from "react-i18next";
import { useTheme } from "../contextApi/theme/ThemeContext";
import { useGetCategoriesQuery } from "../store/api/categoryApi/category";
import { useNavigate } from "react-router-dom";

const CatalogPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };
  const { data = [] } = useGetCategoriesQuery();

  const navigate = useNavigate();

  return (
    <>
      <div className="hidden md:block">
        <main>
          <div
            className={`
                  flex items-center p-4 justify-start rounded-[10px] w-90 h-20 gap-[10px]
                  ${
                    theme === "dark"
                      ? "bg-[#2b2b2b] text-white shadow-md"
                      : "bg-[#d9d9d970] text-black shadow-sm"
                  }
                  transition-all duration-300
                `}
          >
            <h1 className="text-[30px] font-bold">{t("productPage.prod")}</h1>
          </div>
          <section
            className={`flex flex-wrap items-center justify-center gap-[20px] rounded-2xl h-260 p-4 mt-5 mb-10
        ${
          theme === "dark"
            ? "bg-[#2b2b2b] text-white"
            : "bg-[#d9d9d970] text-black"
        }
        `}
          >
            <div className="flex flex-wrap items-center justify-center gap-[30px]">
              {data.map((category) => (
                <div
                  key={category.id}
                  onClick={() => navigate(`/catalogById/${category.id}`)}
                  className={`cursor-alias w-80 h-40 hover:shadow-2xl flex flex-col items-center justify-center gap-[10px] rounded-2xl
                  ${
                    theme === "dark"
                      ? "bg-[#3b3b3b] hover:bg-[#ffd36a] hover:text-black hover:shadow-2xl border border-gray-900 hover:border-[#ffd36a]"
                      : "bg-[#ffffff70] hover:bg-[#ffd36a] hover:shadow-2xl border border-gray-300 hover:border-[#ffd36a]"
                  }
                    transition-all duration-300
                `}
                >
                  <img
                    className="w-20 h-20 object-cover rounded-[5px]"
                    src={`https://store-api.softclub.tj/images/${category.categoryImage}`}
                    alt=""
                  />
                  <h1 className="w-60 text-center">{category.categoryName}</h1>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>


      <div className="block md:hidden p-4">
        <h1
          className={`text-2xl font-bold mb-4 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {t("productPage.prod")}
        </h1>

        <div className="flex flex-col gap-[20px]">
          {data.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/catalogById/${category.id}`)}
              className={`flex flex-col p-4 rounded-xl shadow-md gap-2 cursor-pointer
          ${
            theme === "dark"
              ? "bg-[#2b2b2b] text-white hover:bg-[#ffd36a] hover:text-black"
              : "bg-white text-black hover:bg-[#ffd36a]"
          }
          transition-all duration-300
        `}
            >
              <div className="w-full h-40 flex items-center justify-center">
                <img
                  src={`https://store-api.softclub.tj/images/${category.categoryImage}`}
                  alt={category.categoryName}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>
              <h2 className="text-center font-semibold text-lg">
                {category.categoryName}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CatalogPage;
