import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../store/api/authApi/auth";
import { useState } from "react";
import { useAuth } from "../contextApi/auth/authContext";
import { useTheme } from "../contextApi/theme/ThemeContext";

const LoginPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };

  const { login } = useAuth();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginMutation] = useLoginMutation();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await loginMutation({ userName, password }).unwrap();
      login(result.data);
      navigate("/homePage");
    } catch (error) {
      console.error("Login error", error);
    }
  }

  return (
    <main>
      <section className="flex items-center justify-center flex-col h-140">
        <div
          className={`backdrop-blur-md p-10 rounded-3xl shadow-2xl border w-full max-w-sm 
                     animate-fadeIn transform transition-transform duration-500 hover:scale-105
                    ${
                        theme === "dark"
                          ? "text-white placeholder-gray-500 border-[#1a1919] bg-[#262626]"
                          : "text-black placeholder-gray-400 border-gray-300 bg-white"
                      }
                    `}
        >
          <h1
            className={`text-3xl font-bold text-center mb-8 animate-slideDown
                     ${theme === "dark" ? "text-white" : "text-black"}`}
          >
            {t("navbar.title16")}
          </h1>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={t("login.log")}
              className={`p-3 rounded-xl border transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-orange-400
                      focus:shadow-md
                      ${
                        theme === "dark"
                          ? "text-white placeholder-gray-500 border-[2px]  border-[#6e6c6c] bg-[#444343]"
                          : "text-black placeholder-gray-400 border-gray-300 bg-white"
                      }`}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("login.log1")}
              className={`p-3 rounded-xl border transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-orange-400
                      focus:shadow-md
                      ${
                        theme === "dark"
                          ? "text-white placeholder-gray-500 border-[2px]  border-[#6e6c6c] bg-[#444343]"
                          : "text-black placeholder-gray-400 border-gray-300 bg-white"
                      }`}
            />
            <button
              type="submit"
              className="p-3 font-semibold rounded-xl shadow-lg
                     bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500
                     text-white hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              {t("login.log2")}
            </button>
          </form>

          <p
            className={`mt-6 text-center text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-500"
            }`}
          >
            {t("login.log4")}{" "}
            <Link
              to="/registerPage"
              className="text-orange-500 font-medium hover:underline hover:text-orange-600 transition-colors duration-300"
            >
              {t("register.reg")}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
