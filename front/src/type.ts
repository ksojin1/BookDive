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
  type: 0 | 1 | null, // 0: 문학, 1: 비문학, null: 정해지기 전
  title: string,
  character: string, // 등장인물 or 저자
}