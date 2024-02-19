import { useId } from "react";
import React from "react";
import "./Input.css";

const Input = React.forwardRef(function Input(
    { label, type = "text", style, ...props },
    ref
) {
    const id = useId();
    return (
        <div>
            {label && (
                <label htmlFor={props.id} className="label">
                    {label}
                </label>
            )}
            <input
                style={style}
                type={type}
                className="input"
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});
export default Input;
