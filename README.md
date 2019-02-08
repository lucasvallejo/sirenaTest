# SirenaTest | Prueba de Web Scraping

<!-- [START badges] -->
[![Linux Build Status](https://img.shields.io/travis/com/GoogleChrome/puppeteer/master.svg)](https://travis-ci.com/GoogleChrome/puppeteer) [![Windows Build Status](https://img.shields.io/appveyor/ci/aslushnikov/puppeteer/master.svg?logo=appveyor)](https://ci.appveyor.com/project/aslushnikov/puppeteer/branch/master) [![Build Status](https://api.cirrus-ci.com/github/GoogleChrome/puppeteer.svg)](https://cirrus-ci.com/github/GoogleChrome/puppeteer) [![NPM puppeteer package](https://img.shields.io/npm/v/puppeteer.svg)](https://npmjs.org/package/puppeteer)
<!-- [END badges] -->



REQUISITOS PARA CORRER EL APLICATIVO


[mongoosejs.com](http://mongoosejs.com/)

[puppeteer](https://github.com/GoogleChrome/puppeteer)

[Nodejs](https://nodejs.org/es/)

[NPM](https://docs.npmjs.com/cli/install)


# Ejecución

Instalamos los modulos necesarios en el directorio donde correra nuestro aplicativo

1- Instalamos npm 

<code>npm install npm@latest -g</code>

2- Instalamos NodeJs 

<code>npm install nodejs-latest</code>

3- Instalamos puppeteer 

<code>npm i puppeteer</code>

4- Instalamos mongoose

<code>npm i mongoose</code>

# Estructuras basicas de funcionamiento

Demostración de <b>scraping</b> del sitio web [easy.com.ar](https://www.easy.com.ar), tomando como busqueda la palabra <b>silla</b> y guardando el primer resultado , si este existe, en la colección products de la base de datos Ganymede.
En esta guardaremos los siguientes datos:

title<br>
price<br>
discount<br>
sku<br>
image<br>
description<br>
category<br>
<br><br>
LLAMADA DE MODULOS
<br><br>
<code>
const puppeteer = require('puppeteer');
var mongoose = require('mongoose');
</code>


<br>
CONEXION CON MONGODB CON GANYMEDE
<br><br>

<code>const dbpath = "mongodb://localhost:27017/Ganymede";
const mongo = mongoose.connect(dbpath, {useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexion:'));
db.once('open', function() {
console.log("Conexion exitosa!");
});</code>


<br><br>
DEFINO SCHEMA
<br><br>
   
   
<code>
   var ProductSchema = mongoose.Schema({


            title: String,
            price: Number,
            discount: String,
            sku: Number,
            image: String,
            description: String,
            category: String

    });
	</code>



COMPILO MODELO

   
 
 
 <code>  var products = mongoose.model('Product', ProductSchema, 'products'); </code>
 
 
 <blockquote>Ver funciones completas de ejecución en el archivo <b> app.js </b></blockquote>
 
 
 # Ejecución de aplicativo bajo NODEJS & MONGOOSE
 
 Llamamos a la carpeta raiz del aplicativo:
 
 <code>localhost:~ <user>$ cd /Library/WebServer/Documents/app</code>
 
 Ejecutamos el aplicativo via Nodejs
 
 <code> localhost:app <user>$ node app.js </code>
 
 Resibimos retorno de operacion exitosa!
 
 <code>Connection Successful!Datos insertados correctamente</code>
 
 Abrimos una nueva ventana de terminal y ejecutamos MONGOOSE
 
 <code>localhost:app <user>$ mongo</code>
  
  Retorno:
  
  <code>
  MongoDB shell version: 3.2.21
  connecting to: test
  > 
 </code>
 
 Recorremos las bases de datos
 
 <code>show dbs</code>
 
 Accedemos a Ganymede
 
 <code>use Ganymede</code>
 
 Realizamos la consulta y capturamos el documento salvado de nuestra busqueda de <b>sillas</b> en el sitio de [easy.com.ar](https://www.easy.com.ar)
 
 * Mas info: en los enlaces adjuntados.
 
 
 
