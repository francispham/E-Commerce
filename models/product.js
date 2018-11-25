// Storing Data in Files:
// const products = [];
const fs = require('fs');
const path = require('path');

// Helper Functions for Refactoring: 
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    
    // After Refactoring:
    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    }
 
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
 };
    /*
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
    
    // static fetchAll() {
    //      return products;
    // }
    
    // For Fetching data from File: 
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
    */
    
