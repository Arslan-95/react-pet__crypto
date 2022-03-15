import React from 'react';
import styles from './Wallet.module.css';

function ValueInput({ value, onChange }) {
  return (
    <div>
      <label>
        Количество
        <input
          type="number"
          value={value}
          onChange={onChange}
          className={styles.input}
        />
      </label>
    </div>
  );
}

export default ValueInput;
