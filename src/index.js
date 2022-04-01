import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider as WagmiProvider } from 'wagmi'
import { providers } from "ethers";

const provider = ({ chainId }) =>
  new providers.InfuraProvider(4, process.env.REACT_APP_INFURA_ID)

ReactDOM.render(
  <React.StrictMode>
    <WagmiProvider provider={provider}>
      <App />
    </WagmiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
