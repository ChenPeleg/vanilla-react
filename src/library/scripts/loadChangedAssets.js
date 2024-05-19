import { Readable } from 'node:stream';
import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { platform } from 'node:os';
import { exec } from 'child_process';

const execPromise = async (command, extraParams = {}) => {
    return new Promise(function (resolve, reject) {
        exec(command, extraParams, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
};
export const runUnZipper = async (
    fileName = "workbook",
    tempDir = "temp",
    outDir = "out"
) => {
    if (platform() === "win32") {
        const psCommand = `Expand-Archive -Path ${resolve(
            tempDir)}/${fileName} -DestinationPath out`;
         await execPromise(psCommand, {
            cwd: tempDir,
            shell: "powershell.exe",
        });
    } else {
        const psCommand = `cd ${resolve(tempDir)} && zip -r ${resolve(
            outDir
        )}/${fileName}.zip ./*`;
        const res = await execPromise(psCommand);
        console.log(res);
    }

};


const updateChangedLibrary = async () => {
    const url = `https://github.com/ChenPeleg/applinks-client/archive/refs/tags/v0.18.zip`;
    const response = await fetch(url);
    const body = Readable.fromWeb(response.body);
    !existsSync('temp') && mkdirSync('temp');
    !existsSync('temp/out') && mkdirSync('temp/out');
    const filePath =  'temp/updatedlib.zip' ;
    await writeFile(filePath, body);
    await runUnZipper('updatedlib.zip', 'temp', 'out');
};
updateChangedLibrary().then();
