import axios from 'axios';
import 'dotenv/config';

const TENDERLY_ACCOUNT_SLUG = process.env.TENDERLY_ACCOUNT_SLUG;
const TENDERLY_PROJECT_SLUG = process.env.TENDERLY_PROJECT_SLUG;
const TENDERLY_ACCESS_KEY = process.env.TENDERLY_ACCESS_KEY;

const QUOTER_CONTRACT_ADDRESS = '0x0fc73040b26e9bc8514fa028d998e73a254fa76e';
const NETWORK_ID = '42161';

export const simulateTransaction = async (calldata: string) => {
    try {
        await axios.post(
            `https://api.tenderly.co/api/v1/account/${TENDERLY_ACCOUNT_SLUG}/project/${TENDERLY_PROJECT_SLUG}/simulate`,
            {
                network_id: NETWORK_ID,
                from: '0x3f41a1cfd3c8b8d9c162de0f42307a0095a6e5df',
                to: QUOTER_CONTRACT_ADDRESS,
                input: calldata,
                simulation_type: 'full',
            },
            {
                headers: {
                    'X-Access-Key': `${TENDERLY_ACCESS_KEY}`,
                    'content-type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('Failed to simulate transaction: ', error);
    }
};
