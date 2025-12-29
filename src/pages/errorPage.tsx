import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
// @ts-ignore
import img from '../assets/edited_image.png'

const ErrorPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main className="flex flex-col items-center justify-center h-140 p-4">
      <img className='w-70 h-60' src={img} alt="" />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">{t("set.t4")}</p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition"
      >
        {t("set.t3")}
      </button>
    </main>
  );
};

export default ErrorPage;
