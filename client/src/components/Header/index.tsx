import React from 'react';
import { NavLink } from "react-router-dom";
import { logoutAsyncAction, selectUser } from '../../store/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './index.module.scss'

export const Header = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch()

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <NavLink to='/' className={styles.link}>
            <h3 className={styles.htag}>
              Home
            </h3> 
        </NavLink>
        {user.isAuth ? (
          <button onClick={() => dispatch(logoutAsyncAction())} className={styles.btn}>
            <h3>
              Log out
            </h3> 
          </button>
          ) : (
            <NavLink to='/account/login' className={styles.link}>
              <h3 className={styles.htag}>
                Log in
              </h3> 
            </NavLink>
        )}
        <NavLink to='/create' className={styles.link}>
            <h3 className={styles.htag}>
              Create post
            </h3> 
        </NavLink>
      </div>
    </header>
)
};
