
function dep1(){
let cost=document.getElementById('cost').value;
let scrap=document.getElementById('scrap').value;
let year=document.getElementById('year').value;

let yd,td;
if(!(cost.length && scrap.length && year.length)) return;
yd=(cost-scrap)/year;
td=cost-scrap;
 
    document.getElementById('dis1').innerHTML="Each Year has same depreciation value.";     
    document.getElementById('dis2').innerHTML="Each Year depreciation value = LKR:"+yd.toFixed(2);
    document.getElementById('dis3').innerHTML="Total depreciation value     = LKR:"+td.toFixed(2);
}

function dep2(){
    document.getElementById('cost').value="";
    document.getElementById('scrap').value="";
    document.getElementById('year').value="";
        
        document.getElementById('dis1').innerHTML="";     
        document.getElementById('dis2').innerHTML="Each Year depreciation value = LKR:";
        document.getElementById('dis3').innerHTML="Total depreciation value     = LKR:";
    }

