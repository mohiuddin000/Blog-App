import conf from "../conf/conf";

import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }
    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
        }
    }

    //file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
        }
    }

    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileID);
            return true;
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
        }
    }

    getFilePriview(fileID) {
        try {
            return this.bucket.getFilePreview(conf.appwriteBucketId, fileID);
        } catch (error) {
            console.log("Appwrite serive :: getFilePriview :: error", error);
        }
    }
}

const appwriteService = new Service();
export default appwriteService;