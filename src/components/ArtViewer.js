
import * as React from 'react';
import  { useState }  from 'react';

import Box from '@mui/material/Box';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Alert, CircularProgress, Grid  } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { useParams } from "react-router-dom";

import {
    useConnect,
    useBalance,
    useNetwork,
    useAccount,
    useProvider,
    useContractRead,
    useContractWrite
} from 'wagmi'
import { fontSize } from '@mui/system';
import useAxios from '../hooks/useAxios'

const CONTRACT_ADDRESS = require('../lib/constants.json').CONTRACT_ADDRESS
const CONTRACT_ABI = require('../lib/contracts/ArtThenticator.json').abi



export default function ArtViewer() {
    const [ name, setName ] = useState('Mona Lisa')
    const [ artMedium, setArtMedium ] = useState('oil')
    const [ artUrl, setArtUrl ] = useState()
    const [ artCoa, setArtCoa ] = useState('coa')
    const [ artDate, setArtDate ] = useState(new Date());

    const { uuid } = useParams()

    // const { data: ArtData, error, isError, isLoading } = useContractRead({
    //     addressOrName: CONTRACT_ADDRESS,
    //     contractInterface: CONTRACT_ABI,
    //     functionName: 'getIdByUUID',
    //     args: [uuid]
    // })

    // const serviceUrl = (document.location.host.includes('localhost'))
    // ? 'http://localhost:9999/.netlify/functions/get-art-by-uuid/view'
    // : 'https://moseo-web.netlify.app/.netlify/functions/get-art-by-uuid/view'

    const serviceUrl = 'https://moseo-web.netlify.app/.netlify/functions/get-art-by-uuid/view'
    // const { response: ArtData, error: AxiosError, loading: AxiosLoading } = useAxios({
    //     url: `${serviceUrl}/${uuid}`,
    //     method: 'get'
    // })
    console.log('uuid', uuid)
    const { response: ArtData, error: AxiosError, loading: AxiosLoading } = useAxios(`${serviceUrl}/${uuid}`)

    // React.useEffect(() => {
    //     console.log('AxiosError>>', AxiosError)
    //     console.log('axiosloading', AxiosLoading)

    // }, [])

    const RenderArtData = () => {
        if (AxiosError) {
            return (
                <Alert sx={{
                    width: '100%',
                    fontSize: '20px',
                }} severity="error">
                    Invalid Code.
                    <br/>This QR does not work with
                    <br/><strong>Art-Thenticator</strong>
                </Alert>
            )
        } else {

            return (
                <>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                        <img style={{maxHeight: '48px'}} src={ArtData?.coa} />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={ArtData?.name} secondary={uuid} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                    <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Name" secondary={ArtData?.name} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                    <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Medium" secondary={ArtData?.medium} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                    <Avatar>
                    <ImageIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Unique ID" secondary={uuid} />
                </ListItem>
                </List>
                </>
            )
        }

    }

    const RenderLoading = () => {
        return (
            <>
                <CircularProgress />
                <br />
                <Alert severity="info">Loading data from blockchain...</Alert> 
            </>
        )
    }


     return (
        <>
        <Grid container justifyContent="center">
            <Box component="form"
                noValidate
                autoComplete="off">
                {
                    (!AxiosLoading)
                    ? RenderArtData()
                    : RenderLoading()
                }
            </Box>
        </Grid>
        </>
    );
}