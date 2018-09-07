const fs = require('fs');
const path = require('path');
const Marked = require('marked');
const axios = require('axios');
const colors = require('colors');

let links = [];
// .............................................................Captura los datos necesarios y opcionales para la correcta ejecución del módulo.
const dataFromUser = () => pathfile = process.argv[2];

// .............................................................Retorna verdadero si el archivo existe;
const existFile = pathfile => {
  fs.existsSync(pathfile) ? pathfile : 'Debes ingresar un archivo existente';
  const pathfile1 = pathfile;
  return pathfile1; 
};

// ...............................................................Retorna la extension del archivo :
const pathExt = pathfile1 => {
  path.extname(pathfile1) === '.md' ? pathfile1 : 'debes ingresar un archivo markdown';
  const pathfile2 = pathfile1;
  return pathfile2;
};

 
// ...............................................................Retorna siempre en ruta absulta el archivo dado 
const pathAbsolute = pathfile2 => {
  path.isAbsolute(pathfile2) ? pathfile2 : pathfile2 = path.resolve(pathfile2);
  const pathfile3 = pathfile2;
  links.path = pathfile3;
  return pathfile3;
};

//  ...............................................................Retorna la data contenida dentro del archivo :


const readFile = pathfile3 => {
  let data = fs.readFileSync(pathfile3, 'utf8');
  return data;
};


//  ................................................................Retorna los links y el texto propio,contenidos en el archivo
const markdownLinkExtractor = (data) => {
  const renderer = new Marked.Renderer();
  const linkWithImageSizeSupport = /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]?|`[^`]*`|[^\[\]\\])*?)\]\(\s*(<(?:\\[<>]?|[^\s<>\\])*>|(?:\\[()]?|\([^\s\x00-\x1f()\\]*\)|[^\s\x00-\x1f()\\])*?(?:\s+=(?:[\w%]+)?x(?:[\w%]+)?)?)(?:\s+("(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)))?\s*\)/;


  Marked.InlineLexer.rules.normal.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.gfm.link = linkWithImageSizeSupport;
  Marked.InlineLexer.rules.breaks.link = linkWithImageSizeSupport;

  renderer.link = function(href, title, text) {
    links.push({
      href: href,
      text: text
    });
  };
    
  renderer.image = function(href, title, text) {
    href = href.replace(/ =\d*%?x\d*%?$/, '');
      
    links.push({
      href: href,
      text: text  
    });
  };
  Marked(data, {renderer: renderer});
  return (links);
};

// ................................................................................el documento se divide en lineas 

const addLineNumber = (data, links)=>{
  const datosPorLinea = data.split('\n');

  for (let i = 0; i < links.length; i++) {
    let indiceX = 0;
    datosPorLinea.forEach((dato, index)=>{
      const match = dato.indexOf(`[${links[i].text}](${links[i].href})`);
      if (match != -1) {
        indiceX = index + 1;
      }
    });
    links[i].line = indiceX; 
  }  

  return (links);
};

const noOptions = (links) =>{
  links.map(link=>{
    const showThis = `${colors.bold.green(links.path)}:${colors.bgYellow.black(link.line)}\n${colors.white.underline(link.href)} ${colors.cyan(link.text)}`;
    console.log(showThis);
  });
};

const validateStatus = links =>{
  let goodlink = 0;
  let badlink = 0;

  const validateLinks = links.map((link) => {
    return new Promise(resolve =>{
      axios.get(link.href)
        .then(resp => {
          link.status = resp.status;
          link.statusText = resp.statusText;
          goodlink++;
          resolve(link, goodlink);
        })
        .catch(e => {
          link.status = e.response.status;
          link.statusText = e.response.statusText;
          badlink++;
          resolve(link, badlink);
        });
    });
  });
  return Promise.all(validateLinks).then(finalLinks => {
    links.working = goodlink;
    links.broken = badlink;
    return (finalLinks);
  });
};

exports.dataFromUser = dataFromUser;
exports.existFile = existFile;
exports.pathExt = pathExt;
exports.pathAbsolute = pathAbsolute;
exports.readFile = readFile;
exports.markdownLinkExtractor = markdownLinkExtractor;
exports.addLineNumber = addLineNumber;
exports.validateStatus = validateStatus;
exports.noOptions = noOptions;

