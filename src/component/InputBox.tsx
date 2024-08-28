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
  }, [value]);

  return (
    <div className={styles.container}>
      <div id={styles[status]} className={styles.input_div}>
        {status !== 'disabled' && <div className={styles.text_length}>{value.length}/30자 이내</div>}
        {value.length > 30 || status === 'error' || status === 'disabled' ? (
          <span id={styles.disabled} className="material-symbols-rounded">send</span>
        ):(
          <span className="material-symbols-rounded">send</span>
        )}
        
        <input style={value.length > 30 ? { border: '1px solid #ff0000' } : {}} type="text" onChange={handleTextChange} maxLength={31} placeholder={placeholder} />
      </div>
      <p>BookDive는 인물 등에 관한 부정확한 정보를 표시할 수 있으므로 대답을 다시 한번 확인하세요.</p>
    </div>
  );
}