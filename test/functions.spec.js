const  {dataFromUser,existFile,pathExt,pathAbsolute,readFile,markdownLinkExtractor,addLineNumber,validateStatus,noOptions}= require('../functions');
const path = require('path');

test('Deberia retornar la extension del archivo',()=>{
    expect(path.extname('readmetest.md')).toBe('.md')
});

test('Si el archivo tiene extensión .md deberia retornar el mismo archivo ,()=>{
    expect(pathExt('readmetest.md')).toBe('readmetest.md')
});