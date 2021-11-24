const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

const compiledVotingFactory = require('../ethereum/build/VotingFactory.json')
const compiledVoting = require('../ethereum/build/Voting.json')

let accounts
let factory
let votingAddress
let voting

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  factory = await new web3.eth
    .Contract(compiledVotingFactory.abi)
    .deploy({ data: compiledVotingFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: '1000000' });

  await factory.methods.createVoting().send({
    from: accounts[0],
    gas: '1000000',
  });
  
  [votingAddress] = await factory.methods.getDeployedVoting().call();

  voting = await new web3.eth.Contract(compiledVoting.abi, votingAddress);
})

describe("Voting", () => {
    it("Deploying Voting Factory and Factory",() => {
        assert.ok(factory.options.address)
        assert.ok(voting.options.address)
    })

    it("Test manager address with web3 getAccounts", async () => {
        const manager = await voting.methods.manager().call();
        assert.equal(accounts[0], manager)
    })

    it("Test add candidate", async () => {
        await voting.methods.addCandidate("studies", "description", false).send({
            from: accounts[0],
            gas: "1000000"
        })

        const candidateCount = await voting.methods.getCandidatesCount().call();
        console.log(candidateCount,'Count')
        assert( candidateCount > 0)
    })

    it("Test single account for candidates", async () => {
        try {
            await voting.methods.addCandidate("studies", "description", false).send({
                from: accounts[0],
                gas: "1000000"
            })
    
            await voting.methods.addCandidate("studies", "description", false).send({
                from: accounts[0],
                gas: "1000000"
            })
            assert(false)
        } catch (error) {
            assert(error)
        }
    })

    it("Test vote", async () => {
        await voting.methods.addCandidate("studies", "description", false).send({
            from: accounts[0],
            gas: "1000000"
        })

        await voting.methods.addVote(0).send({
            from: accounts[0],
            gas: "1000000"
        })

        const votesCount = await voting.methods.getVotesCount().call()

        assert(votesCount > 0)
    })
})
