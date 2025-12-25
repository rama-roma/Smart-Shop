import {
  Facebook,
  Heart,
  Home,
  Instagram,
  LogIn,
  Search,
  Send,
  ShoppingBasket,
  User,
  WalletCards,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./contextApi/theme/ThemeContext";
// @ts-ignore
import logo from "./assets/beelogo.png";
// @ts-ignore
import logoo from "./assets/image.png";
import ButtonTheme from "./components/buttonTheme";
import LanguageSelector from "./components/languageSelector";
import { Link, Outlet, useNavigate } from "react-router";
// @ts-ignore
import qr from "./assets/qr.png";
import { useState } from "react";
import { Modal } from "antd";
import {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
} from "./store/api/categoryApi/category";
import { useGetCartQuery } from "./store/api/cartApi/cart";
import { useAuth } from "./contextApi/auth/authContext";
import { useAppDispatch } from "./store/store";

const Layout = () => {
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleGoToCatalog = () => {
    setOpenCatalog(false);
    setActiveCategoryId(null);
    navigate("/catalogPage");
  };

  const [openCatalog, setOpenCatalog] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const { isLoggedIn, logout } = useAuth();
  const { data } = useGetCategoriesQuery();

  const { data: activeCategory } = useGetCategoryByIdQuery(activeCategoryId!, {
    skip: activeCategoryId === null,
  });
  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !isLoggedIn,
  });

  console.log("cartData", cartData);

  const [openCatalogMobile, setOpenCatalogMobile] = useState(false);

  let cartCount =
    cartData?.data?.[0].productsInCart.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    ) ?? 0;
  if(!localStorage.getItem("token")) cartCount = 0
  return (
    <>
      <div className="hidden md:block">
        <header className="max-w-[1500px] m-auto p-3">
          <nav className="flex items-center justify-between">
            <Link to="/homePage">
              <img
                src={theme === "dark" ? logoo : logo}
                className={`transition-all
    ${theme === "dark" ? "w-43 opacity-90" : "w-48 drop-shadow-md"}
  `}
                alt="Logo"
              />
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
              <Link to="/cartPage">
                <div className="relative inline-block">
                  <ShoppingBasket size={24} />

                  {cartCount > 0 && (
                    <span
                      className="
    absolute -top-2 -right-2
    min-w-[18px] h-[18px]
    flex items-center justify-center
    bg-red-500 text-white text-[11px]
    rounded-full font-bold
  "
                    >
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </div>
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
                <img className="w-60" src={logoo} />
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
      </div>

      <div className="block md:hidden">
        <div className="flex justify-center">
          <Link to="/homePage">
            <img className="w-38" src={logo} alt="Logo" />
          </Link>
        </div>
        <header className="flex items-center justify-between mb-4">
          <div className=" max-w-[500px] m-auto flex  items-center gap-[10px]">
            <LanguageSelector />
            <ButtonTheme />

            <Link to="/cartPage">
              <div className="relative">
                <ShoppingBasket size={24} />

                {cartCount > 0 && (
                  <span
                    className="
          absolute -top-2 -right-2
          min-w-[18px] h-[18px]
          flex items-center justify-center
          bg-red-500 text-white text-[11px]
          rounded-full font-bold
        "
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </div>
            </Link>

            <div
              onClick={() => setOpenCatalogMobile(true)}
              className="bg-[#ffd36a] rounded-lg p-2 cursor-pointer"
            >
              <WalletCards size={20} />
            </div>

            <div className="flex flex-col items-center gap-[5px]">
              <Link to="/wishlistPage">
                <Heart />
              </Link>
            </div>
          </div>
        </header>

        <main>
          <Outlet />
        </main>

        <footer className="max-w-[800px] m-auto bg-[#2b2a2a] rounded-tl-[20px] rounded-tr-[20px]">
          <div className="max-w-[500px] m-auto p-4 text-[white]">
            <section className="flex flex-col items-center justify-between p-4">
              <div className="flex flex-col items-center text-center gap-[10px]">
                <img className="w-60" src={logoo} />
                <h1>{t("navbar.title5")}</h1>
              </div>

              <div className="flex flex-col items-center text-center gap-[10px]">
                <h1 className="text-[#727272]">{t("navbar.title6")}</h1>
                <h1>{t("navbar.title7")}</h1>
                <h1>{t("navbar.title8")}</h1>
                <h1>{t("navbar.title9")}</h1>
              </div>

              <div className="flex flex-col items-center text-center gap-[10px]">
                <h1 className="text-[#727272]">{t("navbar.title10")}</h1>
                <h1>{t("navbar.title11")}</h1>
                <h1>{t("navbar.title12")}</h1>
                <h1>{t("navbar.title13")}</h1>
              </div>
              <br />

              <article className="p-4 border-[2px] rounded-[10px] border-[#bdbcbc] w-60 h-80 flex flex-col items-center justify-center gap-[20px]">
                <img className="w-40" src={qr} />
                <h1 className="text-[13px] text-center text-[#727272]">
                  {t("navbar.title14")}
                </h1>
              </article>
            </section>
          </div>

          <div className="flex justify-center text-center items-center p-10">
            <h1 className="text-[white] text-[12px]">{t("navbar.title15")}</h1>
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
      </div>
    </>
  );
};

export default Layout;
