import { useTranslation } from "react-i18next";
import { useTheme } from "../store/theme/ThemeContext";
import { useGetCategoriesQuery } from "../store/api/categoryApi/category";
import { useNavigate } from "react-router-dom";

const CatalogPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };
  const { data  = [] } = useGetCategoriesQuery();

  const navigate = useNavigate();

  return (
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
  );
};

export default CatalogPage;
