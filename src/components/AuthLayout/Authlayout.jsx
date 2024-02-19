// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export default function Protected({ children, authentication = true }) {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);

//     const authStatus = useSelector((state) => state.auth.status);

//     useEffect(() => {
//         if (authentication && authStatus != authentication) {
//             navigate("/login");
//         } else if (!authentication && authStatus != authentication) {
//             navigate("/");
//         }

//         setLoading(false);
//     }, [authStatus, navigate, authentication]);

//     return loading ? <h1>Loading.... </h1> : <>{children}</>;
// }

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Authlayout.css"; // Import the CSS file

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (authentication && authStatus !== authentication) {
                navigate("/login");
            } else if (!authentication && authStatus !== authentication) {
                navigate("/");
            }

            setLoading(false);
        }, 1000); // Simulate loading for 1 second

        // Clear the timeout to prevent memory leaks
        return () => clearTimeout(timeout);
    }, [authStatus, navigate, authentication]);

    return (
        <div className={`protected ${loading ? "loading" : "loaded"}`}>
            <div className={`children ${loading ? "" : "loaded"}`}>
                {children}
            </div>
            {loading && <h1>Loading.... </h1>}
        </div>
    );
}
