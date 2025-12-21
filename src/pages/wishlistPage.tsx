import { useEffect, useState } from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Product {
  id: number;
  productName: string;
  price: number;
  discountPrice?: number;
  hasDiscount?: boolean;
  image?: string;
  color?: string;
}

const WishlistPage = () => {
  const { t } = useTranslation();
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const data: Product[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(data);
  }, []);

  const handleRemoveFromFavorites = (productId: number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== productId);

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <main className="max-w-[1500px] m-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Heart className="text-red-500 fill-red-500" />
          {t("main.lol5")}
        </h1>
        <button
          onClick={handleClearFavorites}
          className="mt-[-10px] p-2 border rounded-[5px] bg-[#ffd36a] border-[#ffd36a]  text-[black]"
        >
          Delete All
        </button>
      </div>
      <br />

      {favorites.length === 0 ? (
        <p className="text-gray-500">{t("main.lol4")}</p>
      ) : (
        <section className="flex flex-wrap gap-6">
          {favorites.map((e) => (
            <div
              key={e.id}
              className="w-56  rounded-xl shadow-2xl hover:shadow-lg transition p-4 flex flex-col gap-3 relative"
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                onClick={() => handleRemoveFromFavorites(e.id)}
              >
                <Trash2 size={20} />
              </button>
              <div className="mt-[-10px]">
                <h1
                  className={`text-white text-xs w-14 text-center font-bold px-2 py-1 rounded-md ${
                    e.hasDiscount ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {e.hasDiscount ? "New" : "-20%"}
                </h1>
              </div>

              <div className="w-full h-40 flex items-center justify-center">
                <img
                  className="max-w-full max-h-full object-contain"
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                  alt={e.productName}
                />
              </div>

              <div>
                <h2 className="font-semibold">{e.productName}</h2>
                <p className="text-sm text-gray-500">{e.color}</p>

                {e.hasDiscount ? (
                  <div className="flex gap-2 items-center">
                    <span className="text-yellow-500 font-bold">
                      ${e.discountPrice}
                    </span>
                    <span className="line-through text-gray-400">
                      ${e.price}
                    </span>
                  </div>
                ) : (
                  <span className="font-bold">${e.price}</span>
                )}
              </div>
              <button className="mt-auto w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg">
                <ShoppingCart size={18} />
                {t("main.lol6")}
              </button>
            </div>
          ))}
        </section>
      )}
    </main>
  );
};

export default WishlistPage;
