import React, { useEffect, useState } from "react";
import styles from './Chat.module.scss';
import { useInputBox } from "../hook/useInputBox";
import { BookInfo, ChatType } from "../type";
import { useChat } from "../hook/useChat";
import { useUserInfo } from "../redux";
import { Modal } from "../component/Modal";

export const MAX_BUBBLE = 5;

export const Chat = () => {

  const { setStatus, setPlaceholder, setValue, sendFlag, setSendFlag, value, queryList, setQueryList } = useInputBox();

  const user = useUserInfo();
  const { chatStep1, chatStep2, chatStep3, chatStep4 } = useChat();

  const [bookInfo, setBookInfo] = useState<BookInfo>({
    type: '',
    title: '',
    character: '',
  });

  const [chatList, setChatList] = useState<ChatType[]>([
    { step:1, code: 1, type: 'B', text: '대화를 나눌 책의 이름이 무엇인가요?'},
  ]);

  const sendMsg = async (newChatList: ChatType[]) => {

    if (!user) return;

    if (queryList.length > 0) setQueryList([]);

    // step1
    if (chatList[chatList.length-1].step === 1) {
      const payload = await chatStep1(value);
      // 정상
      if (payload.code === 100 && payload.text && payload.book && payload.bookType) {
        newChatList[newChatList.length-1] = { 
          step: chatList[chatList.length-1].step+1, code: 100, type: "B", text: payload.text, 
        };
        setBookInfo({
          ...bookInfo,
          title: payload.book,
          type: payload.bookType,
        });
      // 알수없음
      } else if (payload.code === -100 && payload.text) {
        newChatList[newChatList.length-1] = { 
          step: chatList[chatList.length-1].step, code: payload.code, type: "B", text: payload.text, 
        };
      // 서버에러
      } else {
        newChatList[newChatList.length-1] = { 
          step: chatList[chatList.length-1].step, code: payload.code, type: "B", text: '', 
        };
        window.alert(payload.msg);
      }
    } 

    // step2
    if (chatList[chatList.length-1].step === 2) {
      let payload = await chatStep2(bookInfo.title, bookInfo.type, value);
      // 정상
      if (payload.code === 100 && payload.text && payload.character) {

        newChatList[newChatList.length-1] = { 
          step: chatList[chatList.length-1].step+1, code: 100, type: "C", text: payload.text,
        };

        setBookInfo({
          ...bookInfo,
          character: payload.character,
        });

        // step3 질문 요청
        payload = await chatStep3(bookInfo.title, bookInfo.type, payload.character);
        if (payload.code === 100 && payload.res1 && payload.res2 && payload.res3) { // 정상
          setQueryList([ payload.res1, payload.res2, payload.res3 ]);
        } else window.alert(payload.msg);


      // 알수없음
      } else if (payload.code === -100 && payload.text) {
        newChatList[newChatList.length-1] = { 
          step: chatList[chatList.length-1].step, code: payload.code, type: "B", text: payload.text, 
        };
      // 서버에러
      } else {
        newChatList[newChatList.length-1] = { 
          step: chatList[chatList.length-1].step, code: payload.code, type: "B", text: '', 
        };
        window.alert(payload.msg);
      }
    }

    // step4
    if (chatList[chatList.length-1].step >= 3) {
      const payload = await chatStep4(bookInfo.title, bookInfo.type, bookInfo.character, value);
      // 정상
      if (payload.code === 100 && payload.text) {
        newChatList[newChatList.length-1] = { 
          step: chatList[chatList.length-1].step, code: 100, type: "C", text: payload.text, 
        };
      // 서버에러
      } else {
        newChatList[newChatList.length-1] = { 
          step: chatList[chatList.length-1].step, code: payload.code, type: "C", text: '', 
        };
        window.alert(payload.msg);
      }
    } 
    newChatList = newChatList.filter((el) => el.text !== '');
    setChatList([ ...newChatList ]);
    setStatus('enabled');
  }

  useEffect(() => {
    setValue('');
    setStatus('enabled');
    setPlaceholder('여기에 프롬프트를 입력해 주세요.');
  }, []);

  useEffect(() => {
    if (user && user.bubbleCnt >= MAX_BUBBLE) {
      setPlaceholder('지금은 대화할 수 없는 상태에요');
      setStatus('disabled');
    }
  }, [user]);

  useEffect(() => {
    if (sendFlag) {
      let step = chatList[chatList.length-1].step;
      let chatType: 'B' | 'C' = 'B';

      if (chatList[chatList.length-1].type !== 'U' && chatList[chatList.length-1].code === 100) {
        step = step+1;
      }

      if (chatList[chatList.length-1].type === 'C') {
        chatType = 'C';
      }

      // 유저의 질문, 답변중
      let newChatList: ChatType[] = [ 
        ...chatList, 
        { step, code: 100, type: "U", text: value },
        { step, code: 0, type: chatType, text: '' } // 답변중
      ];

      setChatList([ ...newChatList]);

      // 전송중
      setValue('');
      setStatus('disabled');

      // api 요청
      sendMsg(newChatList);
      setSendFlag(false);
    }
  }, [sendFlag]);

  useEffect(() => {
    console.log(chatList);
  }, [chatList]);

  return (
    <>
    <div className={styles.container}>
      <div className={styles.chat_wrap}>
      {chatList.map((chat, idx) => {
        return (
          <div key={idx} id={styles[chat.type]}>
            {chat.step === 2 && chat.type === 'C' && (
              <div className={styles.character_chat_start}>
                <hr/><p>등장인물과 의 대화를 시작할게요.</p><hr/>
              </div>
            )}
            <div className={styles.chat_div}>
              {chat.type === "B" && <div className={styles.dive_logo}></div>}
              <div className={styles.text_div}>
                {chat.type !== 'U' && <h4>{chat.type === 'B' ? '북다이브' : bookInfo.character}</h4>}
                <p>{chat.text}</p>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
    </>
  );
}