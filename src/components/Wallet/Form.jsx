import React from 'react';
import styles from './Wallet.module.css';
import Select from './Select';
import ValueInput from './ValueInput';

function Form(props) {
  const {
    wallets,
    type,
    setCurrentWallet,
    setCurrentValue,
    value,
    setWalletRate,
    currentWallets,
    changeType,
  } = props;

  const onSelectChange = (event) => {
    const current = event.currentTarget.value;
    setCurrentWallet(current, type);
    setWalletRate({ ...currentWallets, [type]: current }, changeType);
  };

  const onInputChange = (event) => {
    const value = event.currentTarget.value;
    setCurrentValue(value, type);
  };

  return (
    <div className={styles.Form}>
      <Select name={type} wallets={wallets} current={currentWallets[type]} onChange={onSelectChange} />
      <ValueInput onChange={onInputChange} value={value} />
    </div>
  );
}

export default Form;
