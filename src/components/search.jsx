import React from 'react';
import styles from '../styles/search.module.css'; 
import img from '../img/search.svg';

export const Search = () => {
  return (
    <label htmlFor="search" className={styles.label}>
      <input type="search" id="text" className={styles.input} />
      <img src={img} className={styles.img} alt="Search icon" />
    </label>
  );
};


