
// LLAMADA DE MODULOS
const puppeteer = require('puppeteer');
var mongoose = require('mongoose');


//CONECCION CON MONGODB
const dbpath = "mongodb://localhost:27017/Ganymede";
const mongo = mongoose.connect(dbpath, {useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexion:'));
db.once('open', function() {
console.log("Conexion exitosa!");
    
});   
   
 
    


// DEFINO SCHEMA
    var ProductSchema = mongoose.Schema({


            title: String,
            price: Number,
            discount: String,
            sku: Number,
            image: String,
            description: String,
            category: String

    });

   
    
    // COMPILO MODELO
    var products = mongoose.model('Product', ProductSchema, 'products');




    // FUNCION PARA GUARDAR DATOS 
    var Product = function(result) {
      

        mongo.then(() => {


        // title=[0]
        // price=[1]
        // discount=[2]
        // sku=[3]
        // image=[4]
        // description=[5]
        // category=[6]


        // INSTANCIA DE DOCUMENTO
        var productsAdd = new products({ title:result[0],sku:result[3],price:result[1],discount:result[2],category:result[6],description:result[5],image:result[4] });
     
        productsAdd.save(function (err, products) {
          if (err) return console.error(err);
          console.log("Coleccion guardada!.");
        });

          

            
            console.log("Datos insertados correctamente");

        }).catch((err) => {

            console.log('err', err);

        });


    }
 


    let scrape = async () => {
            const browser = await puppeteer.launch({headless: false});
            const page = await browser.newPage();
           

            await page.goto('https://www.easy.com.ar/')
            await page.type('#SimpleSearchForm_SearchTerm', 'silla')
            await page.click('#WC_CachedHeaderDisplay_button_1  > img')
            await page.waitForSelector('.center-content-area')
           
                const result = await page.evaluate(x => {
 
                 


                    var title =         document.querySelector('#Search_Result_div > .center-content-area > .category-all > div > .thumb-prod-border > .thumb-product > .thumb-name').innerText;
                    var price =         document.querySelector('#Search_Result_div > .center-content-area > .category-all > div > .thumb-prod-border > .thumb-product > .thumb-price .thumb-price > div > span').innerText;
                    
                    
                    var disc =     document.querySelector('#Search_Result_div > .center-content-area > .category-all > div > .thumb-prod-border > .thumb-product > .float-container-line  a > div ') !== null;
                    
                    // verifico si existe descuento
                    if (disc) {
                        
                        var disc =     document.querySelector('#Search_Result_div > .center-content-area > .category-all > div > .thumb-prod-border > .thumb-product > .float-container-line  a > div ').innerText;
                        var discountSplit = disc,
                        disTring = " Feria",
                        disFor    = "",
                        discount = disc.replace(disTring, disFor);

                    }else{

                        discount=0;

                    }
                    

                    

                    


                    var category = "NOT";
                    var description =   "NOT";
                    var image=          document.querySelector('#Search_Result_div > .center-content-area > .category-all > div > .thumb-prod-border > .thumb-product > .thumb-img > div > div > div > div > a > img').getAttribute('data-src');
                    

                    var skuSplit = image,
                    string = "https://easyar.scene7.com/is/image/EasyArg//",
                    ReplaceFor    = "",
                    sku = skuSplit.replace(string, ReplaceFor);


                   return Promise.resolve([title,price,discount,sku,image,description,category]);
                   

                    

                });
                
                //llamo a la funcion Product
                Product(result); 
            

            browser.close();
   
    
    };




scrape().then((value) => { /* echo! */ });







