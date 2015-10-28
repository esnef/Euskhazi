/*
 * $Id: objects.js Oct 9, 2015 9:45:18 AM tta1516$
 * 
 * Copyright (C) 2015 Maider Huarte Arrayago
 * 
 * TTA1516_LS-EX_08v5_www.zip is based on templates by Eclipse.org - Thym and it is intended
 * for learning purposes only.
 * 
 * TTA1516_LS-EX_08v5_www.zip is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version.
 * 
 * TTA1516_LS-EX_08v5_www.zip is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details
 * <http://www.gnu.org/licenses/>.
 */
/*
var user={
		name:null,
		pass:null
}
*/
var users=new Array();
var keyUsers="users"
function User() {
	  var name="";
	  var pass="";
}
//EXAMS
var fileFolder="exams/";
var fileNameBerridazketak="berridazketak.json";
var level="B1";
var exams=null;
//BERRIDAZKETAK INIT
function loadDataJSONBerridazketak(fileName,level){
	$.getJSON(fileFolder+level+'/'+fileName, function(json) {
	    console.log(json); // this will show the info it in firebug console
	    exams=json;
	    var pageDiv="";
	    //Creamos todos los div pertinentes de los examenes Berridazketak
	    for(con=0;con<exams.length;con++){
	    	pageDiv=pageDiv+pageBerridazketak.create(con,exams);
	    }
	    //Los introducimos en el body
	    $("body").append(pageDiv);
	});	
}
var pageBerridazketak={
		create: function(i,exams){
			if(exams==null){
				alert("No se ha podido presentar en pantalla porque se ha pasado un valor menos a uno");
				return null;
			}else if(i>=exams.length){
				alert("No se puede solicitar un numero de examen superior al que se tiene");
				return null;
			}
			var pageDiv=$('<div data-role="page" id="example_page_berridazketa-exam-'+i+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Berridazketak '+i+'</h1>'+
				'</div>';
			
			var statementsDivs="";
			
			for(var con=0;con<exams[i].statements.length;con++){
				statementsDivs=statementsDivs+
				'<div id="result_label_berridazketa-exam-'+i+'-level-statement-'+con+'" class="ui-field-contain">'+
				'<p name="result_label_berridazketa-exam-'+i+'-level-statement-'+con+'" id="result_label_berridazketa-exam-'+i+'-statement-'+i+'">'+exams[i].statements[con].statement+'</p>'+
				'<input  name="result_label_berridazketa-exam-'+i+'-level-statement-'+con+'" id="result_label_berridazketa-exam-'+i+'-answer-'+i+'" data-clear-btn="true" value="" type="text" placeholder="'+exams[i].statements[con].placeholder+'"/>'+
				'</div>'
				;
			}
			
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;width:60%;"><h4 style="margin-bottom:1%;"></h4></div>'+
						'<div class="ui-block-c" style="text-align:right;width:20%;">'+
						'</div>'+
					'</div>'+
				'</div>';
			pageDiv.append(headerDiv,contentDiv,footerDiv);
			return pageDiv;
		},
		load: function(i) {
			
			alert("load1");
			/*
		 	$("#question-"+i).text("QUESTION "+i+": "+tests.test[i].question);
		 	*/
			/*
		 	$("label[id|='label-radio-choice-"+i+"']").each(
		 			function(index) {     				
		 				$(this).text(tests.test[i].resp[index]);     				
				    }
		 	);
		 	*/
		 	/*
		 	$("#prev-"+i).attr("href","#page-"+(i-1));
		 	$("#next-"+i).attr("href","#page-"+(i+1));
				alert("load7");
			*/
		}
			
};
function loadBerridazketak(level){
	if(level==null){
		alert("Error en el nivel de examen");
	}
	loadDataJSONBerridazketak(fileNameBerridazketak,level);
}
var examsBerridazketak=new Array();

function examsBerridazketak(){
	var statementsBerridazketak=new Array();
}
function statementsBerridazketak(){
	var statementBerridazketak="";
	var solutionBerridazketak="";	
}
function keywordsBerridazketak(){
	var keywordsBerridazketak=new Array(); 
}
function keywordBerridazketak(){
	var value="";
	var location=0;
	var precede=null;
}
//BERRIDAZKETAK END



