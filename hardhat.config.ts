import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// https://github.com/projectsophon/hardhat-circom
import "hardhat-circom";
// environment variables
require("dotenv").config();
// circuits
import circuits = require('./circuits.config.json')

// set env var to the root of the project
process.env.BASE_PATH = __dirname;

const { AMOY_URL, SEPOLIA_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

// tasks
import "./tasks/newcircuit.ts"

const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    amoy: {
      url: AMOY_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
      },
      {
        version: "0.6.11",
      },
    ],
  },
  circom: {
    // (optional) Base path for input files, defaults to `./circuits/`
    inputBasePath: "./circuits",
    // (required) The final ptau file, relative to inputBasePath, from a Phase 1 ceremony
    ptau: "powersOfTau28_hez_final_12.ptau",
    // (required) Each object in this array refers to a separate circuit
    circuits: JSON.parse(JSON.stringify(circuits)),
  },
};

export default config;
