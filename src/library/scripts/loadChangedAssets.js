import { Readable } from 'node:stream';
import { writeFile } from 'fs/promises';
import { existsSync, mkdirSync } from 'node:fs';

const updateChangedLibrary = async () => {
    const url = `https://github.com/ChenPeleg/applinks-client/archive/refs/tags/v0.18.zip`;
    const response = await fetch(url);
    const body = Readable.fromWeb(response.body);
    !existsSync('temp') && mkdirSync('temp');
    await writeFile('temp/updatedlib.zip', body);
};
updateChangedLibrary().then();
