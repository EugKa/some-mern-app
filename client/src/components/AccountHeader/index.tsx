import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './index.module.scss'

export const AccountHeader = ({route}: {route: string}) => {
   return route === 'login' ? (
     <>
       <h1 className={styles.AccountHeaderTitle}>Log In</h1>
       <div className={styles.AccountHeaderSubTitle}>
         Don't have an account?
         <NavLink to='/account/registration' className={styles.AccountHeaderLink}>
           Sign Up
         </NavLink>
       </div>
     </>
   ) : (
     <>
       <h1 className={styles.AccountHeaderTitle}>Sign Up</h1>
       <div className={styles.AccountHeaderSubTitle}>
         Already have an account?
         <NavLink to='/account/login' className={styles.AccountHeaderLink}>
           Log In
         </NavLink>
       </div>
     </>
   )
 }