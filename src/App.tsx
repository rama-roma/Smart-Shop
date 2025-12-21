import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./layout"
import HomePage from "./pages/homePage"
import CartPage from "./pages/cartPage"
import LoginPage from "./pages/loginPage"
import OrderPage from "./pages/orderPage"
import ProductPage from "./pages/productPage"
import ProfilePage from "./pages/profilePage"
import RegisterPage from "./pages/registerPage"
import WishlistPage from "./pages/wishlistPage"
import InfoPage from "./pages/infoPage"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage/>} />
            <Route path="/homePage" element={<HomePage/>} />
            <Route path="/cartPage" element={<CartPage/>} />
            <Route path="/loginPage" element={<LoginPage/>} />
            <Route path="/orderPage" element={<OrderPage/>} />
            <Route path="/productPage" element={<ProductPage/>} />
            <Route path="/profilePage" element={<ProfilePage/>} />
            <Route path="/registerPage" element={<RegisterPage/>} />
            <Route path="/wishlistPage" element={<WishlistPage/>} />
            <Route path="/infoPage/:id" element={<InfoPage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App