## Instructions on setting up test network:

- Ganache: create workspace via adding truffle project (truffle-config.js file)
- run truffle migrate
- make sure your metamask wallet is connected to the ganache network & you're using one of the addresses provided by the network in order to gain ETH funds

## Adding HTT Token to Metamask Wallet:

- After migrating contracts to ganache, go to Ganache GUI's Transactions page
- Find transaction that has event name 'Encoded Event' & Contract 'HTTToken'. Proceed to click event
- Copy the contract address and paste to Metamark Wallet via Import Token

## Additional Resources

- Truffle Quickstart Guide: https://trufflesuite.com/docs/truffle/quickstart.html

## SIDE NOTES: CONTRACT

- Choice between ETH and HTT (Working with Eth First)
  What we want it to do:

1. Exchanging token for ETH (Ex. 1 token === 0.00001 ETH)
2. Transfer ETH from 'Bank' address to user address
