import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './components/Routes';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <>
      <Router>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Provider>
      </Router>
    </>
  );
}

export default App;
