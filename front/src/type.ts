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

export interface ChatType {
  type: number, // 0: BookDive, 1: User, 2: Character
  text: string,
}