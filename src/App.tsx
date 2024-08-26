import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { Route, Routes } from 'react-router-dom';
import { Intro } from './page/Intro';
import { Main } from './page/Main';
import { Dialog } from './page/Dialog';
import { Extension } from './page/Extension';
import { Navigation } from './component/Navigation';
import { InputBox } from './component/InputBox';

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
  return (
    <div className={styles.container}>
      <Navigation />
      <Routes>
        <Route path='/main' element={<Main/>}/>
        <Route path='/dialog' element={<Dialog/>}/>
        <Route path='/extension' element={<Extension/>}/>
      </Routes>
      <InputBox/>
    </div>
  );
}