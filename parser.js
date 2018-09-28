    function MyJSONParser(){
        this.objstarti = 0;
        this.objendi = 0;
        this.openArrayCount =0;
        this.openObjectCount=0;

        this.write = function(url,opts){

            const decoder = new TextDecoder('utf-8');
            fetch(url).then(function(response) {
              var reader = response.body.getReader();
              
              function search() {
                reader.read().then(function(result) {
        
                  // console.log(decoder.decode(result.value));
                  if (result.done) {
                    console.log("completed reading");
                    return ;
                  }
                  else{
                    JSONParser(decoder.decode(result.value))
                  }
        
                   search();
                })
              }
              search();
            });
          
            function JSONParser(data){
            
                    data = this.remString + data;
            
                    this.openObjectCount=0;
                    parser.objstarti=0;
                    parser.objendi=0;
                    let c,x =0;
                    c = data[0]
            
                    while(c){
                    c = data.charAt(x++);
            
                    if(c==='['){
                        this.openArrayCount++;
                    }
                    if(c==='{'){
                        
                        if(this.openObjectCount===0){
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
                        
                        parser.onobjectCreated(extObj);
                        console.log("**************************************",z,"*****************************************************************"    );
                        z++;
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
            }
        }

    }

    var parser = new MyJSONParser();

    module.exports = parser;
    
