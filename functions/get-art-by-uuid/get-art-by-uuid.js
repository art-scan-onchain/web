const ethers = require('ethers')

const CONTRACT_ADDRESS = '0x600d4a8cf5cAEFdecA95592fBB1c48a0c5a75C7d'
// const CONTRACT_ABI = require('../lib/contracts/ArtThenticator.json').abi
const NETWORK_RPC_URL = 'https://matic-mumbai.chainstacklabs.com'

const cache = {}

const ViewArtNft = async (_uuid) => {
  
  if (cache[_uuid]) {
    return cache[_uuid];
  }
 
  const provider = new ethers.providers.JsonRpcProvider(NETWORK_RPC_URL)
  // const wallet = new ethers.Wallet(DEPLOYER_WALLET_PRIVATE_KEY, provider)

  
  const abi = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "uuid",
          "type": "string"
        }
      ],
      "name": "getIdByUUID",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "uuid",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "medium",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "coa",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "date",
              "type": "uint256"
            }
          ],
          "internalType": "struct ArtThenticator.Art",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
  ]

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    abi,
    provider
  )

  try {
    const [id, uuid, name, medium, coa, date]  = await contract.getIdByUUID(_uuid)

    if (id.toString() === '0') {
      return undefined;
    } else {
      const retData = {
        id,
        uuid,
        name,
        medium,
        coa,
        date
      };

      cache[_uuid] = retData;
      return retData;
    }
  } catch (error) {
    return undefined;
  }

}

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  try {
    // const subject = event.queryStringParameters.name || 'World'
    const [ _, uuid] = event.path.split('/view/')

    const res =  await ViewArtNft(uuid)

    if (!res) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Art Not Found'}),
            headers: {
                "access-control-allow-origin": "*",
              },
        }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(res),
      headers: {
        "access-control-allow-origin": "*",
      },
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler, ViewArtNft }
