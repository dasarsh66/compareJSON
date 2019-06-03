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


var diff = require('deep-diff')


var observableDiff = require('deep-diff').observableDiff;
var applyChange = require('deep-diff').applyChange;


 items = {};
// C:/Users/v_dmanikon/Documents/json_Tests/copy_Uncompressed // C:/Users/v_dmanikon/Documents/json_Tests/un_compressed
 

 items[0] = lhs;
 items[1] = rhs;


// Before pushing into it
observableDiff(lhs , rhs , function (d) {
  // Apply all changes except to the name property...
 // console.log(d.path);
  //  console.log(d.path[0]);
  if(paths.includes(d.path[0])){
 // console.log(d);
 // console.log('---------------');
}
  else{
   //  console.log(d.path.toString()); 
    } 

});

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
count = 0;
var JSONStream = require('JSONStream');
var es = require('event-stream');
var bool = false;



// chrismo 
var stream1 = fs.createReadStream('C:/Users/v_dmanikon/Documents/Product_chrismo/4.1.0/Product_20190528_144553856.Json', {encoding: 'utf8'}),
    parser1 = JSONStream.parse('skus.*');

   stream1.pipe(parser1);

parser1.on('data', function (data) {
  //  console.log('Printing first doc');
  
  if(data.sku=='136108'){
   console.log('Sku 136108 found  ');
   // console.log(data);
   lhs=data;
}   

  h.setItem(data.sku,data); // whatever you will do with each JSON object
  count++;
});
parser1.on('end', function (data) {

 ///console.log('Memory used in the beggining  ' +process.memoryUsage().rss);
 //console.log('Total Objects '+count);
  check();
});
parser1.on('error', function (data) {
console.log('Error while parsing the chrismo '+data.sku);
});

var count2=0;
target =0 ;
var check =  function () {
// gismo
  var stream1 = fs.createReadStream('C:/Users/v_dmanikon/Documents/Product_gismo/product-full_20190524120444040.json', {encoding: 'utf8'}),
      parser1 = JSONStream.parse('skus.*');
  
    stream1.pipe(parser1);
  
  parser1.on('data', function (data) {
      
    if(target<2){
        //console.log('Sku 971091');
      //  console.log(data);
    target++;
    }
    



    if( h.hasItem((data.sku)) == false){
    // console.log('The following item is not available in GISMO '+ data.sku);
     //console.log('Memory usage in the  second '+process.memoryUsage().rss);
    }
      
     
    else if(jsonDiff.diff(data, h.getItem(data.sku))!=undefined){
        //    console.log('They dont match '+data.sku);
     // console.log(' Sku number  ' +data.sku+'  changes at   '+'   '+jsonDiff.diffString(data, h.getItem(data.sku)));
    //  console.log('-----------------');
    //  console.log('Memory usage in the  second '+process.memoryUsage().rss);

    observableDiff(lhs , rhs , function (d) {
      // Apply all changes except to the name property...
     // console.log(d.path);
      //  console.log(d.path[0]);
      if(paths.includes(d.path[0])){
      console.log(d);
     // console.log('---------------');
    }
      else{
       //  console.log(d.path.toString()); 
        } 
    
    });



    count2++;
    }
    else if(jsonDiff.diff(data, h.getItem(data.sku))==undefined){
          //  console.log('They  match     '+data.sku);
    }
    else{
     //   console.log('in Else '+data.sku);
    } 
  });
  parser1.on('error', function (data) {
  //  console.log('Error while parsing the gismo '+data);
     
    });
    parser1.on('end', function (data) {

 
     //   console.log('Memory used in the beggining  ' +process.memoryUsage().rss+'  Objects diff is '+count2);
      });
  };