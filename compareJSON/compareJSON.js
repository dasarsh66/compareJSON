/*
Compare two JSON
Load key, value pairs,
*/
var jsonDiff = require('json-diff')

var readline = require('readline');

var stream = require('stream');

const AWS = require('aws-sdk');


const Parser = require('stream-json/Parser');
const parser = new Parser();
var fs = require('fs')



function HashTable(obj)
{
    this.length = 0;
    this.items = {};
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            this.items[p] = obj[p];
            this.length++;
        }
    }

    this.setItem = function(key, value)
    {
        var previous = undefined;
        if (this.hasItem(key)) {
            previous = this.items[key];
        }
        else {
            this.length++;
        }
        this.items[key] = value;
        return previous;
    }

    this.getItem = function(key) {
        return this.hasItem(key) ? this.items[key] : undefined;
    }

    this.hasItem = function(key)
    {
        return this.items.hasOwnProperty(key);
    }
   
    this.removeItem = function(key)
    {
        if (this.hasItem(key)) {
            previous = this.items[key];
            this.length--;
            delete this.items[key];
            return previous;
        }
        else {
            return undefined;
        }
    }

    this.keys = function()
    {
        var keys = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                keys.push(k);
            }
        }
        return keys;
    }

    this.values = function()
    {
        var values = [];
        for (var k in this.items) {
            if (this.hasItem(k)) {
                values.push(this.items[k]);
            }
        }
        return values;
    }

    this.each = function(fn) {
        for (var k in this.items) {
            if (this.hasItem(k)) {
                fn(k, this.items[k]);
            }
        }
    }

    this.clear = function()
    {
        this.items = {}
        this.length = 0;
    }
}


var h = new HashTable();
index = 0;
var JSONStream = require('JSONStream');
var es = require('event-stream');
var bool = false;




var stream1 = fs.createReadStream('C:/Users/v_dmanikon/Documents/Product_chrismo/other/Product_20190522_120440799.Json', {encoding: 'utf8'}),
    parser1 = JSONStream.parse('skus.*');

   stream1.pipe(parser1);

parser1.on('data', function (data) {
 // console.log('SKU number is :  '+data.sku);
  //console.log('SKU number is :  '+data);
  h.setItem(data.sku,data); // whatever you will do with each JSON object
});
parser1.on('end', function (data) {

  console.log('----------------------------------------------Read all the objects onto Hash Map------------------------------------------------');
  console.log('Memory used is ' +process.memoryUsage().rss);
  check(); // whatever you will do with each JSON object
});
parser1.on('error', function (data) {
console.log('Error while parsing the chrismo '+data);
 
});


var check =  function () {

  var stream1 = fs.createReadStream('C:/Users/v_dmanikon/Documents/Product_chrismo/Product_20190522_120440799.Json', {encoding: 'utf8'}),
      parser1 = JSONStream.parse('skus.*');
  
    stream1.pipe(parser1);
  
  parser1.on('data', function (data) {
   // console.log('SKU number is :  '+data.sku);
    //console.log('SKU number is :  '+data);
   
    if( h.hasItem((data.sku)) == false){
      console.log('The following item is not available in GISMO '+ data.sku);
     // console.log('Memory usage in the  second '+process.memoryUsage().rss);
    }
    else if(jsonDiff.diff(data, h.getItem(data.sku))!=undefined){
  
      console.log(' Sku number  ' +data.sku+'  changes at   '+'   '+jsonDiff.diffString(data, h.getItem(data.sku)));
      console.log('-----------------');
      console.log('Memory usage in the  second '+process.memoryUsage().rss);
    }
    
  });
  parser1.on('end', function (data) {
    console.log('----------------------------------------------Second parse ended ------------------------------------------------');
   console.log('Memory used by the end ' +process.memoryUsage().rss); // whatever you will do with each JSON object
  });
  parser1.on('error', function (data) {
    console.log('Error while parsing the gismo '+data);
     
    });
  };
  
