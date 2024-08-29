import React, { useEffect, useState } from "react";
import styles from './Navigation.module.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_WIDTH } from "../App";

export const Navigation = ({ navOpen, setNavOpen } : { navOpen: boolean, setNavOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   setNavOpen(false);
  // }, [location.pathname]);

  return (
    <>
    <div className={styles.menu_btn_div} style={{ width: `${NAV_WIDTH}px` }}>
      <span className="material-symbols-outlined" onClick={() => setNavOpen((prev) => !prev)}>menu</span>
      <h1>BOOKDIVE</h1>
    </div>
    <div className={styles.menu_div} 
      style={{ width: `${NAV_WIDTH}px`, left: navOpen ? '0px' : `-${NAV_WIDTH}px` }}>
      <div className={styles.home} onClick={() => navigate(`${process.env.PUBLIC_URL}/main`)}>
        <span className="material-symbols-rounded">home</span>
        <h3>홈</h3>
      </div>
      <ul className={styles.menu_list}>
        <li className={location.pathname.includes('chat') ? styles.crt_menu : ''} onClick={() => navigate(`${process.env.PUBLIC_URL}/chat`)}>
          <p>책과의 대화</p>
          {location.pathname.includes('chat') && (
            <div className={styles.icon_div}>
              <p>대화중</p>
              <span className="material-symbols-rounded">edit_square</span>
            </div>
          )}
        </li>
        <li className={location.pathname.includes('extension') ? styles.crt_menu : ''} onClick={() => navigate(`${process.env.PUBLIC_URL}/extension`)}>
          <p>책의 연장선</p>
          {location.pathname.includes('extension') && (
            <div className={styles.icon_div}>
              <p>대화중</p>
              <span className="material-symbols-rounded">edit_square</span>
            </div>
          )}
        </li>
      </ul>
    </div>
    </>
  );
}