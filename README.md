# Instructions on setting up project

## 1. Creating Local Test Network

- Ganache: Create workspace via Quickstart, go to settings and add truffle-config.js path via 'Add Project' button. Proceed by clicking 'Save and Restart' button
- run truffle migrate

## 2. Making Changes to Routes.js

- After migrating contracts to ganache local network, make sure to grab the public address and private key of the first address listed in Ganache GUI and add them in.
- In Ganache GUI, go to Contracts Page, click contract titled 'HodlCoin' and copy the address. Past the address in Routes.js where hodlCoin is being declared.

## 3. Setting up Metamask Wallet

- Go to Metamask chrome extension, import account. Proceed to copy/paste the private key of account (bank account is first in Ganache GUI list, user can be any of the others).

## 4. Adding HodlCoin to Metamask Wallet:

- After migrating contracts to ganache, go to Ganache GUI's Transactions page
- Find transaction that has event name 'Encoded Event' & Contract 'HodlCoin'. Proceed to click event
- Copy the contract address and paste to Metamark Wallet via Import Token

## Additional Resources

- Truffle Quickstart Guide: https://trufflesuite.com/docs/truffle/quickstart.html
