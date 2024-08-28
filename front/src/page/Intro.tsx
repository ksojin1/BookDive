import React from "react";
import styles from './Intro.module.scss';
import { useNavigate } from "react-router-dom";

export const Intro = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div>
        인트로페이지
        <button onClick={() => navigate(`${process.env.PUBLIC_URL}/main`)}>시작하기</button>
      </div>
    </div>
  );
}