var stream = require('stream');
var fs = require('fs')
var observableDiff = require('deep-diff').observableDiff;

var paths = [
 "legacy_product_id",
 "master,id",
 "vendor_name",
 "vendor_part_number",
 "allspark_id",
 "developer_name",
 "publisher",
 "category_code",
 "family_name",
 "franchise_name",
 "is_drop_ship_only",
 "is_drop_ship",
 "is_embargoed",
 "street_date",
 "color",
 "color_tech",
 "platform_name",
 "edition",
 "carriers",
 "memory_size",
 "base_product_sku_upc", // it is in barcodes
 "tradein_value",
 "is_tradein",
 "end_of_life_date",
 "first_received_date",
 "eta_date",
 "preload_date",
 "web_publisher_name",
 "brand_name",
   "size",
  "display_title",
  "esrb_rating",
  "manufacturer_name",
  "barcodes,upc",
  "barcodes,base_product_upc"
]
  
var stream = fs.createWriteStream("append.txt", {flags:'a'});



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

var stream1 = fs.createReadStream('C:/Users/v_dmanikon/Documents/Product_chrismo/latest/Product_20190601_102312405/Product_20190601_102312405.Json', {encoding: 'utf8'}),
    parser1 = JSONStream.parse('skus.*');

   stream1.pipe(parser1);

parser1.on('data', function (data) {
 
  h.setItem(data.sku,data);
  count++;
});
parser1.on('end', function (data) {

 check();
});
parser1.on('error', function (data) {
console.log('Error while parsing the chrismo '+data.sku);
});

target =0 ;
var check =  function () {
  //              C:/Users/v_dmanikon/Documents/og_product_gismo.json
// gismo          /C:/Users/v_dmanikon/Documents/Product_gismo/product-full_20190602100006875/product-full_20190602100006875.json
  var stream1 = fs.createReadStream('C:/Users/v_dmanikon/Documents/Product_gismo/product-full_20190602100006875/product-full_20190602100006875.json', {encoding: 'utf8'}),
      parser1 = JSONStream.parse('skus.*');
    start = false;
    stream1.pipe(parser1);
  
  parser1.on('data', function (data) {
        start = false;
    
    if( h.hasItem((data.sku)) == false){
     console.log('The following item is not available in Chrismo '+ data.sku);
      stream.write("The following sku is not available in Chrismo "+data.sku+"\n");
     //console.log('Memory usage in the  second '+process.memoryUsage().rss);
    }
      else{
        observableDiff(h.getItem(data.sku) , data , function (d) {
        
          if(paths.includes(d.path.toString())&&(!d.lhs==""&&d.rhs==null)){
              if(start==false){
            stream.write("<------     Errors for sku     "+data.sku+"     ------>"+"\n");
                      start = true;
                      }  
           stream.write(d.path+"-|"+"\n"+"Chrismo -> "+d.lhs+"\n"+"Gismo -> "+d.rhs+"\n");
        }
        });
        
      }
  }); 
  
  parser1.on('error', function (data) {
   console.log('Error while parsing the gismo '+data);
     
    });
    parser1.on('end', function (data) {
      stream.end();
 
      console.log('Memory used in the beggining  ' +process.memoryUsage().rss+'  Objects diff is '+count2);
      });
  };