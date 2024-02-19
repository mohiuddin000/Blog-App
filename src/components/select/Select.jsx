import React, { useId, forwardRef } from "react";
import "./Select.css";

const Select = forwardRef(({ options, label, style = {}, ...props }, ref) => {
    const id = useId();
    return (
        <select className="select" ref={ref} id={id} {...props}>
            {options?.map((option) => (
                <option value={option} key={option}>
                    {option}
                </option>
            ))}
        </select>
    );
});

export default Select;
