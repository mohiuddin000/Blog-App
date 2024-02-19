import React from "react";

import { Link } from "react-router-dom";
import "./Footer.css";
import Logo from "../Logo/Logo";

function Footer() {
    return (
        <section className="footer-section">
            {" "}
            <div className="footer-container">
                <div className="footer-column">
                    <div className="footer-logo">
                        <Logo width="100px" />
                    </div>
                    <div>
                        <p className="footer-copyright">
                            &copy; Copyright 2023. All Rights Reserved by DevUI.
                        </p>
                    </div>
                </div>
                <div className="footer-column">
                    <h3 className="footer-heading">Company</h3>
                    <ul className="footer-links">
                        <li>
                            <Link to="/">Features</Link>
                        </li>
                        <li>
                            <Link to="/">Pricing</Link>
                        </li>
                        <li>
                            <Link to="/">Affiliate Program</Link>
                        </li>
                        <li>
                            <Link to="/">Press Kit</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-heading">Support</h3>
                    <ul className="footer-links">
                        <li>
                            <Link to="/">Account</Link>
                        </li>
                        <li>
                            <Link to="/">Help</Link>
                        </li>
                        <li>
                            <Link to="/">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/">Customer Support</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3 className="footer-heading">Legals</h3>
                    <ul className="footer-links">
                        <li>
                            <Link to="/">Terms &amp; Conditions</Link>
                        </li>
                        <li>
                            <Link to="/">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link to="/">Licensing</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Footer;
