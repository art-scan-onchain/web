// useAxios hook

import React, { useState, useEffect } from 'react';
import axios from 'axios';



const useAxiosGet = (url) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);


    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.get(url)
                setResponse(resp.data)
            } catch (err) {
                setError(err)
            } finally {
                setloading(false)
            }

        })()
    }, [url])

    return { response, error, loading}

}
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

const useAxios = ({ url, method, body = null, headers = null }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](url, JSON.parse(headers), JSON.parse(body))
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                console.log('err', err)
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        console.log('calling useEffect')
        fetchData();
    }, []); 
    //

    return { response, error, loading };
};

export default useAxiosGet;
