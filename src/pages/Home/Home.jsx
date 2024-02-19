import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import { Container, PostCard } from "../../components";
import "./Home.css";

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="Homemain1">
                <Container>
                    <div className="Homecontainer1">
                        <div className="Homeheading">
                            <h1>Login to read posts</h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="Homecontainer">
            <Container>
                <div className="Homemain">
                    {posts.map((post) => (
                        <div key={post.$id} className="Homep">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
