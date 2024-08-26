import React from "react";
import styles from './Main.module.scss';
import { Route, useNavigate } from "react-router-dom";

export const Main = () => {

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.text_div}>
          <h1>안녕하세요</h1>
          <h2>최근에 읽으신 책에 대해<br/>어떤 이야기를 나누고 싶으신가요?</h2>
          <span>예시보기</span>
        </div>
        <div className={styles.select_div}>
          <div onClick={() => navigate(`${process.env.PUBLIC_URL}/dialog`)}>
            <h3>책과의 대화<span className="material-symbols-outlined">chevron_right</span></h3>
            <p>등장인물과 저자와 대화로<br/>독서의 깊이를 더해요</p>
          </div>
          <div onClick={() => navigate(`${process.env.PUBLIC_URL}/extension`)}>
            <h3>책의 연장선<span className="material-symbols-outlined">chevron_right</span></h3>
            <p>책을 새로운 시각으로 살펴보며<br/>독서의 폭을 확장해요</p>
          </div>
        </div>
      </div>
    </div>
  );
}