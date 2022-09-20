import * as React from 'react';
import { Box, Paper } from '@mui/material';
import { useNavigate } from "react-router-dom";

import ArtCreator from '../components/ArtCreator'

import {
    useConnect,
    useBalance,
    useNetwork,
    useAccount,
    useProvider,
    useContractRead,
    useContractWrite
} from 'wagmi'
const CONTRACT_ADDRESS = require('../lib/constants.json').CONTRACT_ADDRESS
const CONTRACT_ABI = require('../lib/contracts/ArtThenticator.json').abi

export default function AddArtPage() {
    const navigate = useNavigate();
    const [accountAddress, setAccountAddress ] = React.useState()
    const { chain, chains } = useNetwork()

    const [ addArtArgs, setArtArgs ] = React.useState()

    const account = useAccount({
        onConnect({ address, connector, isReconnected }) {
            console.log('Connected', { address, connector, isReconnected })
        }
    })

    // const { data: walletBalance, isError, isLoading } = useBalance({
    //     addressOrName: account.address,
    // })


    const { data, error, isError, isLoading } = useContractRead({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: CONTRACT_ABI,
        functionName: 'getById',
        args: ['1']
    })

    const { data: dataAddNft , write: execAddNftContract } = useContractWrite({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: CONTRACT_ABI,
        functionName: 'addArt',
        args: addArtArgs,
        onError(error) {
            console.log(addArtArgs)
            console.log('contract write error', error)
        }
      })

    // console.log('isLoading', isLoading)
    // if (isError) {
    //     console.log('>>>', data)
    // }

    // console.log('error', error, data)
    console.log('addArtArgs', addArtArgs)

    React.useEffect(() => {
        if (account?.address) {
            setAccountAddress(account?.address)
        } else {
            console.log('not yet')
            navigate("/")
        }
    
    }, [accountAddress])

    // if (!contractRead.isError) {
    //     console.log(contractRead)
    // }
    return (
        <Box xs={1} sx={{
        }}>
            <Paper elevation={10} sx={{
                marginTop: '10px',
                paddingLeft: '8%',
                paddingRight: '8%',
                paddingTop: '2%',
                paddingBottom: '2%'
            }}>
                <h1>Add New Art</h1>
                {chain && <div>Connected to {chain.name}</div>}
                <ArtCreator setArgs={setArtArgs} actionHandler={execAddNftContract} />

            </Paper>

            {/* <button onClick={() => execAddNftContract()}>Add Test Art</button> */}
        </Box>
    )
}