import { auth } from "@/auth";
import ChangePass from "@/components/mysql/ChangePass";
import CreateDatabase from "@/components/mysql/CreateDatabase";
import CreateUserUI from "@/components/mysql/CreateUserUI";
import ShowDatabases from "@/components/mysql/ShowDatabases";
import { createDbUser, dbUserExist } from "@/lib/mysql/api";
import { ShowPass } from '@/lib/mysql/api';
import { AdeleteDB } from "@/services/actions/Actions";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { use } from "react";

async function getData() {
    const session = await auth();

    const res = await dbUserExist(session);
    return res
}

async function getUser() {
    const session = await auth();

    const res = await ShowPass(session)
    return res;
}

export default async function Databases() {
    const url = process.env.NEXT_PUBLIC_SITEURL;
    const data = await getData();
    const user = await getUser();
    const databases = user?.data.databases;
    const username = user?.data.username;
    const pass = user?.data.pass;
    return (
        <div className="flex flex-col justify-center items-start m-4">
            <h1 className="text-3xl font-bold">Databases</h1>
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 hover:shadow-lg transition-shadow duration-300" target="_blank" href={`${url}/pma/`}>phpMyAdmin</a>
            {data?.data?.data ? (
                <>
                    <h2 className="text-xl font-bold text-blue-600">Login: {username}</h2>
                    <h2 className="text-xl font-bold text-blue-600">Pass: {pass}</h2>
                    <div className="mt-8">
                        <CreateDatabase />
                    </div>
                    <div className="mt-8">
                        <ChangePass />
                    </div>
                    <ShowDatabases databases={databases} />
                </>
            ) : (
                <CreateUserUI />
            )}
        </div>
    )
}