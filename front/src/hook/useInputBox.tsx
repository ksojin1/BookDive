import React, { createContext, useContext, useState } from "react";

interface InputBoxState {
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
  status: 'enabled' | 'focused' | 'error' | 'disabled'
  setStatus: React.Dispatch<React.SetStateAction<'enabled' | 'focused' | 'error' | 'disabled'>>,
  placeholder: string,
  setPlaceholder: React.Dispatch<React.SetStateAction<string>>,
  queryList: string[],
  setQueryList: React.Dispatch<React.SetStateAction<string[]>>,
  sendFlag: boolean,
  setSendFlag: React.Dispatch<React.SetStateAction<boolean>>,
}

export const InputBoxContext = createContext<InputBoxState>({
  value: '',
  setValue: () => {},
  status: 'enabled',
  setStatus: () => {},
  placeholder: '',
  setPlaceholder: () => {},
  queryList: [],
  setQueryList: () => {},
  sendFlag: false,
  setSendFlag: () => {},
});

export const InpuBoxProvider = ({ children }: { children: React.ReactNode }) => {

  const [value, setValue] = useState<string>('');
  const [status, setStatus] = useState<'enabled' | 'focused' | 'error' | 'disabled'>('enabled');
  const [placeholder, setPlaceholder] = useState<string>('여기에 프롬프트를 입력해 주세요.');
  const [queryList, setQueryList] = useState<string[]>([]); // 추천 질문 3가지
  const [sendFlag, setSendFlag] = useState<boolean>(false);

  const contextValue: InputBoxState = { value, setValue, status, setStatus, placeholder, setPlaceholder, queryList, setQueryList, sendFlag, setSendFlag };

  return (
    <InputBoxContext.Provider value={contextValue}>
      {children}
    </InputBoxContext.Provider>
  );
}

export const useInputBox = () => {
  const context = useContext(InputBoxContext);
  if (!context) throw new Error('must be used within a RoundUpdateTriggerProvider');
  const { value, setValue, status, setStatus, placeholder, setPlaceholder, queryList, setQueryList, sendFlag, setSendFlag } = context;
  return { value, setValue, status, setStatus, placeholder, setPlaceholder, queryList, setQueryList, sendFlag, setSendFlag };
}