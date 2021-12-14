## Instructions on setting up test network:

- Ganache: Create workspace via Quickstart
- run truffle migrate
- make sure your metamask wallet is connected to the ganache network & you're using one of the addresses provided by the network in order to gain ETH funds (excluding first address a.k.a. 'bank account')

## Making Changes to App.js

- After migrating contracts to ganache local network, make sure to grab the public/private keys of the first address and add them in.

## Adding HodlCoin to Metamask Wallet:

- After migrating contracts to ganache, go to Ganache GUI's Transactions page
- Find transaction that has event name 'Encoded Event' & Contract 'HodlCoin'. Proceed to click event
- Copy the contract address and paste to Metamark Wallet via Import Token

## Additional Resources

- Truffle Quickstart Guide: https://trufflesuite.com/docs/truffle/quickstart.html
