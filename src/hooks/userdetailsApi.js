import { useState, useEffect } from 'react';

const useApi = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(url);
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('responseData: ', responseData);
                    setData(responseData);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
        };
    }, [url]);
    return { data, loading, error };
};

export default useApi;
