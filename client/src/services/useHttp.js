import { useCallback } from "react"

export const useHttp = () => {
    const request = useCallback(async (url, method = 'GET', body = null, header = { 'Content-Type': 'application/json' }) => {

        try {
            const response = await fetch(url, { method, body, header });

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data
        } catch (e) {
            throw e
        }

    }, []);

    return { request };
}

export const getData = async () => {
    try {
        const response = await fetch(`/itemProducts`);

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch users:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

export const getData2 = async () => {
    try {
        const response = await fetch(`/filters`);

        if (response.ok) {
            return await response.json();
        } else {
            console.error('Failed to fetch users:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};
