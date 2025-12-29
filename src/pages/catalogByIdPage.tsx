import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetCategoryByIdQuery } from "../store/api/categoryApi/category";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contextApi/theme/ThemeContext";
import { useEffect, useState } from "react";
import { useGetProductByIdSubCategoryQuery, Product } from "../store/api/productApi/product";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import { useAddToCartMutation } from "../store/api/cartApi/cart";
import img from '../assets/box.png';

const CatalogByIdPage = () => {
  const { id } = useParams();
  const { data } = useGetCategoryByIdQuery(Number(id));
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme() as { theme: "light" | "dark" };

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<number | null>(null);
  const [localProducts, setLocalProducts] = useState<Product[] | null>(null);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const { data: products } = useGetProductByIdSubCategoryQuery(
    selectedSubCategoryId!,
    { skip: selectedSubCategoryId === null }
  );

  const [addToCart] = useAddToCartMutation();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]") as Product[];
    setFavorites(stored);
  }, []);

  useEffect(() => {
    if (selectedSubCategoryId === null) {
      setLocalProducts(null);
    } else {
      setLocalProducts([]); 
    }
  }, [selectedSubCategoryId]);

  useEffect(() => {
    if (products) {
      setLocalProducts(products);
    }
  }, [products]);

  const handleAddToFavorites = (product: Product) => {
    const exists = favorites.some((f) => f.id === product.id);
    const updatedFavorites = exists
      ? favorites.filter((f) => f.id !== product.id)
      : [...favorites, product];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleAddToCart = (productId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/loginPage");
      return;
    }
    addToCart(productId);
  }; 

  return (
    <main className="p-4">
      <div className="mb-6 flex items-center gap-[5px] text-blue-500">
        <Link to="/homePage">{t("pol.po")}</Link> / 
        <Link to="/catalogPage">{t("catalogPage.cat")}</Link> / 
        <span>{data?.categoryName}</span>
      </div>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-6">
        {data?.subCategories.map((sub) => (
          <div
            key={sub.id}
            onClick={() => setSelectedSubCategoryId(sub.id)}
            className={`flex items-center gap-2 px-4 h-15 rounded-2xl cursor-pointer shadow-md flex-shrink-0
              ${selectedSubCategoryId === sub.id ? "bg-[#ffd36a] text-black" : theme === "dark" ? "bg-[#3b3b3b] text-white hover:bg-[#ffd36a] hover:text-black" : "bg-[#ffffff70] text-black hover:bg-[#ffd36a] hover:text-black"}
              transition-all duration-200`}
          >
            <span>{sub.subCategoryName}</span>
          </div>
        ))}
      </div>
      {selectedSubCategoryId && (
        <section className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {localProducts && localProducts.length > 0 ? (
            localProducts.map((p) => {
              const isFavorite = favorites.some((f) => f.id === p.id);
              return (
                <div
                  key={p.id}
                  className={`flex flex-col p-4 rounded-xl shadow-md
                    ${theme === "dark" ? "bg-[#3b3b3b] text-white" : "bg-white"}`}
                >
                  <div className="relative w-full h-40 mb-3">
                    <img
                      src={`https://store-api.softclub.tj/images/${p.image}`}
                      alt={p.productName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleAddToFavorites(p)}
                      className="absolute top-2 right-2"
                    >
                      <Heart size={22} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
                    </button>
                    <Link to={`/infoPage/${p.id}`} className="absolute top-2 left-2">
                      <Eye size={22} />
                    </Link>
                  </div>

                  <h2 className="font-semibold mb-1">{p.productName}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#ffd36a] font-bold">{p.price} c</span>
                    {p.discountPrice && <span className="line-through text-gray-400">{p.discountPrice} c</span>}
                  </div>

                  <button
                    onClick={() => handleAddToCart(p.id)}
                    className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-lg flex items-center justify-center gap-2 font-semibold transition"
                  >
                    <ShoppingCart size={18} />
                    {t("main.lol6")}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <img src={img} alt="No products" className="mb-4 w-40 h-40 object-contain" />
              <h1 className="text-lg font-semibold flex items-center gap-2">
                <ShoppingCart /> {t("main.noProducts")}
              </h1>
            </div>
          )}
        </section>
      )}
    </main>
  );
};

export default CatalogByIdPage;
