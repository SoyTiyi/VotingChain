import web3 from './web3'
import compiledFactory from './build/VotingFactory.json'

const factory = new web3.eth.Contract(
  compiledFactory.abi,
  '0x927D0f1a7ed11f6DD9C3eAd6164df20d4273a59A',
)

export default factory
