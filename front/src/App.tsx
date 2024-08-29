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
import { LoadingContextProvider } from './hook/useLoadingContext';

export const NAV_WIDTH = 260;

function App() {

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

  const [navOpen, setNavOpen] = useState<boolean>(true);

  return (
    <div className={styles.container}>
      <InpuBoxProvider>
        <>
        <Navigation navOpen={navOpen} setNavOpen={setNavOpen}/>        
        <LoadingContextProvider>
        <div className={styles.content_div} style={navOpen ? { paddingLeft: `${NAV_WIDTH}px` } : { paddingLeft: `0px` }}>
          <Routes>
            <Route path='/main' element={<Main/>}/>
            <Route path='/chat' element={<Chat/>}/>
            <Route path='/extension' element={<Extension/>}/>
          </Routes>
          <InputBox navOpen={navOpen}/>
        </div>
        </LoadingContextProvider>
        </>
      </InpuBoxProvider>
    </div>
  );
}