const ConvertLib = artifacts.require("ConvertLib");
const HodlCoin = artifacts.require("HodlCoin");
const HodlCoinOZ = artifacts.require("HodlCoinOZ");

module.exports = function (deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, HodlCoin);
  deployer.deploy(HodlCoin);
  deployer.deploy(HodlCoinOZ);
};
