#!/usr/bin/env node
'use strict'; 
const tomdLinks = require('./functions');
const colors = require('colors');


const mdLinksNoOptions = () => {
  const pathfile = tomdLinks.dataFromUser();
  const pathfile1 = tomdLinks.existFile(pathfile);
  const pathfile2 = tomdLinks.pathExt(pathfile1);
  const pathfile3 = tomdLinks.pathAbsolute(pathfile2);
  
  const data = tomdLinks.readFile(pathfile3);
  const links = tomdLinks.markdownLinkExtractor(data);
  const links1 = tomdLinks.addLineNumber(data, links);
  tomdLinks.noOptions(links1);
};

const mdLinksValidate = () =>{
  const pathfile = tomdLinks.dataFromUser();
  const pathfile1 = tomdLinks.existFile(pathfile);
  const pathfile2 = tomdLinks.pathExt(pathfile1);
  const pathfile3 = tomdLinks.pathAbsolute(pathfile2);
  const data = tomdLinks.readFile(pathfile3);
  const links = tomdLinks.markdownLinkExtractor(data);
  const links1 = tomdLinks.addLineNumber(data, links);
  const validate = tomdLinks.validateStatus(links1);
  validate.then(data=>{
    data.map((link) =>{
      const showThis2 = `${colors.bold.grey(links.path)}:${colors.yellow(link.line)}\n${colors.white.underline(link.href)} ${colors.green(link.statusText)} ${colors.green(link.status)} ${colors.blue(link.text)}`;
      console.log(showThis2);
    });
  });
};


const mdLinksStats = () =>{
  const pathfile = tomdLinks.dataFromUser();
  const pathfile1 = tomdLinks.existFile(pathfile);
  const pathfile2 = tomdLinks.pathExt(pathfile1);
  const pathfile3 = tomdLinks.pathAbsolute(pathfile2);
  const data = tomdLinks.readFile(pathfile3);
  const links = tomdLinks.markdownLinkExtractor(data);
  const links1 = tomdLinks.addLineNumber(data, links);
  const stats = tomdLinks.validateStatus(links1);
  stats.then(data=>{
    let showIt = ` \n${colors.bold.blue('Número de Links Activos:')}${links.working}`;
    showIt += ` \n${colors.bold.red('Número de Links Rotos:')}${links.broken}`; 
    showIt += ` \n${colors.bold.yellow('Número de Links Totales:')}${links.working + links.broken}`;
    console.log(showIt);     
  });
};

const mdLinks = () => {
  const args = process.argv;
  if ((args[3] == undefined) && (args[2] != undefined)) {
     return mdLinksNoOptions();
  } else if (((args[3] === '--validate') || (args[3] === '-v')) && (args[4] === undefined)) {
     return mdLinksValidate();
  } else if ((args[3] === '--stats') || (args[3] === '-s') && (args[4] === undefined)) {
     return mdLinksStats();
  } else if ((args[3] === '--stats') && (args[4] === '--validate')) {
    mdLinksValidate();
    mdLinksStats();
    return 
  } else if ((args[3] === '--validate') && (args[4] === '--stats')) {
    mdLinksValidate();
    mdLinksStats();
    return 
  }else{
    console.log(`${colors.bgCyan('md-links --help')}\n`)
    console.log(`${colors.bold.white('md-links')} ${colors.bold.green('<path>')} ${colors.bold.cyan('[options]')}\n`)}
    console.log(`${colors.bold.green('<path>')} : Ruta absoluta o relativa al archivo (requerido)\n`)
    console.log(`${colors.bold.cyan('[options]')} :\n ${colors.bold.red('-- validate')} :  Valor que determina si se desea validar los links encontrados en el archivo.`)
    console.log(`${colors.bold.cyan('[options]')} :\n ${colors.bold.red('-- stats')} :  Valor que entrega estadisticas respecto a la totalidad de links encontrados,\n cuantos funcionan cuantos no, y totalidad de links encontrados.\n`)

};

mdLinks();

exports.mdLinks = mdLinks;
