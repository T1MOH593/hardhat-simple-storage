const { task } = require("hardhat/config")

task("block-number", "shows the number of current block").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number is ${blockNumber}`)
    }
)
