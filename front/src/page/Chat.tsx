import React, { useEffect, useState } from "react";
import styles from './Chat.module.scss';
import { useInputBox } from "../hook/useInputBox";
import { ChatType } from "../type";

export const Chat = () => {

  const { setStatus, setPlaceholder, setValue } = useInputBox();

  const [chatList, setChatList] = useState<ChatType[]>([
    { type: 0, text: '대화를 나눌 책의 이름이 무엇인가요?'},
  ]);

  useEffect(() => {
    setValue('');
    setStatus('enabled');
    setPlaceholder('여기에 프롬프트를 입력해 주세요.');
  }, []);

  return (
    <div className={styles.container}>
      책과 대화
    </div>
  );
}
