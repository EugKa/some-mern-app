import axios, { AxiosResponse } from "axios";
import api from "../http";
import { IBook } from "../interfaces";

export async function createBookAnnouncementService(
   saler: string,
   author: string,
   title: string,
   description: string,
   type: string,
   tags: string[],
   price: number
): Promise<AxiosResponse<IBook>> {
   return api.post<IBook>('/book/create', { 
      saler,
      author,
      title,
      description,
      type,
      tags,
      price
   })
}

export async function getAllBookAnnouncementsService() {
   return axios.get<IBook[]>(`${process.env.REACT_APP_API_URL}/book/getAll`)
}

export async function getUserBookAnnouncementsService(id: string): Promise<AxiosResponse<IBook[]>> {
   return api.get<IBook[]>(`/book/getUserBooksAnnouncements/${id}`)
}

export async function deleteBookAnnouncementService(id: string): Promise<AxiosResponse<IBook['_id']>> {
   return api.delete<IBook['_id']>(`/book/delete/${id}`)
}

export async function updateBookAnnouncementService(id: string, title: string, description: string, price: number): Promise<AxiosResponse<IBook[]>> {
   return api.patch<IBook[]>(`/book/update/${id}`, { title, description, price })
}

export async function searchBookAnnouncementService(value: string): Promise<AxiosResponse<IBook[]>> {
   return api.post<IBook[]>(`/book/search`, { value })
}
