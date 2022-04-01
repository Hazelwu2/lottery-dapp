import React, { useEffect, useState } from "react";
import './App.css';
import { useContractWrite, useContractRead, useConnect } from 'wagmi'
import { lottery } from './contract/contract'
import { useProvider, useAccount } from 'wagmi'
import { ethers } from 'ethers'
import { handleError } from './handleError';
// Swal
import Swal from 'sweetalert2'

// Components
import { ConnectWallet } from './components/WalletConnect'


function App() {
  // 設定測試網路
  const provider = useProvider();
  const [{ }] = useConnect()


  const [balance, setBalance] = useState(0)
  const [player, setPlayer] = useState(0)


  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  })
  const [{ }, getBalance] = useContractRead(
    {
      addressOrName: lottery.address,
      contractInterface: lottery.abi,
      signerOrProvider: provider,
    },
    'getBalance',
  )

  const [{ }, getPlayers] = useContractRead(
    {
      addressOrName: lottery.address,
      contractInterface: lottery.abi,
      signerOrProvider: provider,
    },
    'getPlayers',
  )
  const [{ }, enter] = useContractWrite(
    {
      addressOrName: lottery.address,
      contractInterface: lottery.abi,
      signerOrProvider: provider,
    },
    'enter',
  )
  const [{ }, pickWinner] = useContractWrite(
    {
      addressOrName: lottery.address,
      contractInterface: lottery.abi,
      signerOrProvider: provider,
    },
    'pickWinner',
  )

  // 取得玩家總人數
  const handleGetPlayers = async () => {
    const { data, error } = await getPlayers()
    setPlayer(data.length)

    if (error) handleError(error)
  }

  // 取得合約餘額
  const getBalanceValue = async () => {
    const { data, error } = await getBalance()
    // 返回的資料為 16進位 data._hex: "0x470de4df820000"
    // 用 formatEther 將 16進位轉為 10 進位
    const balance = ethers.utils.formatEther(data._hex)

    setBalance(balance);

    if (error) handleError(error)
  }


  useEffect(() => {
    // 取得本期玩家人數
    handleGetPlayers()

    // 取得合約餘額
    getBalanceValue()
  }, [])

  // ETH 0.01
  const price = ethers.utils.parseUnits("0.01", 18);

  const handleEnter = async () => {
    const { data, error } = await enter({
      args: [],
      overrides: {
        gasLimit: 203000,
        gasPrice: 60000000000,
        value: price,
      },
    });

    console.log('handleEnter', data);

    if (data && data.hash) {
      Swal.fire({
        icon: 'success',
        text: '等待交易執行中',
        title: '成功'
      })
    }

    if (error) handleError(error)
  };

  // 開獎
  const handlePickWinner = async () => {
    const { data, error } = await pickWinner({
      args: [],
      overrides: {
        gasLimit: 203000,
        gasPrice: 60000000000,
      },
    })

    if (data) {
      Swal.fire({
        icon: 'success',
        text: '等待交易執行中',
        title: '成功'
      })
    }

    if (error) handleError(error)
  }


  return (
    <div className="App">
      <div className="container">
        <h2>幸運樂透
        </h2>
        <a href="https://rinkeby.etherscan.io/address/0x104c71332295323c1a6264bb17907ff683d0def4">
          合約地址
        </a>
        <div className="row">
          <div className="col-sm-12">
            <div className="first-area">
              {
                !accountData?.address ?
                  <ConnectWallet /> :
                  <div>
                    {accountData.address}
                    <button
                      className="btn btn-primary"
                      onClick={disconnect}>
                      登出
                    </button>
                  </div>

              }

              <div>
                <button className="btn btn-danger" onClick={handleEnter}>
                  參加樂透
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="box flex-justify flex-column">
              <div className="title">合約發起者具有開獎資格</div>
              <div className="number">
                <button className="btn btn-primary" onClick={handlePickWinner}>開獎</button>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="box">
              <div className="title">累積獎金 ETH</div>
              <div className="number">{balance} </div>
            </div>
          </div>

          <div className="col-sm-4">
            <div className="box">
              <div className="title">本期投入人數</div>
              <div className="number">{player}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
