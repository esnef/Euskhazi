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
//var level="B1";
var exams=null;
//BERRIDAZKETAK INIT
function loadDataJSONBerridazketak(fileName,level){
	$.getJSON(fileFolder+level+'/'+fileName, function(json) {
	    console.log(json); // this will show the info it in firebug console
	    exams=json;
	    var pageDiv;
	    pageDiv=pageBerridazketak.createMenu(exams,level);
    	//No se puede concatenar pageDiv con lo que se debe introducir cada una de las veces como valores independientes 
	    $("body").append(pageDiv);
	    console.log(pageDiv);
	    //Creamos todos los div pertinentes de los examenes Berridazketak
	    for(con=0;con<exams.length;con++){
	    	//No se puede concatenar pageDiv con lo que se debe introducir cada una de las veces como valores independientes 
	    	pageDiv=pageBerridazketak.create(con,exams,level);
	    	$("body").append(pageDiv);
	    }
	    console.log(pageDiv);
	    //Los introducimos en el body
	    
	    $("body").enhanceWithin();
	    //Ahora realizamos el cambio de pantalla a la del menu de examenes
	    if( $('#example_page_menu_exams_berridazketa-level-'+level+'').length )         // use this if you are using id to check
	    {
	    	//Existe.
		    $(':mobile-pagecontainer').pagecontainer('change', '#example_page_menu_exams_berridazketa-level-'+level+'');
		    //Se ejecutara cuando se presiona el boton de corrección
		    $( "a[name='onClickCorrectExams']" ).on( "click", function() {
		    	var id=$(this).attr("id");
		    	if (id.indexOf('correctExams_a_')!=-1 && id.indexOf('berridazketa')!=-1) {
		    		var positionNumExam =id.indexOf('exam-')+'exam-'.length;
		    		var numExam=id[positionNumExam];
		    		var positionlevelExam =id.indexOf('level-')+'level-'.length;
		    		var levelExam=id.slice(positionlevelExam,positionlevelExam+2);
		    		//Sabiendo a que examen nos referimos y que nivel podemos iniciar el proceso de corrección.
		    		//EN primer lugar buscaremos todos los valores de las preguntas dicho examen.
		    		//result_input_berridazketa-exam-'+i+'-level-statement-'+con+'
		    		//result_input_berridazketa-exam-'+i+'-level-'+level+'-statement-'+con+'
		    		//result_label_berridazketa-exam-'+i+'-level-'+level+'-answer-'+i+'
		    		var $inputsStatement=$('input[name|="result_input_berridazketa-exam-'+numExam+'-level-'+level+'"]');
		    		if(exams!=null || $inputsStatement.length){
		    			//var statements=exams[numExam].statements;
		    			var successes=0;
		    			$inputsStatement.each(function( index ) {
		    				//Recorre todos los input sacando los valores para que podamos examinarlo los aciertos comparandolos
		    				var value=$(this).val().trim().toLowerCase();
		    			    var solution=exams[numExam].statements[index].solution.trim().toLowerCase();
		    			    if(value==solution){
		    			    	successes++;
		    			    	var $result_label_error__berridazketa=$('p[id|="result_label_error__berridazketa-exam-'+numExam+'-level-'+level+'-statement-'+index+'"]');
		    			    	if($result_label_error__berridazketa.length){
		    			    		$result_label_error__berridazketa.hide();
		    			    	}
		    			    }else{
		    			    	//NO es igual
		    			    	//result_label_error__berridazketa-exam-'+i+'-level-'+level+'-statement-'+i+'
		    			    	var $result_label_error__berridazketa=$('p[id|="result_label_error__berridazketa-exam-'+numExam+'-level-'+level+'-statement-'+index+'"]');
		    			    	if($result_label_error__berridazketa.length){
		    			    		$result_label_error__berridazketa.show();
		    			    	}
		    			    }
		    			  });
		    			$('#example_h4_correct_answer_berridazketa-exam-'+numExam+'').text("Erantzun zuzena:"+successes);
		    		}else{
		    			alert("Error 10");
		    		}
		    		
		    	}
		    });
	    }else{
	    	alert("Error:"+"No exite el ID de dicha pagina");
	    }
	    
	});	
}

var pageBerridazketak={
		
		createMenu: function(exams,level){
			if(level==null || exams==null){
				return null;
			}
			var pageDiv=$('<div data-role="page" id="example_page_menu_exams_berridazketa-level-'+level+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Berridazketak '+level+'</h1>'+
				'</div>';
			
			var statementsDivs='<ul data-role="listview">';
			
			for(var con=0;con<exams.length;con++){
				statementsDivs=statementsDivs+
				  '<li><a href="#example_page_berridazketa-exam-'+con+'" id="example_li_menu_exams_berridazketa-level-'+level+'-exams-'+con+'">'+'Berridazketa azterketa ' +''+(con+1)+'</a></li>';
			}
			
			statementsDivs=statementsDivs+'</ul>';
			
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
		
		create: function(i,exams,level){
			if(exams==null || level==null){
				alert("No se ha podido presentar en pantalla porque se ha pasado un valor menos a uno");
				return null;
			}else if(i>=exams.length){
				alert("No se puede solicitar un numero de examen superior al que se tiene");
				return null;
			}
			var pageDiv=$('<div data-role="page" id="example_page_berridazketa-exam-'+i+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Berridazketak '+(i+1)+'</h1>'+
				'</div>';
			
			var statementsDivs="";
			
			for(var con=0;con<exams[i].statements.length;con++){
				statementsDivs=statementsDivs+
				'<div id="result_div_berridazketa-exam-'+i+'-level-'+level+'-statement-'+con+'" class="ui-field-contain">'+
				'<p hidden name="result_p_error_berridazketa" id="result_label_error__berridazketa-exam-'+i+'-level-'+level+'-statement-'+con+'" style="color:red" >'+'Erantzuna ez da zuzena'+'</p>'+
				'<p name="result_p_berridazketa-exam-'+i+'-level-'+level+'-statement-'+con+'" id="result_label_berridazketa-exam-'+i+'-level-'+level+'-statement-'+con+'">'+exams[i].statements[con].statement+'</p>'+
				'<input  name="result_input_berridazketa-exam-'+i+'-level-'+level+'-statement-'+con+'" id="result_label_berridazketa-exam-'+i+'-level-'+level+'-answer-'+con+'" data-clear-btn="true" value="" type="text" placeholder="'+exams[i].statements[con].placeholder+'"/>'+
				'</div>'
				;
			}
			statementsDivs=statementsDivs+'<a id="correctExams_a_'+'berridazketa'+'-exam-'+i+'-level-'+level+'" name="onClickCorrectExams" href="" class="ui-btn">Zuzena</a>'
			
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;align-content:center;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;align-content:center;width:60%;"><h4 id="example_h4_correct_answer_berridazketa-exam-'+i+'" style="margin-bottom:1%;">Erantzun zuzena:0</h4></div>'+
						'<div class="ui-block-c" style="text-align:right;align-content:center;width:20%;">'+
						'</div>'+
					'</div>'+
				'</div>';
			pageDiv.append(headerDiv,contentDiv,footerDiv);
			return pageDiv;
		},
		load: function(i) {
			
			alert("load1");
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



