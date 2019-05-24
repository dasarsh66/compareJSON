
/*
var stream2 = fs.createReadStream('C:/Users/v_dmanikon/Documents/product_chrismo.json', {encoding: 'utf8'}),
    parser2 = JSONStream.parse('skus.*');

stream2.pipe(parser2);

parser2.on('data', function (obj) {
  console.log('third J'); // whatever you will do with each JSON object
});
parser2.on('end', function (obj) {
  
  console.log('Second one ended'); // whatever you will do with each JSON object
  check();
});
 */




var put = async function () {
    // Previous location C:/Users/v_dmanikon/Documents/json_Tests/un_compressed' C:/Users/v_dmanikon/Documents/Product_chrismo/Product_20190522_120440799.Json
  fileStream = fs.createReadStream('C:/Users/v_dmanikon/Documents/other/product_gismo.json', { encoding: "utf8" });
  //"customers.*"   ['rows', true,'doc','sku']
  
  fileStream.pipe(JSONStream.parse("skus.*")).pipe(
    es.through(function(data) {
      console.log('First ');
     this.pause();
     h.setItem(data.sku,data);
     //processOneRow(data, this);
     this.resume();
   // console.log('Memory usage in the  first '+process.memoryUsage().rss);
     // return data;
    }),
    function end() {
      console.log("stream reading ended");
      this.emit("end");
    }
    
  ); 
};
 
/*--------------------------- C:/Users/v_dmanikon/Documents/product_chrismo.json*/
/*          C:/Users/v_dmanikon/Documents/other/product_gismo.json-------------------------- */

//await put();
//await check();






  
  
  function processOneRow(data, es) {
     // console.log('Printing data  '+JSON.stringify(data));
  //   console.log('Printing sku '+h.length);
     h.setItem(data.sku,data);

     
    //  console.log('Objects '+JSON.stringify(data));
     //console.log("Printing all values in map "+JSON.stringify(h.getItem(data.doc.sku)));
    /* 
      for (var index = 0; index < 20; index++) {
        h.setItem(data.sku+index, data);
        
      }*/
       
      
        


    //  console.log(h.length);
     // console.log(data);
      /// console.log('----Done-------');
      es.resume();
  
      /*
    parser = JSONStream.parse(['doc', true,'sku']);
  
    parser.on('data', function(data) {
      console.log('received:', (data));
      // json1 = JSON.stringify(data);
       //return data; ['rows', true, 'doc']
      
     });  */
  
   
  
     
  }

  /*fileStream.pipe(JSONStream.parse("skus.*")).pipe(
  
    es.through(function(data) {
  
      //console.log('Second ');
      
      if( h.hasItem((data.sku)) == false){
        console.log('The following item is not available in GISMO '+ data.sku);
       // console.log('Memory usage in the  second '+process.memoryUsage().rss);
      }
      else if(jsonDiff.diff(data, h.getItem(data.sku))!=undefined){
  
        console.log(' Sku number  ' +data.sku+'  changes at   '+'   '+jsonDiff.diffString(data, h.getItem(data.sku)));
        console.log('-----------------');
        console.log('Memory usage in the  second '+process.memoryUsage().rss);
      }
      
         // else {
      //   console.log('Not processed '+data.sku);
  //     (jsonDiff.diff(data, h.getItem(data.sku))!=undefined) 
      // }
      
     // return data;
    }),
    function end() {
      console.log("stream reading ended");
      this.emit("end");
    }
  ); */



/*
let objectCounter = 0;
parser.on('data', data => data.name === 'startObject' && ++objectCounter);
parser.on('end', () => console.log(`Found ${objectCounter} objects.`));

fs.createReadStream('C:/Users/v_dmanikon/Documents/json_Tests/un_compressed').pipe(parser);
*/


/*
var json1;
var json2;

var JSONStream = require('JSONStream');
var es = require('event-stream');


 fs.readFileSync('C:/Users/v_dmanikon/Documents/json_Tests/un_compressed',function(err){
    
      if (err) {
      console.log('Found error for file 2 '+err);
    }  else{
      console.log('sss');
console.log('Memory usage in the  1 '+process.memoryUsage().rss);
}

});

*/




/*------------------------------------*/
/*
   Create a hashCode for each object and store it in that position
   Parse an object one by one from new file create a hashcode for it pull it up and then compare the rest
   First test the data if is
*/


 // console.log("Getting Hash Map objects "+h.getItem("000002"));


 
 
var getStream = function () {
    var jsonData = 'C:/Users/v_dmanikon/Documents/product_chrismo.json',
        stream = fs.createReadStream(jsonData, {encoding: 'utf8'}),
        parser = JSONStream.parse("skus.*");   
       
        /*parser.on('data', function(data) {
          console.log('one ');
          console.log('---one done-----');
      //    console.log('received:', (data));
         // json1 = JSON.stringify(data);
          //return data; ['rows', true, 'doc']
        }); */

        return stream.pipe(parser);
};


var putStream = function () {
  var jsonData = 'C:/Users/v_dmanikon/Documents/other/product_gismo.json',
      stream = fs.createReadStream(jsonData, {encoding: 'utf8'}),
      parser = JSONStream.parse("skus.*");
     
      

      return stream.pipe(parser);
};
 
/* 
getStream()
  .pipe(es.mapSync(function (w) {
    console.log('---  In a -----');

    //h.setItem(data.sku,data);
   //  console.log('val '+data.key);
   
  }));

  putStream()
  .pipe(es.mapSync(function (w) {
    console.log('---  In b -----');
   // h.setItem(data.sku,data);
   //  console.log('val '+data.key);
  }));
*/



  //  jsonDiff.diff(json1,json2);


// Current Method of reading two files
/*
const lineByLine = require('n-readlines'); 
console.log('Memory usage initially '+process.memoryUsage().rss);

const liner = new lineByLine('C:/Users/v_dmanikon/Documents/product_chrismo.json');  
const liner1 = new lineByLine('C:/Users/v_dmanikon/Documents/other/product_gismo.json');
console.log('Memory usage after loading files '+process.memoryUsage().rss);


let line;
let line1;
console.log();

///((line1 = liner1.next()) ||  console.log(line.toString('ascii'));
line1 = liner1.next();
line = liner.next();
//console.log(line.toString('ascii'));
//console.log(line1.toString('ascii'));
console.log('Memory usage after loading lines '+process.memoryUsage().rss);

while ( line1 != false && line != false ) {

 //console.log(line1.toString('ascii'));
 //console.log(line.toString('ascii'));
  line1 =  liner1.next();
  line =  liner.next();
  
/*if(jsonDiff.diff(line.toString('ascii'),line1.toString('ascii'))!=undefined){
//  console.log(jsonDiff.diff(line.toString('ascii'),line1.toString('ascii')));
 
}  
  
  //  line1 = false;
  
} */


/*
lineReader.open('/path/to/file', function(reader) {  
    if (reader.hasNextLine()) {
        reader.nextLine(function(line) {
           // console.log(line); 

    }
});  */

// Second method to read the file line by line
/*
var count = 0;
var count1 = 1;
//console.log('dd');

rl.on('line',(line)=>{
   count++;
   // update a value pause tringger event b
  //  console.log(`Received: ${line}`);
    

});
rl1.on('line',function(line){
   //once a line is read resume pause a and event a
    count1++;


});
rl.on('close',function(){
  //console.log('dd');
    console.log(count);
})

rl1.on('close',function(){
    //console.log('dd');
    console.log(count1);
})
  var testContent = fs.readFileSync("C:/Users/v_dmanikon/Downloads/example_1.json", "utf8");
  var testContent1 = fs.readFileSync("C:/Users/v_dmanikon/Downloads/example_1.json", "utf8");
  var a ={
    "quiz": {
        "sport": {
            "q1": {
                "question": "Which one is correct team name in NBA?",
                "options": [
                    "New York Bulls",
                    "Los Angeles Kings",
                    "Golden State Warriros",
                    "Huston Rocket"
                ],
                "answer": "Huston Rocket"
            }
        },
        "maths": {
            "q1": {
                "question": "5 + 7 = ?",
                "options": [
                    "10",
                    "11",
                    "12",
                    "13"
                ],
                "answer": "12"
            }
        }
    }
};
  var b = { foo: 'baz',v:'d'};
 //c console.log(jsonDiff.diffString(a,b ));

  
 // console.log(jsonDiff.diff({ foo: 'bar' }, { foo: 'baz' }))


    var lineCount =0;
*/



// Third Method to read the file via native FS read file
/*
fs.readFile('C:/Users/v_dmanikon/Download/example_1.json', 'utf-8', function (err, fileContents) {
    if (err) throw err;
    
    //console.log(JSON.parse(fileContents));
  });
  
  var testContent = fs.readFileSync("C:/Users/v_dmanikon/Downloads/example_1.json", "utf8");
  var testContent1 = fs.readFileSync("C:/Users/v_dmanikon/Downloads/example_1.json", "utf8");
  //var res = _.isEqual(large, large2);fs.createReadStream()
   
  if(JSON.stringify(testContent) === JSON.stringify(testContent1))
   {
    console.log('True');
   }
   else{
       console.log('False');
   }  */
