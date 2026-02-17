'use server'

import { CreateWebsite, CreateWordpress, DelWebsite, DelWordpress, showWebsite, showWordpress } from "@/lib/api";
import { ChangePass, CreateDB, createDbUser, DelDB } from "@/lib/mysql/api"
import { Session } from "next-auth";

export async function AcreateDBUser(formData: FormData) {
    const tmp = formData.get("pass")
    const pass = tmp?.toString()

    const result = await createDbUser(pass);
    return result
}

export async function AdeleteDB(databaseName: string) {
    const result = await DelDB(databaseName);
    return result
}

export async function AcreateDB(formData: FormData) {
    const tmp = formData.get("databaseName")
    const databaseName = tmp?.toString().toLowerCase();
    const result = await CreateDB(databaseName);
    return result;
}

export async function AchangePass(formData: FormData) {
    const tmp = formData.get("newPass")
    const newPass = tmp?.toString();
    const result = await ChangePass(newPass);
    return result;
}

export async function AshowWordpress() {
    const result = await showWordpress();
    return result;
}

export async function AwordpressDel(subdomain: string) {
    const result = await DelWordpress(subdomain)
    return result;
}

export async function AcreateWordpress(formData: FormData) {
    const tmp = formData.get("subdomain")
    const subdomain = tmp?.toString().toLowerCase();
    const result = await CreateWordpress(subdomain);
    return result;
}

export async function AcreateWeb(formData: FormData) {
    const tmp1 = formData.get("subdomain")
    const subdomain = tmp1?.toString().toLowerCase();
    const tmp2 = formData.get("pass")
    const pass = tmp2?.toString()
    const result = await CreateWebsite(subdomain, pass)
    return result;
}

export async function AwebsiteDel(subdomain: string) {
    const result = await DelWebsite(subdomain)
    return result;
}

export async function AshowWeb() {
    const result = await showWebsite();
    return result;
}