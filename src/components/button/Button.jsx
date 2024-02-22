import React from "react";
import "./Button.css";
function Button({
    children,
    type = "button",
    backgroundColor = "",
    color = "",
    ...props
}) {
    return (
        <button
            className="button"
            type={type}
            style={{ backgroundColor, color }}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
