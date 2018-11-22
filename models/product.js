// Storing Data in Files:
// const products = [];
const fs = require('fs');
const path = require('path');

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        // Add path for Storing Data in Files
        // products.push(this);
        const p = path.join(
            path.dirname(process.mainModule.filename), 
            'data', 
            'products.json'
        );
        fs.readFile(p, (err, fileContent) => {
            console.log(err);
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    /*
    // For Fetching data from File: 
    static fetchAll() {
        return products;
    }
    */
   static fetchAll(cb) {
       const p = path.join(
           path.dirname(process.mainModule.filename),
           'data',
           'products.json'
       );
       fs.readFile(p, (err, fileContent) => {
           if (err) {
               cb([]);
           }
           cb(JSON.parse(fileContent));
       });
   }
};
