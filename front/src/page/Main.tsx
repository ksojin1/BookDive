import React, { useEffect, useState } from "react";
import styles from './Main.module.scss';
import { useNavigate } from "react-router-dom";
import { useInputBox } from "../hook/useInputBox";
import { Modal } from "../component/Modal";

export const Main = () => {
  const navigate = useNavigate();
  const [preModalOpen, setPreModalOpen] = useState<boolean>(false);

  const { setStatus, setPlaceholder, setValue } = useInputBox();

  useEffect(() => {
    setValue('');
    setStatus('disabled');
    setPlaceholder(`'책과의 대회'또는 '책의 연장선'을 먼저 선택 후 대화할 수 있어요.`);
  }, []);

  return (
    <>
    { preModalOpen && <PreModal setState={setPreModalOpen}/> }
    <div className={styles.container}>
      <div className={styles.text_div}>
        <h1>안녕하세요</h1>
        <h2>최근에 읽으신 책에 대해<br/>어떤 이야기를 나누고 싶으신가요?</h2>
        <span>예시보기</span>
      </div>
      <div className={styles.select_div}>
        <div onClick={() => navigate(`${process.env.PUBLIC_URL}/chat`)} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/card01.svg)` }}>
          <h3>책과의 대화<span className="material-symbols-outlined">chevron_right</span></h3>
          <p>등장인물과 저자와 대화로<br/>독서의 깊이를 더해요</p>
        </div>
        <div onClick={() => setPreModalOpen(true)} style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/card02.svg)` }}>
          <h3>책의 연장선<span className="material-symbols-outlined">chevron_right</span></h3>
          <p>책을 새로운 시각으로 살펴보며<br/>독서의 폭을 확장해요</p>
        </div>
      </div>
    </div>
    </>
  );
}

export const PreModal = ({ setState }: { setState: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <Modal setState={setState} width={300}>
      <div className={styles.modal_container}>
        <h1>준비중인 기능이에요</h1>       
        <p>더 넓은 독서의 세계를 경험하실 수 있도록 열심히 기능을 개발중이에요.<br/>곧 다시 만나요!</p>
        <div className={styles.btn_div}>
          <button onClick={() => setState(false)}>확인</button>
        </div>
      </div>
    </Modal>
  );
}

export const ExModal = () => {
  
}