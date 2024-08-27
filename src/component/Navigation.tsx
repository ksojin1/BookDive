import React, { useEffect, useState } from "react";
import styles from './Navigation.module.scss';
import { useLocation, useNavigate } from "react-router-dom";

const NAV_WIDTH = 260;
export const Navigation = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setNavOpen(false);
  }, [location.pathname]);

  return (
    <>
    <div className={styles.menu_btn_div} style={{ width: `${NAV_WIDTH}px` }}>
      <span className="material-symbols-outlined" onClick={() => setNavOpen(!navOpen)}>menu</span>
      <h1>BOOKDIVE</h1>
    </div>
    <div className={styles.menu_div} 
      style={{ width: `${NAV_WIDTH}px`, left: navOpen ? '0px' : `-${NAV_WIDTH}px` }}>
      <div className={styles.home} onClick={() => navigate(`${process.env.PUBLIC_URL}/main`)}>
        <span className="material-symbols-rounded">home</span>
        <h3>홈</h3>
      </div>
      <ul className={styles.menu_list}>
        <li className={location.pathname.includes('dialog') ? styles.crt_menu : ''} onClick={() => navigate(`${process.env.PUBLIC_URL}/dialog`)}>
          <p>책과의 대화</p>
          {location.pathname.includes('dialog') && <span>대화중</span>}
        </li>
        <li className={location.pathname.includes('extension') ? styles.crt_menu : ''} onClick={() => navigate(`${process.env.PUBLIC_URL}/extension`)}>
          <p>책의 연장선</p>
          {location.pathname.includes('extension') && <span>대화중</span>}
        </li>
      </ul>
    </div>
    </>
  );
}