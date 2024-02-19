import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../button/Button";
import Input from "../input/Input";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { login as authLogin } from "../../Store1/authSlice";
import { useForm } from "react-hook-form";
import "./Login.css";
import Logo from "../Logo/Logo";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            const session = await authService.login(data);

            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className="Loginmain">
            <div className="Logintitle">
                <p className="Loginheading">Login</p>
            </div>
            {error && <p className=" Loginerror">{error}</p>}
            <form onSubmit={handleSubmit(login)}>
                <div className="Logincontent">
                    <Input
                        className="Logininput"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: true,
                            // validate: {
                            //     matchPatern: (value) =>
                            //         /@"^[^\s@]+@[^\s@]+\.[^\s@]+$"/.test(
                            //             value
                            //         ) ||
                            //         "Email address must be a valid address",
                            // },
                        })}
                    />
                    <Input
                        className="Logininput"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button type="submit" className="Loginbutton">
                        Login
                    </Button>
                    <div className="Loginsignup">
                        Don&apos;t have any account ? &nbsp;
                        <Link to="/signup" className="Loginlink">
                            SignUp
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
