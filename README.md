# Markdown Links: md-links

Search,find and validate links into your markdown files


Esta librería extrae links desde archivos Markdown,validandolos por medio de peticiones HTTP desde Nodejs,retornando sus estados para cada una de las url's contenidas.De forma opcional se puede acceder a las estadísticas de links contabilizando la cantidad de links que aún siguen vigentes.

### SETUP/ USAGE / HOW TO 

Instalación

<a href="https://imgbb.com/"><img src="https://image.ibb.co/nuCYep/carbon.png" alt="carbon" border="0"></a>


Ejecución línea de comandos:

`md-links <path> [options]`

**<path>** Es la ruta del archivo o carpeta que deseas procesar,parametro requerido.  
**[options]** Puede adoptar los siguientes valores:  
**--stats** Imprime cantidad total de links y con su estado actual ,activo o roto.  
**--validate** Entrega estadisticas sobre esos links  
**--valodate --stats** Entrega la cantidad de links asi como el estado de los mismos-activos o rotos-ademas de las estadisticas sobre los links  

Ejemplos de uso:

`md-links <path>`

<a href="https://ibb.co/gdjSpp"><img src="https://preview.ibb.co/bsFp29/mdlinks.png" alt="mdlinks" border="0"></a>

`md-links <path> --validate`

<a href="https://ibb.co/j9axN9"><img src="https://preview.ibb.co/cg36FU/mdlinks_validate.png" alt="mdlinks_validate" border="0"></a>

`md-links <path> --stats`

<a href="https://imgbb.com/"><img src="https://image.ibb.co/bR5Q9p/mdlinks_stats.png" alt="mdlinks_stats" border="0"></a>

`md-links <path> --validate --stats`

<a href="https://ibb.co/dAUJUp"><img src="https://preview.ibb.co/gkoZ29/mdlinks_validate_stats.png" alt="mdlinks_validate_stats" border="0"></a>

`md-links <path> --help`

<a href="https://ibb.co/n0HoUp"><img src="https://preview.ibb.co/kTgF9p/mdlinks_help.png" alt="mdlinks_help" border="0"></a>


