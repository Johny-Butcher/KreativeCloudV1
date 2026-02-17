import * as fs from 'fs';
import * as path from 'path';



export async function chmodRecursive(dirPath, mode) {

    await fs.promises.chmod(dirPath, mode);

    const items = await fs.promises.readdir(dirPath);

    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = await fs.promises.lstat(fullPath);

        await fs.promises.chmod(fullPath, mode);

        if (stats.isDirectory()) {
            await chmodRecursive(fullPath, mode);
        }
    }
}