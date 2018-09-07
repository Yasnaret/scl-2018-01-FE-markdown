# Markdown Links: md-links

Search,find and validate links into your markdown files

---

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

