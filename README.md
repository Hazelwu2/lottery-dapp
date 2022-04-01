# Lottery Dapp
基於 React + Ethers.js + Wagmi 串接樂透 Solidity Dapp
![Lottery](./LotteryCover.png)

- [Rinkeby 合約](https://rinkeby.etherscan.io/address/0x104c71332295323c1a6264bb17907ff683d0def4)


## Contract

``` js
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.2;

contract Lottery {
    address payable[] public players;
    address public lastWinner;
    address public manager;

    constructor() {
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value == 0.1 ether);
        players.push(payable(msg.sender));
    }

    function getBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function random() public view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players.length)));
    }

    function pickWinner() public {
        require(msg.sender == manager);

        uint r = random();
        address payable winner;
        uint index = r % players.length;
        winner = players[index];

        lastWinner = winner;
        winner.transfer(getBalance());
        players = new address payable[](0);
    }
}
```


## 安裝
本專案採自 Create React App [Create React App](https://github.com/facebook/create-react-app)


``` bash
$cd lottery-dapp
$yarn install
$yarn start
```

## 套件
使用以下套件
- [Create React App](https://github.com/facebook/create-react-app)
- [Wagmi React Hook](https://wagmi.sh/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [sweetalert2](https://sweetalert2.github.io/)