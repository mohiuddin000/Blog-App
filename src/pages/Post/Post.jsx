// import React, { useEffect, useState } from "react";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import appwriteService from "../../appwrite/config";
// import { Button, Container } from "../../components";
// import { useSelector } from "react-redux";
// import parse from "html-react-parser";
// import "./Post.css";

// function Post() {
//     const [post, setPost] = useState(null);
//     const { slug } = useParams();
//     const navigate = useNavigate();

//     const userData = useSelector((state) => state.auth.userData);

//     const isAuthor = post && userData ? post.userId === userData.$id : false;

//     useEffect(() => {
//         if (slug) {
//             appwriteService.getPost(slug).then((post) => {
//                 if (post) {
//                     setPost(post);
//                 } else {
//                     navigate("/");
//                 }
//             });
//         } else {
//             navigate("/");
//         }
//     }, [slug, navigate]);

//     const deletePost = () => {
//         appwriteService.deletePost(post.$id).then((status) => {
//             if (status) {
//                 appwriteService.deleteFile(post.featuredImage);
//                 navigate("/");
//             }
//         });
//     };
//     return post ? (
//         <div className="main">
//             <Container>
//                 <div className="heading">
//                     <div className="heading-text">
//                         <h1>{post.title}</h1>
//                     </div>
//                 </div>
//                 <div className="img">
//                     <img
//                         src={appwriteService.getFilePriview(post.featuredImage)}
//                         alt={post.title}
//                     />
//                 </div>
//                 <div className="title">{parse(post.content)}</div>
//                 {isAuthor && (
//                     <div className="post-actions">
//                         <Link to={`/edit-post/${post.$id}`}>
//                             <Button className="update-btn">Edit Post</Button>
//                         </Link>
//                         <Button className="delete-btn">Delete Post</Button>
//                     </div>
//                 )}
//             </Container>
//         </div>
//     ) : null;
// }

// export default Post;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import { Button, Container } from "../../components";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import "./Post.css";

function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };
    return post ? (
        <div className="Postmain">
            <Container>
                <div className="Postheading">
                    <div className="Postheading-text">
                        <h1>{post.title}</h1>
                    </div>
                </div>
                <div className="Postimg">
                    <img
                        src={appwriteService.getFilePriview(post.featuredImage)}
                        alt={post.title}
                    />
                </div>
                <div className="Posttitle">{parse(post.content)}</div>
                {isAuthor && (
                    <div className="Postpost-actions">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button className="Postupdate-btn">
                                Edit Post
                            </Button>
                        </Link>
                        <Button className="Postdelete-btn" onClick={deletePost}>
                            Delete Post
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    ) : null;
}

export default Post;
