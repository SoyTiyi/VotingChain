import web3 from './web3'
import compiledFactory from './build/VotingFactory.json'

const factory = new web3.eth.Contract(
  compiledFactory.abi,
  '0x08CE920188dA009478BF798A7327b6452e2a3B10',
)

export default factory
