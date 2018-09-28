var parser={
    objstarti:0,
    objendi:0,
    position:0,
    openObjectCount: 0,
    openArrayCount: 0,
    remString : '',
    callbacks: {
      'onObjectCreated': []
    },
    objArray : new Array(),
    createObject: (obj) => {
      for (var i=0; 'onObjectCreated' in parser.callbacks && i<parser.callbacks['onObjectCreated'].length; i++)
              parser.callbacks['onObjectCreated'][i](obj);
    },
    addListener: (eventname, handler) => {
      parser.callbacks[eventname].push(handler);
    },
    write : (url,opts = {}) => {
      const decoder = new TextDecoder('utf-8');
      fetch(url, opts).then(function(response) {
        var reader = response.body.getReader();
        
        function search() {
          reader.read().then(function(result) {
      
            // console.log(decoder.decode(result.value));
            if (result.done) {
              console.log("completed reading");
              return ;
            }
      
              console.log("**********function execution***********************")
              JSONParser(decoder.decode(result.value))
              // console.log(result)
      
             search();
          })
        }
        search();
      });
  
      function JSONParser(data){
              
              data = parser.remString + data;
        
              parser.openObjectCount=0;
              parser.objstarti=0;
              parser.objendi=0;
              let c,x =0;
              c = data[0]
        
              while(c){
              c = data.charAt(x++);
              parser.position++;
        
              if(c==='['){
                  parser.openArrayCount++;
              }
              if(c==='{'){
                 
                  if(parser.openObjectCount===0){
                      parser.objstarti=x-1;
                  }
                  parser.openObjectCount++;
              }
              if(c==='}'){
                  parser.openObjectCount--;
                  if(parser.openObjectCount===0){
                      // console.log("ojendi assign",parser.objstarti,  x);
                      parser.objendi = x-1;
        
                  let extObj = data.substring(parser.objstarti, parser.objendi+1);
          
                  parser.createObject(extObj)
                  // break;
                  }
              }
        
              if(c===']'){
                  parser.openArrayCount--;
                  if(parser.openArrayCount===0){
                      console.log("end of array of objects");
                  }
              }
        
          }
          
          parser.remString = data.substring(parser.objendi+1, data.length);
          // console.log("remstring",parser.remString);
          // console.log("**************************************","*****************************************************************"    );
          // console.log("----",parser.remString)
        }
    }
  
  };

export default parser;
  
