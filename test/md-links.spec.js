const mdLinks = require('../lib/md-links.js');

test('Deberia retornar las extensiones del archivo',()=>{
    expect(pathExt('README.md')).tobe('.md')
})



