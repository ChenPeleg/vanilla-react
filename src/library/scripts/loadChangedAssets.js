import { writeFile } from 'node:fs/promises';
import { Readable } from 'node:stream';

const   updateChangedLibrary = async( )=> {
  const url =`https://github.com/ChenPeleg/applinks-client/archive/refs/tags/v0.18.zip`
    const response = await fetch(url)
    const body = Readable.fromWeb(response.body)
    await writeFile('document.pdf', body)
}
updateChangedLibrary().then()
