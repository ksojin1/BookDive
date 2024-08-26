import React, { useState } from "react";
import styles from './Navigation.module.scss';

const NAV_WIDTH = 260;
export const Navigation = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  return (
    <>
    <div className={styles.menu_btn_div} style={{ width: `${NAV_WIDTH}px` }}>
      <span className="material-symbols-outlined" onClick={() => setNavOpen(!navOpen)}>menu</span>
      <h1>BOOKDIVE</h1>
    </div>
    <div className={styles.menu_div} 
      style={{ width: `${NAV_WIDTH}px`, left: navOpen ? '0px' : `-${NAV_WIDTH}px` }}>
      <ul>
        <li>
          <div>
            <span className="material-symbols-outlined">home</span>
            <h3>홈</h3>
          </div>
          <ul>
            <li>
              <p>책과의 대화</p>
            </li>
            <li>
              <p>책의 연장선</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    </>
  );
}