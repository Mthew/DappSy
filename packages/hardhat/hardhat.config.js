require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "RwkQNqMd21Spg4uU2fD9kPvdpUCPpLSL";
const GOERLY_PRIVATE_KEY =
  "7958f7181faf1f3c4c2ab8fb75533e7dce3a11c9929c4ff49eb34ea5b1d9c645";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLY_PRIVATE_KEY],
    },
  },
};
