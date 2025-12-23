import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { useLoginMutation } from "../store/api/authApi/auth";
import { useState } from "react";

const LoginPage = () => {
  const { t } = useTranslation();


  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const result = await login({ userName, password }).unwrap();
      localStorage.setItem("token", result.data);
      window.location.href = "/homePage";
    } catch (error) {
      console.error("Login error", error);
    }
  }

  return (
    <>
      <main>
        <section className="flex  items-center justify-center flex-col h-140">
          <div className="backdrop-blur-md p-10 rounded-3xl shadow-xl w-full max-w-sm ">
            <h1 className="text-3xl font-bold text-center  mb-8">
              {t("navbar.title16")}
            </h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t("login.log")}
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("login.log1")}
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              />
              <button
                type="submit"
                className="p-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                {t("login.log2")}
              </button>
            </form>
            <p className="mt-6 text-center  text-sm">
              {t("login.log4")}{" "}
              <Link
                to="/registerPage"
                className="text-orange-500 font-medium hover:underline"
              >
                {t("register.reg")}
              </Link>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
