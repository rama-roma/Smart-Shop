import {
  Facebook,
  Heart,
  Instagram,
  LogIn,
  Search,
  Send,
  ShoppingBasket,
  User,
  WalletCards,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./store/theme/ThemeContext";
// @ts-ignore
import logo from './assets/logoAlif.png'
import ButtonTheme from "./components/buttonTheme";
import LanguageSelector from "./components/languageSelector";
import { Link, Outlet, useNavigate } from "react-router";
// @ts-ignore
import qr from './assets/qr.png';
import { useEffect, useState } from "react";
import { Modal } from "antd";
import {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
} from "./store/api/categoryApi/category";
import { useGetCartQuery } from "./store/api/cartApi/cart";

const Layout = () => {
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };
  const navigate = useNavigate();

  const handleGoToCatalog = () => {
    setOpenCatalog(false);
    setActiveCategoryId(null);
    navigate("/catalogPage");
  };

  const [openCatalog, setOpenCatalog] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  const { data } = useGetCategoriesQuery();

  const { data: activeCategory } = useGetCategoryByIdQuery(activeCategoryId!, {
    skip: activeCategoryId === null,
  });

  const { data: cartData } = useGetCartQuery();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token ? true : false);
  }, []);

  return (
    <>
      <header className="max-w-[1500px] m-auto p-4">
        <nav className="flex items-center justify-between">
          <Link to="/homePage">
            <img className="w-40" src={logo} />
          </Link>

          <div
            onClick={() => setOpenCatalog(true)}
            className="flex gap-[10px] bg-[#ffd36a] rounded-[10px] text-black p-3 w-35 justify-center items-center cursor-pointer"
          >
            <WalletCards />
            <h1 className="font-bold">{t("navbar.title")}</h1>
          </div>

          <div className="relative w-170">
            <input
              type="search"
              placeholder={t("navbar.title1")}
              className={`w-full rounded-[10px] border-[3px] p-2 pl-9 
                ${
                  theme === "dark"
                    ? "border-[#555] placeholder-[#aaa] text-white bg-[#2b2b2b]"
                    : "border-[#ffd36a] placeholder-black text-black bg-white"
                }
                focus:outline-none`}
            />
            <span
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 
                ${theme === "dark" ? "text-[#aaa]" : "text-black"}`}
            >
              <Search size={16} />
            </span>
          </div>

          <div className="flex flex-col items-center gap-[5px]">
            <Link to="/cartPage" className="relative">
              <ShoppingBasket />
              {cartData?.totalProducts > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartData.totalProducts}
                </span>
              )}
            </Link>
            <h1 className="text-[13px]">{t("navbar.title2")}</h1>
          </div>

          <div className="flex flex-col items-center gap-[5px]">
            <Link to="/wishlistPage">
              <Heart />
            </Link>
            <h1 className="text-[13px]">{t("navbar.title3")}</h1>
          </div>

          <div className="flex flex-col items-center gap-[5px]">
            {isLoggedIn ? (
              <>
                <Link to="/profilePage">
                  <User />
                </Link>
                <h1 className="text-[13px]">{t("navbar.title4")}</h1>
              </>
            ) : (
              <>
                <Link to="/loginPage">
                  <LogIn />
                </Link>
                <h1 className="text-[13px]">{t("navbar.title16")}</h1>
              </>
            )}
          </div>

          <LanguageSelector />
          <ButtonTheme />
        </nav>
      </header>

      <main className="max-w-[1500px] m-auto p-4">
        <Outlet />
      </main>

      <footer className="max-w-[1600px] m-auto bg-[#2b2a2a] rounded-tl-[20px] rounded-tr-[20px]">
        <div className="max-w-[1500px] m-auto p-4 text-[white]">
          <section className="flex items-start justify-between p-7">
            <div className="flex flex-col items-start gap-[10px]">
              <img className="w-40" src={logo} />
              <h1>{t("navbar.title5")}</h1>
            </div>

            <div className="flex flex-col items-start gap-[10px]">
              <h1 className="text-[#727272]">{t("navbar.title6")}</h1>
              <h1>{t("navbar.title7")}</h1>
              <h1>{t("navbar.title8")}</h1>
              <h1>{t("navbar.title9")}</h1>
            </div>

            <div className="flex flex-col items-start gap-[10px]">
              <h1 className="text-[#727272]">{t("navbar.title10")}</h1>
              <h1>{t("navbar.title11")}</h1>
              <h1>{t("navbar.title12")}</h1>
              <h1>{t("navbar.title13")}</h1>
            </div>

            <article className="p-4 border-[2px] rounded-[10px] border-[#bdbcbc] w-60 h-80 flex flex-col items-center justify-center gap-[20px]">
              <img className="w-40" src={qr} />
              <h1 className="text-[13px] text-center text-[#727272]">
                {t("navbar.title14")}
              </h1>
            </article>
          </section>
        </div>

        <div className="flex justify-between items-center p-10">
          <h1 className="text-[white]">{t("navbar.title15")}</h1>
          <div className="flex items-center gap-[10px] text-[white]">
            <Instagram size={30} />
            <Facebook size={30} />
            <Send size={30} />
          </div>
        </div>
      </footer>

      <Modal
        title={t("main.lol7")}
        open={openCatalog}
        footer={null}
        width={1200}
        onCancel={() => {
          setOpenCatalog(false);
          setActiveCategoryId(null);
        }}
      >
        <button
          className="text-[blue] cursor-alias"
          onClick={handleGoToCatalog}
        >
          {t("catalogPage.cat")}
        </button>
        <section className="max-h-[500px] flex justify-between">
          <div className="overflow-auto w-1/2">
            {data?.map((category) => (
              <div
                key={category.id}
                onClick={() => setActiveCategoryId(category.id)}
                className={`p-2 border-b border-gray-300 cursor-pointer
                  ${
                    activeCategoryId === category.id
                      ? "bg-gray-200 font-semibold"
                      : "hover:bg-gray-100"
                  }`}
              >
                <div className="flex  items-center justify-between">
                  <h2>{category.categoryName}</h2>
                  <img
                    className="w-20 h-10 rounded-2xl"
                    src={`https://store-api.softclub.tj/images/${category.categoryImage}`}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="overflow-auto w-1/2">
            {!activeCategory ? (
              <p className="p-4 text-gray-400">Выберите категорию</p>
            ) : activeCategory.subCategories.length === 0 ? (
              <p className="p-4 text-gray-400">Нет подкатегорий</p>
            ) : (
              activeCategory.subCategories.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => {
                    navigate(`/catalogById/${activeCategory.id}`);
                    setOpenCatalog(false);
                    setActiveCategoryId(null);
                  }}
                  className="p-2 border-b border-gray-300"
                >
                  <h2>{sub.subCategoryName}</h2>
                </div>
              ))
            )}
          </div>
        </section>
      </Modal>
    </>
  );
};

export default Layout;
