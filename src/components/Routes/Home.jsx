import React from 'react';
import { Form, Buttons } from '../';
import { connect } from 'react-redux';
import axios from 'axios';

const styles = {
  Home: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  Forms: {
    display: 'flex',
    margin: 'auto',
  },
};

function Home(props) {
  const {
    data,
    setCurrentWallet,
    setCurrentValue,
    setWalletRate,
    setChangeType,
  } = props;

  const { note, crypto } = data;
  const currentWallets = { note: note.current, crypto: crypto.current };

  React.useEffect(() => {
    setWalletRate(currentWallets, data.changeType);
  }, []);

  const NoteForm = () => {
    return (
      <Form
        {...note}
        type="note"
        setCurrentWallet={setCurrentWallet}
        setCurrentValue={setCurrentValue}
        setWalletRate={setWalletRate}
        currentWallets={currentWallets}
      />
    );
  };

  const CryptoForm = () => {
    return (
      <Form
        {...crypto}
        type="crypto"
        setCurrentWallet={setCurrentWallet}
        setCurrentValue={setCurrentValue}
        setWalletRate={setWalletRate}
        currentWallets={currentWallets}
      />
    );
  };

  const changeTypeTitle = data.changeType === 'buy' ? 'Покупка' : 'Продажа';
  
  return (
    <>
      <h1>{changeTypeTitle}</h1>
      <div style={styles.Home}>
        <div style={styles.Forms}>
          {data.changeType === 'buy' ? NoteForm() : CryptoForm()}
          <Buttons
            setChangeType={setChangeType}
            setWalletRate={() => {
              setWalletRate(currentWallets, data.changeType);
            }}
          />
          {data.changeType === 'buy' ? CryptoForm() : NoteForm()}
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  const { note, crypto } = state.wallet;

  return {
    data: {
      note: {
        wallets: note.wallets,
        value: note.value,
        current: note.current,
      },
      crypto: {
        wallets: crypto.wallets,
        value: crypto.value,
        current: crypto.current,
      },
      changeType: state.wallet.changeType,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentWallet: (wallet, formType) => {
      dispatch({ type: 'SET_CURRENT_WALLET', wallet, formType });
    },
    setCurrentValue: (value, formType) => {
      dispatch({ type: 'SET_WALLET_VALUE', value, formType });
    },
    setWalletRate: (currentWallets, changeType = 'buy') => {
      const { note, crypto } = currentWallets;
      const url = `https://api.coinbase.com/v2/prices/${crypto}-${note}/${changeType}`;

      axios
        .get(url)
        .then((res) => {
          dispatch({
            type: 'SET_WALLET_RATE',
            value: res.data.data.amount,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: 'SET_WALLET_RATE',
            value: 0,
          });
        });
    },
    setChangeType: () => {
      dispatch({ type: 'SET_CHANGE_TYPE' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
