
import * as React from 'react';
import  { useState }  from 'react';

import Box from '@mui/material/Box';
import { TextField, Button } from '@mui/material'

import DatePicker from './DatePicker'

const newId = require('uuid').v4;

export default function ArtCreator({ actionHandler, setArgs }) {
    const [ name, setName ] = useState('Busy Days')
    const [ artMedium, setArtMedium ] = useState('Oil in Canvas')
    const [ artUrl, setArtUrl ] = useState('https://i.imgur.com/5yeBVeM.jpeg')
    const [ artCoa, setArtCoa ] = useState('12312731073187310827380asdfasdas')
    const [ artDate, setArtDate ] = useState(new Date());
    const [ artUUID, setArtUUID ] = useState(newId())


    // React.useCallback(() => {
    //     setArgs([artUUID, name, artMedium, artCoa, +artDate])

    // }, [name, artMedium, artUrl, artCoa, artDate, artUUID])

    const onChangeDate = (selectedDate) => {
        console.log(selectedDate)
        setArtDate(selectedDate)
    }

    const onSaveArtHandler = () => {
        setArgs([artUUID, name, artMedium, artCoa, +artDate])

        actionHandler()
    }

     return (
        <>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                noValidate
                autoComplete="off"
            >
                <div>
                <h1>Art Details</h1>
                <TextField 
                    required
                    id="outlined-required"
                    label="New UUID"
                    value={artUUID}
                    disabled={true}
                    onChange={(e) => setArtUUID(e.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Art Name"
                    // defaultValue="Mona Lisa"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Art Medium"
                    // defaultValue="Mona Lisa"
                    value={artMedium}
                    onChange={(e) => setArtMedium(e.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Art COA"
                    // defaultValue="Mona Lisa"
                    value={artCoa}
                    onChange={(e) => setArtCoa(e.target.value)}
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Art URL"
                    value={artUrl}
                    onChange={(e) => setArtUrl(e.target.value)}
                />
                <DatePicker label="Art Created" onChangeDate={onChangeDate} />

                </div>

                <Button sx={{marginTop: '5%'}} variant="contained" onClick={onSaveArtHandler}>Save ART</Button>
            </Box>
        </>
    );
}