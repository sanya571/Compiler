var container=document.getElementById("container");

function main()
{
  
  var text=document.createElement("textarea");
  text.setAttribute("id","textarea");
  text.setAttribute("placeholder","//write your code here");
  container.appendChild(text);

  var output=document.createElement("div");
  output.setAttribute("id","outputContainer");
  output.innerHTML="OUTPUT:"
  container.appendChild(output);

  var compileButton=document.createElement("button");
  compileButton.setAttribute("id","compileButton");
  compileButton.innerHTML="compile";
  container.appendChild(compileButton);

  compileButton.addEventListener("click",sendData);
}


function sendData()
{

  var text=document.getElementById("textarea");
  var langId;
  var data=text.value;
  var langselector=document.getElementById("langselector");

  if(langselector.value=="Javascript")
  langId=4;
  else if(langselector.value=="Python")
  langId=0;
  else if(langselector.value=="C")
  langId=7;
  else if(langselector.value=="CPP")
  langId=77;
  else
  langId=8;

  console.log(data)
  console.log(langId)


  var request=new XMLHttpRequest();
  request.open("POST","https://codequotient.com/api/executeCode");
  request.setRequestHeader("Content-type","application/json");
  request.send(JSON.stringify({ code : data , langId : `${langId}`}));
  //request.addEventListener("load",function(event)
  //{
       
   setTimeout(function()
   {
     console.log(langId)
    var response=JSON.parse(request.responseText); 
    console.log(response.codeId)
    handleResponse(response.codeId)
   },3000);
    
  //});
}

function handleResponse(response)
{
  var text=document.getElementById("textarea");
  
   if(text.innerHTML!=null)
   {
     var request=new XMLHttpRequest();
     
    // var codeId=response.codeId;
     request.open("GET",`https://codequotient.com/api/codeResult/${response}`);
     request.send();

     request.addEventListener("load",function(event)
     {
     var  output=document.getElementById("outputContainer");
     var finaloutput=JSON.parse(event.target.responseText);
      finaloutput=JSON.parse(finaloutput.data);
      if(finaloutput.output!="")
      {
        var  outputData=finaloutput.output;
        output.innerHTML=outputData;
      }
     else
      output.innerHTML=finaloutput.errors;
     });
   }
   
 else
   window.alert("code is null");
  }



main();


