let i=1;
let total=0;
function rbb(){
    let cost=document.getElementById('cost').value;
    let scrap=document.getElementById('scrap').value;
    let year=document.getElementById('life').value;
    let rate;

    if(!(cost.length && scrap.length && year.length)) return;

    rate=(1-Math.pow((scrap/cost),1/year))*100;
    let des=[];
    document.getElementById('out1').innerHTML="rate:"+rate.toFixed(2)+"%";
    
    for (; i <= year; i++) {
        
       des[i]=(cost*rate)/100;
       document.getElementById('out2').innerHTML+=i+ " year Depreciation = LKR: "+des[i].toFixed(2)+"</br>";
       cost=cost-des[i];
       total+=des[i];
    }
    document.getElementById('out3').innerHTML="Total Depreciation = LKR: "+total.toFixed(2);
    
}
function rbb2(){
    document.getElementById('cost').value="";
    document.getElementById('scrap').value="";
    document.getElementById('life').value="";
        
    
        document.getElementById('out1').innerHTML="";     
        document.getElementById('out2').innerHTML="";
        document.getElementById('out3').innerHTML="";
        i=1;
        total=0;
}
//     for (let i = 0; i < 5; i++) {
//         text += "The number is " + i + "<br>";
//       }
      
//       document.getElementById("demo").innerHTML = text;
// }