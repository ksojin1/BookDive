import React, { useEffect } from "react";
import styles from './Extension.module.scss';
import { useInputBox } from "../hook/useInputBox";

export const Extension = () => {

  const { setStatus, setPlaceholder, setValue } = useInputBox();

  useEffect(() => {
    setValue('');
    setStatus('enabled');
    setPlaceholder('여기에 프롬프트를 입력해 주세요.');
  }, []);

  return (
    <div className={styles.container}>
    </div>
  );
}