import * as React from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { Button, Typography, Alert } from '@mui/material';

const months = [
    { value: 'Jan', label: 'January' },
    { value: 'Feb', label: 'February' },
    { value: 'Mar', label: 'March' },
    { value: 'Apr', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'Jun', label: 'June' },
    { value: 'Jul', label: 'July' },
    { value: 'Aug', label: 'August' },
    { value: 'Sep', label: 'September' },
    { value: 'Oct', label: 'October' },
    { value: 'Nov', label: 'November' },
    { value: 'Dec', label: 'December' },
]

const dates = Array.from({length: 31}).map((_, i) => { return {value:i+1, label: i+1}})

export default function DatePicker({onChangeDate, label}) {
    const [ month, setMonth ] = React.useState('Jan') // should default to current month
    const [ date, setDate ] = React.useState(1) // should default to current month
    const [ year, setYear ] = React.useState(2022) // should default to current month
    const [ isInvalid, setInvalid ] = React.useState(false)

    const onChangeMonth = (e) => {
        const newDate = moment(`${date}-${e.target.value}-${year}`, "DD-MMM-YYYY")

        if (newDate.isValid()) {
            setMonth(e.target.value)
            onChangeDate({month: e.target.value, date, year})
            setInvalid(false)
        } else {
            setInvalid(true)
        }
    }

    const onChangeDay = (e) => {
        const newDate = moment(`${e.target.value}-${month}-${year}`, "DD-MMM-YYYY")

        if (newDate.isValid()) {
            setDate(e.target.value)
            onChangeDate({month, date: e.target.value, year})
            setInvalid(false)
        } else {
            setInvalid(true)
        }

    }
    const onChangeYear = (e) => {
        const newDate = moment(`${date}-${month}-${e.target.value}`, "DD-MMM-YYYY")
        if (newDate.isValid()) {
            setYear(e.target.value)
            onChangeDate({month, date, year: e.target.value})
            setInvalid(false)
        } else {
            setInvalid(true)
        }
    }

    const InvalidMessage = () => {
        return (
            <Alert severity="error">The date to be selected is invalid!</Alert>
        )
    }

    return (
        <Box sx={{marginTop: '10px'}}>
            <Typography variant="h5">
                {label}
            </Typography>

        {(isInvalid)
            ? InvalidMessage()
            : null}
        <TextField
          id="outlined-select-currency"
          select
          label="Select Month"
          value={month}
          onChange={onChangeMonth}
        >
         {months.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Select Date"
          value={date}
          onChange={onChangeDay}
        >
         {dates.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          label="Select Year"
          value={year}
          onChange={onChangeYear}
        >
        </TextField>
        </Box>
    )
}