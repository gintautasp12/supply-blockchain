import Web3 from 'web3';
import { INFURA_RINKEBY_ENDPOINT, PRIVATE_KEY, CONTRACT_ADDRESS } from '../config';
import abi from '../contract/SupplyChain.abi';

class ContractProvider {
    getContract = () => {
        const web3 = new Web3(
            new Web3.providers.HttpProvider(INFURA_RINKEBY_ENDPOINT)
        );
        const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
        web3.eth.accounts.wallet.add(account);

        return new web3.eth.Contract(
            abi,
            CONTRACT_ADDRESS
        );
    }
}

export default new ContractProvider();
