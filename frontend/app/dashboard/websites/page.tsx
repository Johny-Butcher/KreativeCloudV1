'use client';
import { useEffect, useState } from 'react';
import { userExists } from '@/lib/api';

export default function Websites() {
    /* const [userExistsResult, setUserExistsResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserExists = async () => {
            try {
                const result = await userExists('johny@email.com');
                setUserExistsResult(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserExists();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    } */

    return (
        <div>
            Websites
            {/*{userExistsResult ? (
                <pre>{JSON.stringify(userExistsResult, null, 2)}</pre>
            ) : (
                'User does not exist'
            )}*/}
        </div>
    );
}
