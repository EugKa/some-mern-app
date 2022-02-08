import axios, { AxiosResponse } from "axios";
import api from "../http";
import { IPost } from "../interfaces";

export async function createPostService(owner: string, title:  string, description: string): Promise<AxiosResponse<IPost>> {
   return api.post<IPost>('/post/create', { owner, title, description })
}

export async function getAllPostsService() {
   return axios.get<IPost[]>(`${process.env.REACT_APP_API_URL}/post/getAll`)
}

export async function getUserPostsService(id: string): Promise<AxiosResponse<IPost[]>> {
   return api.get<IPost[]>(`/post/getUserPosts/${id}`)
}

export async function deletePostService(id: string): Promise<AxiosResponse<IPost['_id']>> {
   return api.delete<IPost['_id']>(`/post/delete/${id}`)
}

export async function updatePostService(id: string, title: string, description: string): Promise<AxiosResponse<IPost[]>> {
   return api.patch<IPost[]>(`/post/update/${id}`, { title, description })
}
