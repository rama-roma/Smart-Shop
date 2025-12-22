import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../store/api/authApi/auth";

const RegisterPage = () => {
  const { t } = useTranslation();
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  async function handleRegister() {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await register({
        userName,
        phoneNumber,
        email,
        password,
        confirmPassword,
      }).unwrap();
      localStorage.setItem(
        "user",
        JSON.stringify({ userName, phoneNumber, email, password, confirmPassword })
      );
      navigate("/loginPage");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <main>
        <section className="flex items-center justify-center flex-col h-150">
          <div className="backdrop-blur-md p-10 rounded-3xl shadow-xl w-130 ">
            <h1 className="text-3xl font-bold text-center  mb-8">
              {t("register.reg")}
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegister();
              }}
              className="flex flex-col gap-5"
            >
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t("register.reg2")}
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder={t("register.reg3")}
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("register.reg4")}
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t("register.reg5")}
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("register.reg6")}
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300"
              />
              <button
                type="submit"
                className="p-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                {t("register.reg")}
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default RegisterPage;
