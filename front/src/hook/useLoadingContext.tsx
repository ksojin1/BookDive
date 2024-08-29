import Lottie from 'lottie-react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import animationData from './Loading_bookdive.json';

interface LoadingState {
  setLoading: (value: boolean) => void,
  loading: boolean,
};

export const LoadingContext = createContext<LoadingState>({
  setLoading: (value: boolean) => {},
  loading: false,
});

export function LoadingContextProvider({ children }: { children: React.ReactNode}) {
  const [loading, setLoading] = useState<boolean>(false);

  const [timeoutState, setTimeoutState] = useState<boolean>(false);

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setTimeoutState(true);
    }, 1000);

    return () => clearTimeout(timeout);

  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      { loading && timeoutState &&
        <div style={{
          position: 'absolute',
          zIndex: '999',
          width: '100%',
          height: '100vh',
          display: 'flex',
          top: '0px',
          left: '0px',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Lottie style={{ width: '52px', height: '52px' }} animationData={animationData} loop={true}/>
        </div>
      }
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoadingContext = () => {
  const { loading, setLoading } = useContext(LoadingContext);
  return { loading, setLoading };
}