import web3 from './web3'
import compiledFactory from './build/VotingFactory.json'

const factory = new web3.eth.Contract(
  compiledFactory.abi,
  '0xad8722C319f7C15f7aaC0e93582B09Af3cDd3eD5',
)

export default factory
