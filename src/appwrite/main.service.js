import config from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class AllService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  createPost = async ({ title, content, featuredImage, status, userId,username }) => {
    try {
      const post = await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          username
        }
      );
      return post;
    } catch (err) {
      console.log(err);
    }
  };

  updatePost = async (id, { title, content, featuredImage, status }) => {
    try {
      const post = await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      return post;
    } catch (err) {
      console.log(err);
    }
  };

  deletePost = async (id) => {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id
      );
    } catch (err) {
      console.log(err);
    }
  };

  getPost = async (id) => {
    try {
      const post = await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        id
      );
      return post;
    } catch (error) {
      console.log(error);
    }
  };

  getPosts = async (queries = [Query.equal("status", "active")]) => {
    try {
      const posts = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
      return posts;
    } catch (err) {
      console.log(err);
    }
  };

  getPostsByUserId = async (userId) => {
    try {
      const posts = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        [Query.equal("userId", userId)]
      );
      return posts;
    } catch (err) {
      console.log(err);
    }
  };

  uploadFile = async (file) => {
    try {
      const fileUpload = await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      return fileUpload;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  deleteFile = async (fileId) => {
    try {
      const fileDelete = await this.bucket.deleteFile(
        config.appwriteBucketId,
        fileId
      );
      return fileDelete;
    } catch (err) {
      console.log(err);
    }
  };

  getFilePreview = (fileId) => {
    try {
      const filePreview = this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileId
      );
      return filePreview.href;
    } catch (error) {
      console.log(error);
    }
  };
}

const allService = new AllService();

export default allService;
