let total = 0;
function cal1() {
  var cost = document.getElementById("cost").value;
  var scrapvalue = document.getElementById("scrap").value;
  var number_of_production = document.getElementById("unit").value;
  var production = document.getElementById("punit").value;

  if (
    !(
      cost.length &&
      scrapvalue.length &&
      number_of_production.length &&
      production.length
    )
  )
    return;

  var pub = ((cost - scrapvalue) / number_of_production) * production;
  total = total + pub;
  document.getElementById("value").innerHTML =
    "This Year depreciation value = LKR:" + pub;
  document.getElementById("total").innerHTML =
    "Total depreciation value     = LKR:" + total;
}

function cal2() {
  document.getElementById("cost").value = "";
  document.getElementById("scrap").value = "";
  document.getElementById("unit").value = "";
  document.getElementById("punit").value = "";

  document.getElementById("value").innerHTML =
    "Each Year depreciation value = LKR:";
  document.getElementById("total").innerHTML =
    "Total depreciation value     = LKR:";
}
