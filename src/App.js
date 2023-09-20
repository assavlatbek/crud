import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Categories from "./Pages/Categories";
import SignUp from "./Pages/SignUp";
import ProductPage from './Pages/ProductPage'
import { ToastContainer } from "react-toastify";

function App() {
    const user = localStorage.getItem("user");
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={user ? <Categories /> : <Navigate to={"/signup"} />}
                    />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/products" element={<ProductPage />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
