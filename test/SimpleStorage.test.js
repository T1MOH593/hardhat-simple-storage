const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace")

describe("SimpleStorage", function () {
    let simpleStorageFactory, simpleStorage
    const personName = "Vlad"
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

        console.log("Deploying contract...")

        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Should start with favouriteNumber = 0", async function () {
        const expectedValue = "0"
        const currentValue = await simpleStorage.favouriteNumber(personName)

        assert.equal(currentValue.toString(), expectedValue)
    })

    it("Should update favourite number of person", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.addPerson(
            expectedValue,
            personName
        )
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.favouriteNumber(personName)

        assert.equal(currentValue.toString(), expectedValue)
    })
})
