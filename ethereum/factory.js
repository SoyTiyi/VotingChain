import web3 from './web3'
import compiledFactory from './build/VotingFactory.json'

const factory = new web3.eth.Contract(
  compiledFactory.abi,
  '0x6dE4C831D734EA0a08Df13f97270B1798E023Fc1',
)

export default factory
