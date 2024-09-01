import { Cookies } from "react-cookie";
import { User } from "../type";

const cookies: Cookies = new Cookies();

export const setCookie = (userId: string): string => {
  const time = 43200000; // 12시간
  const expiration = new Date(Date.now() + time);
  cookies.set(`userId`, userId, {
    sameSite: 'strict',
    path: '/',
    expires: expiration,
  });
  localStorage.setItem('cookieExpires', expiration.toISOString()); 
  localStorage.setItem('chatCnt', '0');
  return expiration.toISOString();
}

export const getCookie = (): { userId: string, endAt: string, chatCnt: number } | null => {
  const userId = cookies.get('userId');
  const cookieExpires = localStorage.getItem('cookieExpires');
  const chatCnt = localStorage.getItem('chatCnt');
  if (!userId || !cookieExpires) return null;
  return {
    userId,
    endAt: cookieExpires,
    chatCnt: Number(chatCnt),
  }
}

export const chatCntUp = () => {
  const chatCnt = localStorage.getItem('chatCnt');
  localStorage.setItem('chatCnt', `${Number(chatCnt)+1}`);
}