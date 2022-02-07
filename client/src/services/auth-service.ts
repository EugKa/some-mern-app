import { AxiosResponse } from "axios";
import api from "../http";
import { AuthResponse } from "../interfaces";



export async function authLogIn(email:  string, password: string): Promise<AxiosResponse<AuthResponse>> {
   return api.post<AuthResponse>('/user/login', { email, password })
}

export async function authRegistration(userName: string, email:  string, password: string): Promise<AxiosResponse<AuthResponse>> {
   return api.post<AuthResponse>('/user/registration', { userName, email, password })
}

export async function authLogOut(): Promise<void> {
   return api.post('/user/logout')
}

