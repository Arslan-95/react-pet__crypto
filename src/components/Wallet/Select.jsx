import React from 'react';
import styles from './Wallet.module.css';

function Select({ name, wallets = [], onChange, current }) {
  return (
    <select
      name={`form_${name}`}
      className={styles.select}
      value={current}
      onChange={onChange}
    >
      {wallets.map((wallet, index) => (
        <option key={`${wallet}_${index}`} value={wallet}>
          {wallet}
        </option>
      ))}
    </select>
  );
}

export default Select;
