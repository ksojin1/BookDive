import React, { useEffect } from "react";
import styles from './Modal.module.scss';

export const Modal = ({ children, width, setState }: {
  children: React.ReactNode,
  width: number,
  setState: React.Dispatch<React.SetStateAction<boolean>> | null,
}) => {

  return (
    <>
    <div className={styles.background} style={{ backgroundColor: `rgb(0, 0, 0, 0.3)` }}></div>
    <div className={styles.container} style={{ width: `${width}px` }} >
      <div className={styles.close_icon}>
        { setState ? <span className="material-symbols-outlined" onClick={() => setState(false)}>close</span> : <div></div> }
      </div>
      {children}
    </div>
    </>
  );
}