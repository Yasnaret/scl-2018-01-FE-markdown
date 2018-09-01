const fs = require ('fs');
const  path = require ('path');

const Marked = require('marked');
const axios = require('axios');

let pathfile
//.............................................................Captura los datos necesarios y opcionales para la correcta ejecución del módulo.
const dataFromUser = () => pathfile = process.argv[2];

// .............................................................Retorna verdadero si el archivo existe;
const existFile = (pathfile) =>fs.existsSync(pathfile);

//...............................................................Retorna la extension del archivo :
 const pathExt = pathfile => path.extname(pathfile);
 
//...............................................................Retorna siempre en ruta absulta el archivo dado 
const pathAbsolute = pathfile => {
 path.isAbsolute(pathfile)? pathfile : path.resolve(pathfile);
 }

//...............................................................Retorna la data contenida dentro del archivo :



const readFile = (pathfile) => {
   fs.readFile(pathfile, 'utf8', (err, data) => {
        if (err) throw err;
        return data
        
    });
}


//................................................................Retorna los links y el texto propio,contenidos en el archivo
let markdownLinkExtractor = (data) => {
    let links=[];
    const renderer = new Marked.Renderer();
    const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;


    Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
    Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
    Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

    renderer.link = function (href,title,text) {
      
        links.push({
            href: href,
            text: text
        });
    };
    
    renderer.image = function (href,title,text) {
        href = href.replace(/ =\d*%?x\d*%?$/, '');
      
        links.push({
            href: href,
            text: text  
        });
    };
    Marked(data, {
        renderer: renderer
    });
    
  return(data,links);

};

const addLineNumber=(data,links)=>{
    let datos=data.split('\n')

    for (let i = 0; i < links.length; i++){
        let indiceX= 0;
        datos.forEach((dato, index)=>{
          let match=dato.indexOf(`[${links[i].text}](${links[i].href})`)
          if(match !=-1){
            indiceX= index+1;
          }
        })
       links[i].line=indiceX 
    };  
     return(links)
}




// // module.exports= {
// //     pathExt,
// //     existFile,
  

// // }


