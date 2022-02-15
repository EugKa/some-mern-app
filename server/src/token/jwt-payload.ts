export interface JWTPayload {
   email: string;
   id: string;
   isActivated: boolean;
   iat: number;
   exp: number;
}