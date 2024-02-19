import React from "react";
import "./Button.css";
function Button({
    children,
    type = "button",
    backgroundColor = "",
    color = "",
}) {
    return (
        <button
            className="button"
            type={type}
            style={{ backgroundColor, color }}
        >
            {children}
        </button>
    );
}

export default Button;
