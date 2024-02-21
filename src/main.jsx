import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import SignUp from "./pages/SignUP/SignUp.jsx";
import AddPost from "./pages/AddPost/AddPost.jsx";
import { Provider } from "react-redux";
import Home from "./pages/Home/Home.jsx";
import EditPost from "./pages/editPost/EditPost.jsx";
import AllPost from "./pages/AllPost/AllPost.jsx";
import Post from "./pages/Post/Post.jsx";
import Store from "./Store1/Store.js";
import { Protected } from "./components/index.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: (
                    <Protected authentication={false}>
                        <Login />
                    </Protected>
                ),
            },
            {
                path: "/signup",
                element: (
                    <Protected authentication={false}>
                        <SignUp />
                    </Protected>
                ),
            },
            {
                path: "/all-posts",
                element: (
                    <Protected authentication>
                        <AllPost />
                    </Protected>
                ),
            },
            {
                path: "/add-post",
                element: (
                    <Protected authentication>
                        <AddPost />
                    </Protected>
                ),
            },

            {
                path: "/edit-post/:slug",
                element: (
                    <Protected authentication={false}>
                        <EditPost />
                    </Protected>
                ),
            },
            {
                path: "/post/:slug",
                element: <Post />,
            },
        ],
    },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={Store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);
