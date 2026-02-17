import axios from 'axios';
import { Session, User } from 'next-auth';

const axiosInstance = axios.create({
    baseURL: 'http://130.162.220.214:3003',
});

export async function dbUserExist(session: Session | null) {
    try {
        const data = { id: session?.user?.id };
        const response = await axiosInstance.post('mysql/userExists', data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function createDbUser(session: Session | null) {
    try {
        const data = { id: session?.user?.id, username: 'franta', pass: '123456789' };
        const response = await axiosInstance.post('mysql/createUser', data);
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}