import axios from 'axios';
import { Session, User } from 'next-auth';
import { auth } from '@/auth';


const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        "x-api-shared-secret": process.env.API_SHARED_SECRET,
    }
});


export async function dbUserExist(session: Session | null) {
    try {
        const data = { id: session?.user?.email };
        const response = await axiosInstance.post('mysql/userExists', data);
        return response; // Return the response data
    } catch (error) {
        console.error('Error:', error);
        return null; // Return null or handle the error as needed
    }
}


export async function createDbUser(pass: string | undefined) {
    console.log("hovno 2")

    /* try {
        const session = await auth();
        const email = session?.user?.email;
        const username = email?.split("@")[0].replace(".", "-");
        const data = {
            id: email,
            username: username,
            pass: pass
        };


        fetch('http://localhost:3003/mysql/createUser', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(data)
        });
        // Return the response data
    } catch (error) {
        console.error('Error:', error);
        return null; // Return null or handle the error as needed
    } */

    const session = await auth();
    const email = session?.user?.email;
    const username = email?.split("@")[0].replace(".", "-");

    try {
        await axiosInstance.post('mysql/createUser', {
            id: email,
            username: username,
            pass: pass
        }, { // Add this headers object if your backend expects JSON
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function ShowPass(session: Session | null) {
    console.log("kokot", session?.user?.email)
    try {
        const response = await axiosInstance.post("mysql/showPass", { id: session?.user?.email })
        return response; // Return the response data
    } catch (error) {
        console.error('Error:', error);
        return null; // Return null or handle the error as needed
    }


}

export async function DelDB(databaseName: string) {
    const session = await auth();
    const email = session?.user?.email;
    const username = email?.split("@")[0].replace(".", "-");

    console.log(databaseName)
    const data = {
        id: email,
        databaseName: databaseName,
        username: username
    }
    console.log("data importnat", data)
    try {
        await axiosInstance.post("mysql/deleteDatabase", data)
    } catch (error) {
        console.error('Error:', error);
        return null; // Return null or handle the error as needed
    }
}

export async function CreateDB(databaseName: string | undefined) {
    const session = await auth();
    const email = session?.user?.email;
    const username = email?.split("@")[0].replace(".", "-");
    let databaseNameTMP;
    if (databaseName == username) {
        databaseNameTMP = username;
    } else {
        databaseNameTMP = `${username}_${databaseName}`
    }

    console.log(databaseName)
    const data = {
        id: email,
        databaseName: databaseNameTMP,
        username: username
    }
    console.log("data importnat", data)
    try {
        await axiosInstance.post("mysql/createDatabase", data)
    } catch (error) {
        console.error('Error:', error);
        return null; // Return null or handle the error as needed
    }
}

export async function ChangePass(newPass: string | undefined) {
    const session = await auth();
    const email = session?.user?.email;
    const username = email?.split("@")[0].replace(".", "-");
    const data = {
        id: email,
        username: username,
        newPass: newPass
    }
    try {
        await axiosInstance.post("mysql/changePass", data)
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}