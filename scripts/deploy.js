const { ethers, run, network } = require("hardhat")

async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    console.log("Deploying contract...")

    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log(`Address: ${simpleStorage.address}`)

    if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying...")
        await simpleStorage.deployTransaction.wait(4)
        await verify(simpleStorage.address, [])
    }

    const currentFavouriteNumber = await simpleStorage.favouriteNumber("Vlad")
    console.log(
        `Current favourite number is ${currentFavouriteNumber.toString()}`
    )

    const transactionResponse = await simpleStorage.addPerson("10", "Vlad")
    const transactionReceipt = await transactionResponse.wait(1)

    const newFavouriteNumber = await simpleStorage.favouriteNumber("Vlad")
    console.log(`Now favourite number is ${newFavouriteNumber.toString()}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying deployed contract...")
    try {
        run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log("Verified!!!")
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        ProcessingInstruction.exit(1)
    })
