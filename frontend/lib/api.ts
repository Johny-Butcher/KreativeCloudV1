import { auth } from '@/auth';
import axios from 'axios';
import { User } from 'next-auth';


const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        "x-api-shared-secret": process.env.API_SHARED_SECRET,
    }
});

export async function userExists(user: User) {
    try {
        const data = { id: user.email };
        const response = await axiosInstance.post('/user/exists', data);
        return response.data; // Return the response data
    } catch (error) {
        console.error('Error:', error);
        return null; // Return null or handle the error as needed
    }
}

export async function createUser(user: User) {
    console.log("start 2")
    try {
        const data = {
            id: user.email,
            name: user.name,
            email: user.email,
            img: user.image
        }
        const response = await axiosInstance.post('/user/create', data);
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null; // Return null or handle the error as needed
    }

}

export async function showWordpress() {
    const session = await auth()
    try {
        const data = {
            id: session?.user?.email
        }
        const responce = await axiosInstance.post('/user/showWordpress', data)
        return responce
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function DelWordpress(subdomain: string) {
    const session = await auth();

    try {
        const data = {
            id: session?.user?.email,
            subdomain: subdomain
        }
        const responce = await axiosInstance.post('/user/wordpressDel', data)
        return responce
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function CreateWordpress(subdomain: string | undefined) {
    const session = await auth();
    const email = session?.user?.email;
    const username = email?.split("@")[0].replace(".", "_");
    try {
        const data = {
            id: email,
            subdomain: subdomain,
            username: username
        }
        const responce = await axiosInstance.post('/user/wordpressCreate', data)
        return responce
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function CreateWebsite(subdomain: string | undefined, pass: string | undefined) {
    const session = await auth();
    const email = session?.user?.email;
    const username = email?.split("@")[0].replace(".", "");
    try {
        const data = {
            id: email,
            subdomain: subdomain,
            username: username,
            pass: pass
        }
        const responce = await axiosInstance.post('/user/websiteCreate', data)
        return responce
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function DelWebsite(subdomain: string) {
    const session = await auth();

    try {
        const data = {
            id: session?.user?.email,
            subdomain: subdomain
        }
        const responce = await axiosInstance.post('/user/websiteDel', data)
        return responce
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function showWebsite() {
    const session = await auth()
    try {
        const data = {
            id: session?.user?.email
        }
        const responce = await axiosInstance.post('/user/showWebsites', data)
        return responce
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}