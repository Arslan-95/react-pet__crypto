const initialState = {
  note: {
    wallets: ['RUB', 'USD', 'EUR'],
    value: 0,
    current: 'RUB',
  },
  crypto: {
    wallets: ['BTC', 'BNB', 'ETH'],
    value: 0,
    current: 'BTC',
  },
  walletRate: {},
  changeType: 'buy',
};

const wallet = (state = initialState, action) => {
  const { formType } = action || 0;
  const secondType = formType === 'note' ? 'crypto' : 'note';

  switch (action.type) {
    case 'SET_CURRENT_WALLET': {
      return {
        ...state,
        [formType]: {
          ...state[formType],
          current: action.wallet,
        },
      };
    }
    case 'SET_WALLET_VALUE': {
      const amount = state.walletRate;
      const value = action.value;
      let finalValue =
        secondType === 'crypto' ? value / amount : value * amount;
      if (
        secondType === 'crypto' &&
        state.note.current === 'RUB' &&
        value < 5
      ) {
        finalValue = 0;
      }

      return {
        ...state,
        [formType]: {
          ...state[formType],
          value,
        },
        [secondType]: {
          ...state[secondType],
          value:
            state['walletRate'] > 0 ? finalValue : state[secondType]['value'],
        },
      };
    }
    case 'SET_WALLET_RATE': {
      const amount = state.walletRate;
      const value = state.crypto.value;

      return {
        ...state,
        walletRate: action.value,
        note: {
          ...state.note,
          value: !isNaN(value * amount) ? value * amount : 0,
        },
        crypto: {
          ...state.crypto,
          value,
        },
      };
    }
    case 'SET_CHANGE_TYPE': {
      const amount = state.walletRate;
      const value = state.crypto.value;
      return {
        ...state,
        changeType: state.changeType === 'buy' ? 'sell' : 'buy',
        note: {
          ...state.note,
          value: value * amount,
        },
        crypto: {
          ...state.crypto,
          value,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default wallet;
