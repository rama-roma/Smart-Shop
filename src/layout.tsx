import { Facebook, Heart, Instagram, Search, Send, ShoppingBasket, User, WalletCards } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "./store/theme/ThemeContext";
import logo from "./images/logoAlif.png";
import ButtonTheme from "./components/buttonTheme";
import LanguageSelector from "./components/languageSelector";
import { Outlet } from "react-router";
import qr from './images/qr.png'

const Layout = () => {
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };


  return (
    <>
      <header className="max-w-[1500px] m-auto p-4">
        <nav className="flex items-center justify-between">
          <img className="w-40" src={logo} />
          <div className="flex gap-[10px] bg-[#ffd36a] rounded-[10px] text-black p-3 w-35 justify-center items-center">
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
            <ShoppingBasket />
            <h1 className="text-[13px]">{t("navbar.title2")}</h1>
          </div>
          <div className="flex flex-col items-center gap-[5px]">
            <Heart />
            <h1 className="text-[13px]">{t("navbar.title3")}</h1>
          </div>
          <div className="flex flex-col items-center gap-[5px]">
            <User />
            <h1 className="text-[13px]">{t("navbar.title4")}</h1>
          </div>
          
          <LanguageSelector/>

          <ButtonTheme />
        </nav>
      </header>

      <main className="max-w-[1500px] m-auto p-4">
        <Outlet/>
      </main>

      <footer className="max-w-[1600px] m-auto bg-[#2b2a2a] rounded-tl-[20px] rounded-tr-[20px]">
        <div className="max-w-[1500px] m-auto p-4 text-[white]">
          <section className="flex items-start justify-between p-7">
            <div className="flex flex-col items-start gap-[10px]">
              <img className="w-40" src={logo} alt="" />
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
            <div>
              <article className="p-4 border-[2px] rounded-[10px] border-[#bdbcbc] w-60 h-80 flex flex-col items-center justify-center gap-[20px]">
                <img className="w-40" src={qr} alt="" />
                <h1 className="text-[13px] text-center text-[#727272]">{t("navbar.title14")}</h1>
              </article>
            </div>
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
    </>
  );
};

export default Layout;
