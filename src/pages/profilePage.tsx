import { useTranslation } from "react-i18next";
import user from ".././images/user.jpg";
import { Heart, ShoppingBag, Smartphone, ThumbsUp } from "lucide-react";
import { useTheme } from "../store/theme/ThemeContext";

const ProfilePage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/homePage";
  };

  return (
    <>
      <main>
        <section className="mt-10 flex items-start justify-start gap-[80px]">
          <div className="flex flex-col items-center justify-center gap-[30px]">
            <article className="flex flex-col gap-2">
              <div
                className={`
                  flex items-center p-4 justify-start rounded-[10px] w-90 h-20 gap-[10px]
                  ${
                    theme === "dark"
                      ? "bg-[#2b2b2b] text-white shadow-md"
                      : "bg-[#d9d9d9a7] text-black shadow-sm"
                  }
                  transition-all duration-300
                `}
              >
                <img className="w-15 h-15 rounded-full" src={user} alt="User" />
                <h1 className="font-medium">{t("profile.pro")}</h1>
              </div>

              <div
                className={`
                  flex items-center p-4 gap-4 rounded-[10px] w-90 h-20
                  ${
                    theme === "dark"
                      ? "bg-[#2b2b2b] text-white shadow-md"
                      : "bg-[#f5f5f5] text-black shadow-sm"
                  }
                  transition-all duration-300
                `}
              >
                <ShoppingBag size={24} />
                <h1 className="font-medium">{t("profile.pro2")}</h1>
              </div>

              <div
                className={`
                  flex items-center p-4 gap-4 rounded-[10px] w-90 h-20
                  ${
                    theme === "dark"
                      ? "bg-[#2b2b2b] text-white shadow-md"
                      : "bg-[#f5f5f5] text-black shadow-sm"
                  }
                  transition-all duration-300
                `}
              >
                <ThumbsUp size={24} />
                <h1 className="font-medium">{t("profile.pro3")}</h1>
              </div>
              <div
                className={`
                  flex items-center p-4 gap-4 rounded-[10px] w-90 h-20
                  ${
                    theme === "dark"
                      ? "bg-[#2b2b2b] text-white shadow-md"
                      : "bg-[#f5f5f5] text-black shadow-sm"
                  }
                  transition-all duration-300
                `}
              >
                <Heart size={24} />
                <h1 className="font-medium">{t("profile.pro4")}</h1>
              </div>
              <div
                onClick={handleLogout}
                className={`
                  flex items-center p-4 gap-4 rounded-[10px] w-90 h-20
                  ${
                    theme === "dark"
                      ? "bg-[#2b2b2b] text-white shadow-md"
                      : "bg-[#f5f5f5] text-black shadow-sm"
                  }
                  transition-all duration-300
                `}
              >
                <Smartphone color="red" size={24} />
                <h1 className="font-medium text-[red]">{t("profile.pro1")}</h1>
              </div>
            </article>
          </div>
          <div className="flex flex-col items-start gap-[20px]">
            <div>
              <img className="w-60 rounded-[100%]" src={user} alt="" />
            </div>
            <section className="flex items-center justify-center gap-[30px]">
              <div
                className={`
                  flex flex-col items-start justify-center p-2 gap-2 rounded-[10px] w-100 h-20
                  ${
                    theme === "dark"
                      ? "bg-[#2b2b2b] text-white shadow-md"
                      : "bg-[#f5f5f5] text-black shadow-sm"
                  }
                  transition-all duration-300
                `}
              >
                <span className="text-[grey]">{t("profile.pro5")}</span>
                <h1></h1>
              </div>
              <div
                className={`
                  flex flex-col items-start justify-center p-2 gap-2 rounded-[10px] w-100 h-20
                  ${
                    theme === "dark"
                      ? "bg-[#2b2b2b] text-white shadow-md"
                      : "bg-[#f5f5f5] text-black shadow-sm"
                  }
                  transition-all duration-300
                `}
              >
                <span className="text-[grey]">{t("profile.pro6")}</span>
                <h1></h1>
              </div>
            </section>
            <section className="flex items-center justify-center gap-[30px]">
              <div
                className={`
                  flex flex-col items-start justify-center p-2 gap-2 rounded-[10px] w-100 h-20
                  ${
                    theme === "dark"
                      ? "bg-[#2b2b2b] text-white shadow-md"
                      : "bg-[#f5f5f5] text-black shadow-sm"
                  }
                  transition-all duration-300
                `}
              >
                <span className="text-[grey]">{t("profile.pro8")}</span>
                <h1></h1>
              </div>
              <br />
              <br />
            </section>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
