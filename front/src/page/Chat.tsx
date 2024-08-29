import React, { useEffect, useState } from "react";
import styles from './Chat.module.scss';
import { useInputBox } from "../hook/useInputBox";
import { BookInfo, ChatType } from "../type";

export const Chat = () => {

  const { setStatus, setPlaceholder, setValue, sendFlag, setSendFlag, value } = useInputBox();

  const [bookInfo, setBookInfo] = useState<BookInfo>({
    type: null,
    title: '',
    character: '',
  })

  const [chatList, setChatList] = useState<ChatType[]>([
    { step:1, code: 100, type: 'B', text: '대화를 나눌 책의 이름이 무엇인가요?'},
    { step:1, code: 100, type: 'B', text: '대화를 나눌 책의 이름이 무엇인가요?'},
    { step:1, code: 100, type: 'B', text: '대화를 나눌 책의 이름이 무엇인가요?'},
    { step:1, code: 100, type: 'B', text: '대화를 나눌 책의 이름이 무엇인가요?'},
    { step:1, code: 100, type: 'B', text: '대화를 나눌 책의 이름이 무엇인가요?'},
  ]);

  useEffect(() => {
    setValue('');
    setStatus('enabled');
    setPlaceholder('여기에 프롬프트를 입력해 주세요.');
  }, []);

  const sendMsg = async (newChatList: ChatType[]) => {

    // api 답변
    newChatList = [ 
      ...newChatList, { step:1, code: 100, type: "B", text: '답변입니다.' } 
    ];
    setChatList(newChatList);


    // 초기화
    setValue('');
    setSendFlag(false);
  }

  useEffect(() => {
    if (sendFlag) {

      // 유저의 질문
      let newChatList: ChatType[] = [ 
        ...chatList, { step:1, code: 100, type: "U", text: value } 
      ];

      // api 요청
      sendMsg(newChatList);
    }
  }, [sendFlag]);

  return (
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
  );
}
