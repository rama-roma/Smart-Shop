import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../store/api/authApi/auth";
import { useTheme } from "../contextApi/theme/ThemeContext";

const RegisterPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme() as { theme: "light" | "dark" };

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
      await register({ userName, phoneNumber, email, password, confirmPassword }).unwrap();
      localStorage.setItem("user", JSON.stringify({ userName, phoneNumber, email, password, confirmPassword }));
      navigate("/loginPage");
    } catch (error) {
      console.error(error);
    }
  }

  const bgCard = theme === "dark" ? "bg-[#1c1c1c] border-[#555]" : "bg-white border-[#adacac]";
  const inputBg = theme === "dark" ? "bg-[#2a2a2a] text-white placeholder-gray-400" : "bg-white text-black placeholder-gray-500";
  const textColor = theme === "dark" ? "text-white" : "text-black";

  const inputs = [
    { value: userName, setter: setUserName, placeholder: t("register.reg2"), type: "text" },
    { value: phoneNumber, setter: setPhoneNumber, placeholder: t("register.reg3"), type: "text" },
    { value: email, setter: setEmail, placeholder: t("register.reg4"), type: "text" },
    { value: password, setter: setPassword, placeholder: t("register.reg5"), type: "password" },
    { value: confirmPassword, setter: setConfirmPassword, placeholder: t("register.reg6"), type: "password" },
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500`}>
      <div
        className={`backdrop-blur-md ${bgCard} p-6 md:p-10 rounded-3xl shadow-2xl border w-full max-w-md md:max-w-lg transition-all duration-500 transform hover:scale-[1.02] animate-fadeIn`}
      >
        <h1 className={`text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8 ${textColor}`}>
          {t("register.reg")}
        </h1>
        <form
          onSubmit={(e) => { e.preventDefault(); handleRegister(); }}
          className="flex flex-col gap-4 md:gap-5"
        >
          {inputs.map((inp, idx) => (
            <input
              key={idx}
              type={inp.type}
              value={inp.value}
              onChange={(e) => inp.setter(e.target.value)}
              placeholder={inp.placeholder}
              className={`p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 ${inputBg} border-gray-300`}
            />
          ))}

          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 transform w-full mt-2"
          >
            {t("register.reg")}
          </button>
        </form>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease forwards;
          }
        `}
      </style>
    </div>
  );
};

export default RegisterPage;
