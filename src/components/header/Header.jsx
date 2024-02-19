import React from "react";

import Container from "../Container/Container";
import LogoutButton from "./LogoutButton";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import Logo from "../Logo/Logo";
function Header() {
    const authStatus = useSelector((state) => state.auth.status);

    const navigate = useNavigate();

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "SignUp", slug: "/signup", active: !authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="headerheader">
            <Container>
                <nav className="headernav">
                    <div className="headerlogo">
                        <Link to="/">
                            <Logo />
                        </Link>
                    </div>

                    <ul className="headerelements">
                        {navItems.map((item) =>
                            item.active ? (
                                <li className="headerelement" key={item.name}>
                                    <button onClick={() => navigate(item.slug)}>
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutButton />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
