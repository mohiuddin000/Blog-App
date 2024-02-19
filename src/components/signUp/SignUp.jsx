import React, { useState } from "react";

import Button from "../button/Button";
import Input from "../input/Input";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../appwrite/auth";
import { login } from "../../Store1/authSlice";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import Logo from "../Logo/Logo";

function SignUp() {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { handleSubmit, register } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userdata = await authService.createAccount(data);
            if (userdata) {
                const userdata = await authService.getCurrentUser();
                if (userdata) dispatch(login(userdata));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="SignUpmain">
            <div className="SignUptitle">
                <p className="SignUpheading">SignUp to create an account</p>
            </div>
            {error && <p className="SignUperror">{error}</p>}
            <form onSubmit={handleSubmit(create)}>
                <div className="SignUpcontent">
                    <Input
                        className="SignUpinput"
                        type="text"
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <Input
                        className="SignUpinput"
                        // className="email"
                        placeholder="Enter your Email"
                        {...register("email", {
                            required: true,
                        })}
                    />
                    <Input
                        type="password"
                        className="SignUpinput"
                        placeholder="Enter the Password"
                        {...register("password", {
                            required: true,
                        })}
                    />
                    <Button type="submit" className="SignUpbutton">
                        Create Account
                    </Button>
                    <div className="SignUpsignup">
                        Already have an account ? &nbsp;
                        <Link to="/login" className="SignUplink">
                            SignIn
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
