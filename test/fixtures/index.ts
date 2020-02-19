import fs from 'fs';

export const loadDocFromTextFile = (fixturesTxtFile: string) => {
    const todoDocsTxt = fs.readFileSync(fixturesTxtFile, 'utf8');
    const docs = todoDocsTxt
        .split('\n')
        .filter(txt => !!txt.trim())
        .map((txt, i) => ({ id: i + 1, text: txt.trim() }));
    return docs;
};
