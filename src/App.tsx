import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./layout"
import HomePage from "./pages/homePage"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<HomePage/>} />
            <Route path="/homePage" element={<HomePage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App