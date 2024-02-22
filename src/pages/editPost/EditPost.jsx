import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../../components";
import appwriteService from "../../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
    const [post, setPosts] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("in editt post useeffect");
        if (slug) {
            console.log("slug find ");
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    console.log("in post page ");
                    setPosts(post);
                }
            });
        } else {
            console.log("in else post not get");
            navigate("/");
        }
    }, [slug, navigate]);
    return post ? (
        <div className="EditPostpost">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
