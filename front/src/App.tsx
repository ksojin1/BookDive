import React, { useEffect, useState } from 'react';
import styles from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import { Intro } from './page/Intro';
import { Main } from './page/Main';
import { Chat } from './page/Chat';
import { Extension } from './page/Extension';
import { Navigation } from './component/Navigation';
import { InputBox } from './component/InputBox';
import { InpuBoxProvider } from './hook/useInputBox';
import { getCookie, setCookie } from './cookie/cookies';
import { User } from './type';
import { useAction } from './redux';

export const NAV_WIDTH = 260;

function App() {

  const { saveUser } = useAction();

  const checkUser = () => {
    const cookie = getCookie();
    if (cookie) { // 기존아이디 redux 저장
      const userInfo: User = {
        id: cookie.userId,
        bubbleCnt: 0,
        endAt: cookie.endAt,
      }
      saveUser(userInfo);
    } else { // 유저아이디 생성
      const userId: string = `${Math.floor(new Date().getTime()+Math.random())}`;
      const endAt = setCookie(userId);
      saveUser({
        id: userId,
        bubbleCnt: 0,
        endAt: endAt,
      });
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="App">
        <Routes>
          <Route path='/' element={<Intro />}/>
          <Route path='/*' element={<MainRouter/>} />
        </Routes>
    </div>
  );
}

export default App;

const MainRouter = () => {

  const [navOpen, setNavOpen] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <InpuBoxProvider>
        <>
        <Navigation navOpen={navOpen} setNavOpen={setNavOpen}/>        
        <div className={styles.content_div} style={navOpen ? { paddingLeft: `${NAV_WIDTH}px` } : { paddingLeft: `0px` }}>
          <Routes>
            <Route path='/main' element={<Main/>}/>
            <Route path='/chat' element={<Chat/>}/>
            <Route path='/extension' element={<Extension/>}/>
          </Routes>
          <InputBox navOpen={navOpen}/>
        </div>
        </>
      </InpuBoxProvider>
    </div>
  );
}