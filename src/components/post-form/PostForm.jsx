import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../button/Button";
import Input from "../input/Input";
import RTE from "../RTE/RTE";
import Select from "../select/Select";
import { useNavigate } from "react-router-dom";

import "./PostForm.css";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/config";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } =
        useForm({
            defaultValues: {
                title: post?.title || "",
                slug: post?.$id || "",
                content: post?.content || "",
                status: post?.status || "active",
            },
        });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0]
                ? await appwriteService.uploadFile(data.image[0])
                : null;
            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true,
                });
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="container">
                <h1 className="heading">Create a new post</h1>
                <div className="content1">
                    <div className="img">
                        {/* <div className="preview"></div> */}
                        {post && (
                            <div className="preview">
                                <img
                                    src={appwriteService.getFilePriview(
                                        post.featuredImage
                                    )}
                                    alt={post.title}
                                    className="img"
                                />
                            </div>
                        )}
                        <Input
                            type="file"
                            id="fileInput"
                            style={{}}
                            {...register("image", { required: !post })}
                        />
                        <label htmlFor="fileInput" className="uploadButton">
                            Upload Image
                        </label>

                        {/* {post && (
                            <div className="preview">
                                <img
                                    src={appwriteService.getFilePriview(
                                        post.featuredImage
                                    )}
                                    alt={post.title}
                                    className="rounded-lg"
                                />
                            </div>
                        )} */}
                    </div>
                    <div className="main1">
                        <div className="name">
                            <label htmlFor="title" className="title_label">
                                Title:
                            </label>
                            <Input
                                type="text"
                                className="title"
                                placeholder="Title"
                                name="title"
                                id="title"
                                {...register("title", {
                                    required: true,
                                })}
                            />
                            <Select
                                className="select1"
                                name=""
                                id=""
                                options={["active", "inactive"]}
                                {...register("status", { required: true })}
                            />
                        </div>
                        <div>
                            <label htmlFor="slug" className="title_label">
                                Slug:
                            </label>
                            <Input
                                type="text"
                                className="title"
                                name="slug"
                                id="slug"
                                placeholder="Slug"
                                {...register("slug", {
                                    required: true,
                                })}
                                onInput={(e) => {
                                    setValue(
                                        "slug",
                                        slugTransform(e.currentTarget.value),
                                        {
                                            shouldValidate: true,
                                        }
                                    );
                                }}
                            />
                        </div>
                        {/* <input type="text" className="desc" name="" id="" /> */}
                        <RTE
                            className="desc"
                            label="Content :"
                            name="content"
                            control={control}
                            defaultValue={getValues("content")}
                        />
                        <Button type="submit" className="postB">
                            {post ? "Update Post" : "Create Post"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
}
