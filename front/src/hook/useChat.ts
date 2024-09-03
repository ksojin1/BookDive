import axios from "axios";
import { ReqBody, Payload, ServerRes } from "../type"
import { useAction, useUserInfo } from "../redux";

export const useChat = () => {

  const { bubbleCntUp } = useAction();
  const user = useUserInfo();

  // ▶ 책이름
  const chatStep1 = async (text: string): Promise<Payload> => {
    console.log('서버요청 > step1');

    if (!user?.id) return { code: -99, msg: 'step1 > 사용자 정보가 없습니다.' };
    const chatCnt = localStorage.getItem('chatCnt');

    const body: ReqBody = {
      userId: `${user.id}_${chatCnt}`,
      book: '',
      bookType: '',
      character: '',
      text,
    }
    const jsonBody: string = JSON.stringify(body);

    try {
      const res: ServerRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/step1`, jsonBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      bubbleCntUp(user);

      console.log(res.data);

      if (res.data.code === 100) { // 정상
        return {
          code: res.data.code,
          msg: res.data.msg,
          book: res.data.book,
          bookType: res.data.bookType,
          text: res.data.text,
        }
      }

      if (res.data.code === -100) { // 책이름 알수없음
        return {
          code: res.data.code,
          msg: res.data.msg,
          text: res.data.text,
        }
      }

      // 서버에러
      return {
        code: res.data.code,
        msg: res.data.msg,
      }

    } catch (err) {
      return {
        code: -99,
        msg: 'step1 > 알 수 없는 에러가 발생했습니다.'
      }
    }
  }

  // ▶ 등장인물 or 저자
  const chatStep2 = async (book: string, bookType: string, text: string): Promise<Payload> => {
    console.log('서버요청 > step2');

    if (!user?.id) return { code: -99, msg: 'step2 > 사용자 정보가 없습니다.' };
    const chatCnt = localStorage.getItem('chatCnt');

    const body: ReqBody = {
      userId: `${user.id}_${chatCnt}`,
      book,
      bookType,
      character: '',
      text,
    }
    const jsonBody: string = JSON.stringify(body);

    try {
      const res: ServerRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/step2`, jsonBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      bubbleCntUp(user);

      console.log(res.data);

      if (res.data.code === 100) { // 정상
        return {
          code: res.data.code,
          msg: res.data.msg,
          text: res.data.text,
          character: res.data.character,
        }
      }

      if (res.data.code === -100) { // 등장인물 or 저자 알수없음
        return {
          code: res.data.code,
          msg: res.data.msg,
          text: res.data.text,
        }
      }

      // 서버에러
      return {
        code: res.data.code,
        msg: res.data.msg,
      }

    } catch (err) {
      return {
        code: -99,
        msg: 'step2 > 알 수 없는 에러가 발생했습니다.'
      }
    }
  }

  // ▶ 추천 질문 3가지
  const chatStep3 = async (book: string, bookType: string, character: string): Promise<Payload> => {
    console.log('서버요청 > step3');

    if (!user?.id) return { code: -99, msg: 'step3 > 사용자 정보가 없습니다.' };
    const chatCnt = localStorage.getItem('chatCnt');

    const body: ReqBody = {
      userId: `${user.id}_${chatCnt}`,
      book,
      bookType,
      character,
      text: '',
    }
    const jsonBody: string = JSON.stringify(body);

    try {
      const res: ServerRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/step3`, jsonBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      bubbleCntUp(user);

      console.log(res.data);

      if (res.data.code === 100) { // 정상
        return {
          code: res.data.code,
          msg: res.data.msg,
          res1: res.data.res1,
          res2: res.data.res2,
          res3: res.data.res3,
        }
      }

      // 서버에러
      return {
        code: res.data.code,
        msg: res.data.msg,
      }

    } catch (err) {
      return {
        code: -99,
        msg: 'step3 > 알 수 없는 에러가 발생했습니다.'
      }
    }
  }

  // ▶ 인물과 대화
  const chatStep4 = async (book: string, bookType: string, character: string, text: string): Promise<Payload> => {
    console.log('서버요청 > step4');

    if (!user?.id) return { code: -99, msg: 'step4 > 사용자 정보가 없습니다.' };
    const chatCnt = localStorage.getItem('chatCnt');

    const body: ReqBody = {
      userId: `${user.id}_${chatCnt}`,
      book,
      bookType,
      character,
      text,
    }
    const jsonBody: string = JSON.stringify(body);

    try {
      const res: ServerRes = await axios.post(`${process.env.REACT_APP_SERVER_URL}/step4`, jsonBody, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      bubbleCntUp(user);

      console.log(res.data);

      if (res.data.code === 100) { // 정상
        return {
          code: res.data.code,
          msg: res.data.msg,
          text: res.data.text,
        }
      }

      // 서버에러
      return {
        code: res.data.code,
        msg: res.data.msg,
      }

    } catch (err) {
      return {
        code: -99,
        msg: 'step4 > 알 수 없는 에러가 발생했습니다.'
      }
    }
  }

  return { chatStep1, chatStep2, chatStep3, chatStep4 };
}