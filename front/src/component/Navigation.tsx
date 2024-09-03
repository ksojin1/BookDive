import React, { useEffect, useState } from "react";
import styles from './Navigation.module.scss';
import { useLocation, useNavigate } from "react-router-dom";
import { NAV_WIDTH } from "../App";
import { useAction, useUserInfo } from "../redux";
import { PreModal } from "../page/Main";
import { Modal } from "./Modal";

export const Navigation = ({ navOpen, setNavOpen } : { navOpen: boolean, setNavOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [preModalOpen, setPreModalOpen] = useState<boolean>(false);
  const [newChatModal, setNewChatModal] = useState<boolean>(false);

  const handleNewChatClick = () => {
    setNewChatModal(true);
  }
  
  // useEffect(() => {
  //   setNavOpen(false);
  // }, [location.pathname]);

  return (
    <>
    { newChatModal && <NewChatModal setState={setNewChatModal}/>}
    { preModalOpen && <PreModal setState={setPreModalOpen}/> }
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
              <span className="material-symbols-rounded" onClick={handleNewChatClick}>edit_square</span>
            </div>
          )}
        </li>
        <li className={location.pathname.includes('extension') ? styles.crt_menu : ''} onClick={() => setPreModalOpen(true)}>
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

// 새로운 대화
export const NewChatModal = ({ setState }: { setState: React.Dispatch<React.SetStateAction<boolean>> }) => {

  const confirmFnc = () => {
    window.location.href = `${process.env.PUBLIC_URL}/chat`;
  }

  return (
    <Modal setState={setState} width={556}>
      <div className={styles.modal_container}>
        <h1>새로운 대화를 시작할까요?</h1>       
        <p>지금까지 나눈 대화기록은 모두 삭제됩니다.</p>
        <div className={styles.btn_div}>
          <button className={styles.cancel_btn} onClick={() => setState(false)}>취소</button>
          <button className={styles.confirm_btn} onClick={confirmFnc}>다시 시작</button>
        </div>
      </div>
    </Modal>
  );
}