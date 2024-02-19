import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./Store1/authSlice";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData }));
                } else {
                    dispatch(logout());
                }
            })
            .finally(() => setLoading(false));
    }, []);
    return !loading ? (
        <div className="Appmain">
            <div className="Appcontainer">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : null;
}

export default App;
