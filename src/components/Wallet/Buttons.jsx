import React from 'react';
import styles from './Wallet.module.css';
import PropTypes from 'prop-types';

function Buttons({ setChangeType, setWalletRate }) {
  const onChangingButton = () => {
    setChangeType();
    setWalletRate();
  };

  return (
    <div className={styles.Buttons}>
      <button onClick={onChangingButton}>
        Поменять <br />
        местами
      </button>
      <button className={styles.Buttons__submit}>
        Отправить <br />
        заявку
      </button>
    </div>
  );
}

Buttons.propTypes = {
  setChangeType: PropTypes.func,
  setWalletRate: PropTypes.func,
};

export default Buttons;
