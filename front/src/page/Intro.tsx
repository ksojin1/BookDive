import React from "react";
import styles from './Intro.module.scss';
import { useNavigate } from "react-router-dom";

export const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={`${process.env.PUBLIC_URL}/img/Logo_Asset@2x.png`}/>
        <h4>BOOKDIVE</h4>
      </div>
      <div className={styles.content}>
        <h1>Ready to Dive In?</h1>
        <p>북다이브와 대화를 시작해, 책 속의 깊은 바다로 다이빙해보세요!</p>
        <button onClick={() => navigate(`${process.env.PUBLIC_URL}/main`)}>시작하기</button>
        <img src={`${process.env.PUBLIC_URL}/img/intro.svg`}/>
      </div>
    </div>
  );
}