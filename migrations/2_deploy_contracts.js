const ConvertLib = artifacts.require("ConvertLib");
const HodlCoin = artifacts.require("HodlCoin");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, HodlCoin);
  deployer.deploy(HodlCoin);
};
