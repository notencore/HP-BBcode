/*
 HP Bars
 Simple n' easy HP Bar script. Copy and paste into your Headers & Footers for Proboards users.
 (C) 2015 Kristian Walker & Josh Smith, licensed under the ZLIB license.
 Contact: en_co_re@yahoo.ca

 Programming: Kristian Walker
 Design & HTML: Josh Smith
*/
var messages = document.getElementsByClassName('message');

renderHealthBars(messages);

/*
renderHealthBars
Finds all the [HP=minHP,maxHP] BBCode and replaces it.

Args: DOM Object obj
Returns: Null
Side Effects: Replaces all the HP tags with HP Bar objects.
*/
function renderHealthBars(obj) {
 for (i = 0; i < obj.length; i++) {
	 var matches = obj[i].innerHTML.match(/\[ *((\w*)?\'?s?) *hp *= *([0-9]+) *((,|\/) *([0-9]+)) *\]/gi);
  if (matches) {
   for (i2 = 0; i2 < matches.length; i2++) {
	var HPNam = matches[i2].match(/ *((\w*)?\'?s?) *hp/gi);
	   HPNam = HPNam[0].replace(/hp/gi, "");
	   console.log(HPNam);
    var HPVals = matches[i2].match(/([0-9]+)/gi);
    var currentHP = HPVals[0];
    var maxHP = HPVals[1];
    var color = healthStatus(currentHP, maxHP);
	var hpWidth = healthWidth(maxHP);
    if (Number(currentHP) <= Number(maxHP)) {
		obj[i].innerHTML = obj[i].innerHTML.replace(/\[ *((\w*)?\'?s?) *hp *= *([0-9]+) *((,|\/) *([0-9]+)) *\]/i, "<div style='clear: left; float:left; margin-right: 0.5em;'><font color='"+color+"'><sup>"+HPNam+"HP"+"</sup></font></div><div title='HP: " + currentHP + " / " + maxHP + "' style='float: left; margin-right: 0.5em; background-color:#555555; border: solid 1px #DDD; border-radius:5px; height: 10px; width: "+hpWidth+"px; padding:1px;'><div style='background-color:"+color+"; float: left; border-radius:5px; height: 100%; width: " + (Number(currentHP) / Number(maxHP)) * 100 + "%;'></div></div>");
    } else if (Number(currentHP) > Number(maxHP) && Number(currentHP) <= (Number(maxHP) * 1.5)) {
		obj[i].innerHTML = obj[i].innerHTML.replace(/\[ *((\w*)?\'?s?) *hp *= *([0-9]+) *((,|\/) *([0-9]+)) *\]/i, "<div style='clear: left;float:left; margin-right: 0.5em;'><font color='"+color+"'><sup>"+HPNam+"HP"+"</sup></font></div><div title='HP: " + currentHP + " / " + maxHP + "' style='float: left; margin-right: 0.5em; background-color:#555555; border: solid 1px #DDD; border-radius:5px; height: 10px; width: "+hpWidth+"px; padding:1px;'><div style='background-color:"+color+"; float: left; border-radius:5px; height: 100%; width: "+hpWidth+"px;'><div style='background-color:#88FF88; float: left; border-radius: 5px; height: 100%; width: " + ((Number(currentHP) / Number(maxHP)) - 1) * 200 + "%;'></div></div></div>");
	 } else if (Number(currentHP) > (Number(maxHP) * 1.5) && Number(currentHP) < (Number(maxHP) * 2)){
		obj[i].innerHTML = obj[i].innerHTML.replace(/\[ *((\w*)?\'?s?) *hp *= *([0-9]+) *((,|\/) *([0-9]+)) *\]/i, "<div style='clear: left;float:left; margin-right: 0.5em;'><font color='#88FF88'><sup>"+HPNam+"HP"+"</sup></font></div><div title='HP: " + currentHP + " / " + maxHP + "' style='float: left; margin-right: 0.5em; background-color:#555555; border: solid 1px #DDD; border-radius:5px; height: 10px; width: "+hpWidth+"px; padding:1px;'><div style='background-color:#88FF88; float: left; border-radius:5px; height: 100%; width: "+hpWidth+"px;'><div style='background-color:#FFF; float: left; border-radius: 5px; height: 100%; width: " + ((Number(currentHP) / Number(maxHP)) - 1.5) * 200 + "%;'></div></div></div>");
	} else if (Number(currentHP) >= (Number(maxHP) * 2)){
		obj[i].innerHTML = obj[i].innerHTML.replace(/\[ *((\w*)?\'?s?) *hp *= *([0-9]+) *((,|\/) *([0-9]+)) *\]/i, "<div style='clear: left;float:left; margin-right: 0.5em;'><font color='#88FF88'><sup>"+HPNam+"HP"+"</sup></font></div><div title='HP: " + currentHP + " / " + maxHP + "' style='float: left; margin-right: 0.5em; background-color:#555555; border: solid 1px #EEE; border-radius:5px; height: 10px; width: "+hpWidth+"px; padding:1px;'><div style='background-color:#DDDDDD; float: left; border-radius:5px; height: 100%; width: 100%;'></div></div>");
    }
   }
  }
 }
 return null;
}

/*
 healthStatus
 Returns a colour associated with the HP ratio value.

 Args: Number currentHP, Number maxHP
 Returns: String ratioColour
 Side Effects: None
*/
function healthStatus(currentHP, maxHP) {
 ratio = Number(currentHP) / Number(maxHP);
 if (ratio > 0.65) {
  return "#44BB44";
 } else if ( ratio > 0.35) {
  return "#EAD255";
 } else if ( ratio >= 0)  {
  return "#E05262";
 } else {
  return "#000000";
 }
}

/*
Max Width
Manages how wide the Health Bar can be
*/
function healthWidth(maxHP) {
	defWidth = Number(maxHP) * 0.05;
	if (defWidth > 350) {
		return 350;
	} else if (defWidth < 15) {
		return 15;
	} else {
		return defWidth;
	}
}
