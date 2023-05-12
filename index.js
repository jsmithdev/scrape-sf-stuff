import fs from 'fs/promises';

const content = await fs.readFile('./README.md')

console.log(content.toString())