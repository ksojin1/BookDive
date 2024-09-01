import { AxiosHeaders } from "axios";

export interface Payload {
  code: number,
  msg: string,
  book?: string,
  bookType?: string,
  character?: string,
  text?: string,
  res1?: string,
  res2?: string,
  res3?: string,
}

export interface User { // 유저정보 리덕스 저장
  id: string, // 유저아이디 -> cookie 저장
  endAt: string, // 유효시간 끝나는 시점 -> cookie 저장
  bubbleCnt: number, // 말풍선 횟수
}

export interface RequestType { // 서버요청
  userId: string, // cookie userId
  book: string, // 책이름
  bookType: string, // 책장르
  character: string, // 등장인물 or 저자
  text: string,
}

export interface ResponseType { // 서버응답
  book: string, // 책이름
  bookType: string, // 책장르
  character: string, // 등장인물 or 저자
  text: string, 
  code: number, // 1000: 정상, -99: 비정상
  res1?: string, // 
  res2?: string,
  res3?: string,
}

export interface ChatType { // 채팅 말풍선 타입
  step: number, // 1: 책이름, 2: 등장인물, AI자기소개, 3: 질문예시, 4: 대화
  code: number, // 100: 성공, -100: 책이름 or 등장인물 알수없음, -500: 서버에러
  type: 'B' | 'U' | 'C', // B: BookDive, U: User, C: Character
  text: string,
}

export interface BookInfo {
  type: string, // 0: 문학, 1: 비문학, null: 정해지기 전
  title: string,
  character: string, // 등장인물 or 저자
}

export interface ReqBody { // 서버요청 Body
	userId: string,
	book: string,
	bookType: string,
	character : string,
	text : string,
}

export interface ServerRes { // 서버응답
  data: ResponseData,
  status: number,
  statusText: string,
  config: any,
  headers: AxiosHeaders,
  request: XMLHttpRequest,
}

// response.data
export interface ResponseData {
  code: number,
  msg: string,
	character?: string,
	res1?: string,
	res3?: string,
	book?: string,
	res2?: string,
	text?: string,
	bookType?: string,
}
