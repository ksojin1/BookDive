import React, { useEffect, useRef } from "react";
import styles from './InputBox.module.scss';
import { useInputBox } from "../hook/useInputBox";
import { NAV_WIDTH } from "../App";
import { useUserInfo } from "../redux";
import { MAX_BUBBLE } from "../page/Chat";
import { useLocation } from "react-router-dom";

export const InputBox = ({ navOpen } : { navOpen: boolean }) => {

  const user = useUserInfo();
  const { value, setValue, placeholder, setStatus, status, queryList, setSendFlag } = useInputBox();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value !== '') {
      setSendFlag(true);
    }
  }

  useEffect(() => { 
    if (status === 'enabled' && inputRef.current && !inputRef.current.disabled) {
      inputRef.current.focus();
    }
  }, [status]);

  useEffect(() => {
    if (value.length > 30) {
      setStatus('error');
    }
  }, [value]);

  return (
    <div className={styles.container} style={{ paddingLeft: navOpen ? `${NAV_WIDTH}px` : '0px'}}>
      {queryList.length > 0 && (
        <div className={styles.queryList_div}>
          <h4>
            <span className="material-symbols-rounded">verified</span>
            추천 답변
          </h4>
          <ul>
            {queryList.map((query, idx) => {
              return (
                <li key={idx}>
                  <p>{query}</p>
                  <span onClick={() => setValue(query)}>선택</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {user && user.bubbleCnt >= MAX_BUBBLE && 
        <div className={styles.alert_div}>
          <h4>
            대화 한도에 도달했어요.
          </h4>
          <p>현재는 한 채팅에서 최대 {MAX_BUBBLE}번까지 대화할 수 있어요.
            <br/>더욱 깊이있는 대화를 하실 수 있도록 열심히 기능을 개발중이에요. 곧 다시 만나요!
          </p>
        </div>
      }
      <div id={(user && user.bubbleCnt >= MAX_BUBBLE) ? styles.disabled : styles[status]} className={styles.input_div}>
        {status !== 'disabled' && user && user.bubbleCnt < MAX_BUBBLE && (
          <div className={styles.text_length} style={{ color: value.length > 30 ? '#ff0000' : '#7f7f7f' }}>
            {value.length > 30 ? 30 : value.length}/30자 이내
          </div>
        )}
        {status === 'error' || status === 'disabled' || (user && user.bubbleCnt >= MAX_BUBBLE) ? (
          <span style={{ color: '#c9c9c9' }} className="material-symbols-rounded">send</span>
        ):(
          <span onClick={() => value !== '' && setSendFlag(true)} className="material-symbols-rounded">send</span>
        )}
        
        <input 
          ref={inputRef}
          value={value}
          disabled={status === 'disabled' || (user && user.bubbleCnt >= MAX_BUBBLE) ? true : false} style={value.length > 30 ? { border: '1px solid #ff0000' } : {}} 
          type="text" 
          onChange={handleTextChange} maxLength={31} placeholder={placeholder} 
          onKeyDown={handleKeyDown}
        />
        <p>BookDive는 인물 등에 관한 부정확한 정보를 표시할 수 있으므로 대답을 다시 한번 확인하세요.</p>
      </div>
    </div>
  );
}