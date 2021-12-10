const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "platformer/client/contracts"),
  networks: {
    // develop: {
    //   port: 8545,
    // },
    development: {
      host: "127.0.0.1", // was "localhost"
      port: 7545,
      network_id: "*", // was "5777"
    },
  },
  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};
