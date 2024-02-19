import React from "react";
import appwriteService from "../../appwrite/config";
import { Link } from "react-router-dom";
import "./PostCard.css";
function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="PostCardmain">
                <div className="PostCardimg">
                    <img
                        src={appwriteService.getFilePriview(featuredImage)}
                        alt={title}
                    />
                </div>
                <div className="PostCardtitle">{title} </div>
            </div>
        </Link>
    );
}

export default PostCard;
