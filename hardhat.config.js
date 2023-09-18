require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  allowUnlimitedContractSize:true,
  gas:12000000000000,
  hardhat:{
    blockGasLimit:100000000000000000000000000000000000,
    allowUnlimitedContractSize:true
  },
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  settings:{
    optimizer:{
      enabled:true,
      runs:1
    }
  }
};
