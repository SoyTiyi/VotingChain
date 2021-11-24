const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const compiledFactory = require('./build/VotingFactory.json')

const provider = new HDWalletProvider(
  'prosper lobster nation desert aware child rebel patrol vehicle depth moon produce',
  // remember to change this to your own phrase!
  'https://rinkeby.infura.io/v3/bb52c15fce404eb7a44d127574c3aae5',
  // remember to change this to your own endpoint!
)
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  console.log('Attempting to deploy from account', accounts[0])

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: '1000000', from: accounts[0] })

  console.log('Contract deployed to', result.options.address)
  provider.engine.stop()
}
deploy()

