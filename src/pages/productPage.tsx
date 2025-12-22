import { useTranslation } from "react-i18next";
import { useTheme } from "../store/theme/ThemeContext";
import { useGetCategoriesQuery } from "../store/api/categoryApi/category";

const ProductPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };
    const { data } = useGetCategoriesQuery();
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
      <section className={`flex flex-wrap items-center justify-center gap-[20px] rounded-2xl h-260 p-4 mt-5 mb-10
        ${
          theme === "dark"
          ? "bg-[#2b2b2b] text-white"
          : "bg-[#d9d9d970] text-black"
        }
        `}>
          <div className="flex flex-wrap items-center justify-center gap-[30px]">
            {
              data?.data.map((category) => (
                <div key={category.id} className={`w-80 h-40  flex flex-col items-center justify-center gap-[10px] rounded-2xl
                  ${theme === "dark" ? "bg-[#3b3b3b] hover:bg-[#4b4b4b]" : "bg-[#ffffff70] hover:bg-[#ffffff90]"}
                  transition-all duration-300
                `}>
                  <img className="w-20 h-20 rounded-[5px]" src={`https://store-api.softclub.tj/images/${category.categoryImage}`} alt="" />
                  <h1 className="w-60 text-center">{category.categoryName}</h1>
                </div>
              ))
            }
          </div>
        </section>
    </main>
  );
};

export default ProductPage;
