import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import { Container, PostCard } from "../../components";
import "./Allpost.css";
function AllPost() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);
    return (
        <div class="AllPostcontainer">
            <Container>
                <div class="AllPostmain">
                    {posts.map((post) => (
                        <div key={post.$id} className="AllPostp">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default AllPost;
