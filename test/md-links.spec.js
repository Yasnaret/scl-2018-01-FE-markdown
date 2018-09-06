const mdLinks = require('../functions');

test('Deberia retornar las extensiones del archivo',()=>{
    expect(pathExt('README.md')).tobe('.md')
})



