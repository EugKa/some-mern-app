import React, { useEffect } from 'react';
import {
  Routes,
  Route
} from "react-router-dom";
import { Header, RequireAuth } from './components';
import { Home, Account, CreatePage } from './pages';
import { checkAuthAsyncAction } from './store/features';
import { useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(localStorage.getItem('token')) {
      dispatch(checkAuthAsyncAction())
    }
  },[dispatch])

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/account/login" element={<Account />}/>
        <Route path="/account/registration" element={<Account />}/>
        <Route
            path="/create"
            element={
              <RequireAuth>
                <CreatePage />
              </RequireAuth>
            }
          />
    </Routes>
    </div>
  );
}

export default App;
