const HodlCoin = artifacts.require("HodlCoin");

module.exports = function (deployer) {
  deployer.deploy(HodlCoin);
};