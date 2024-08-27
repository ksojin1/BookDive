import React, { useEffect } from "react";
import styles from './InputBox.module.scss';
import { useInputBox } from "../hook/useInputBox";

export const InputBox = () => {

  const { value, setValue, placeholder, setStatus, status } = useInputBox();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);
  }

  useEffect(() => {
    if (value.length > 30) {
      setStatus('error');
    }
  }, [value]);

  return (
    <div className={styles.container}>
      <div id={styles[status]} className={styles.input_div}>
        {status !== 'disabled' && <div className={styles.text_length}>{value.length < 30 ? value.length : 30}/30자 이내</div>}
        <span className="material-symbols-rounded">send</span>
        <input className={status === 'error' ? styles.input_error : ''} type="text" onChange={handleTextChange} maxLength={30} placeholder={placeholder} />
      </div>
      <p>BookDive는 인물 등에 관한 부정확한 정보를 표시할 수 있으므로 대답을 다시 한번 확인하세요.</p>
    </div>
  );
}