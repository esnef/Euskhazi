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


var users=new Array();
var keyUsers="users";//Esto se usa como clave para guardar los datos del usuario
/**
 * Clase que define los usuarios y lo que se registra desde ellos
 */
function User() {
	  var name="";
	  var pass="";
	  var examsBerridazketak=new Array();
}
/**
 * clase para gurdar los resultados de los examenes, se usa 
 * la misma para todos los tipos de examenes
 */
function ResultExamn(){
		var level="";
		var numExam=-1.1;
		var result=-1.1;
}
var userNow=new User();//Usuario actual del sistema
userNow.name="";
userNow.pass="";
userNow.examsBerridazketak=new Array();

//EXAMS
var fileFolder="exams/";
var fileNameBerridazketak="berridazketak.json";
var fileNameAhozkoa="ahozkoa.json";
//var level="B1";
var exams=null;
//AHOZKOA INIT
function loadDataJSONAhozkoa(fileName,level){
	$.getJSON(fileFolder+level+'/'+fileName, function(json) {
	    console.log(json); // this will show the info it in firebug console
	    exams=json;
	    
	    exams=json;
	    var pageDiv;
	    pageDiv=pageAhozkoa.createMenu(exams,level);
    	//No se puede concatenar pageDiv con lo que se debe introducir cada una de las veces como valores independientes 
	    $("body").append(pageDiv);
	    console.log(pageDiv);
	    //Creamos todos los div pertinentes de los examenes Berridazketak
	    
	    for(var con=0;con<exams.length;con++){
	    	//No se puede concatenar pageDiv con lo que se debe introducir cada una de las veces como valores independientes 
	    	pageDiv=pageAhozkoa.create(con,exams,level);
	    	//alert(""+pageDiv);
	    	$("body").append(pageDiv);
	    }
	    
	    console.log(pageDiv);
	    //Los introducimos en el body

	    $("body").enhanceWithin();
	    //Ahora realizamos el cambio de pantalla a la del menu de examenes
	    if( $('#example_page_menu_exams_ahozkoa-level-'+level+'').length )         // use this if you are using id to check
	    {
	    	//Existe.
		    $(':mobile-pagecontainer').pagecontainer('change', '#example_page_menu_exams_ahozkoa-level-'+level+'');
		    //Se ejecutara cuando se presiona el boton de corrección
		    /*
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
		    			//En el caso de que successes sea mayor a la mitad de las presntas se dara por superiado el examen
    			    	if(successes>=((exams[numExam].statements.length/2)+1)){	
    			    		var resultExam=10*(successes/(exams[numExam].statements.length));
    			    		alert("Azterketa gainditu ditu "+resultExam+" puntu eman");
    			    		//Guardamos el resultado para indicar que ha sido superado el examen
    			    		if(userNow!=null){
    			    			//examsBerridazketak
    			    			var con=-1;
    			    			var control=false;
    			    			if(userNow.examsBerridazketak==undefined){
    			    				userNow.examsBerridazketak=new Array();
    			    			}
    			    			for(con=0;con<userNow.examsBerridazketak.length;con++){
    			    				if(userNow.examsBerridazketak[con].level==level && userNow.examsBerridazketak[con].numExam==numExam){
    			    					control=true;
    			    					break;
    			    				}
    			    			}
    			    			examBerridazketak=new ResultExamn();
    			    			examBerridazketak.level=levelExam;
    			    			examBerridazketak.numExam=numExam;
    			    			examBerridazketak.result=resultExam;
    			    			if(control){
        			    			userNow.examsBerridazketak[con]=examBerridazketak;
    			    			}else{
        			    			userNow.examsBerridazketak.push(examBerridazketak);
    			    			}
    			    			//Guardamos todas las modificaciones
    			    			saveUsers();
    			    			
    			    			
    			    			//Ya se ha guardado el resultado
    			    			$.mobile.back();
    			    		}
    			    		
    			    		
    			    	}
		    			
		    		}else{
		    			alert("Error 10");
		    		}
		    		
		    	}
		    	
		    });
		    //Evento onClick en el boton de presentar solucion
		    $( "a[name='onClickShowSolution']" ).on( "click", function() {
		    	
		    	var id=$(this).attr("id");
		    	if (id.indexOf('correctExams_a_showSolution')!=-1 && id.indexOf('berridazketa')!=-1) {
		    		var positionNumExam =id.indexOf('exam-')+'exam-'.length;
		    		var numExam=id[positionNumExam];
		    		var positionlevelExam =id.indexOf('level-')+'level-'.length;
		    		var levelExam=id.slice(positionlevelExam,positionlevelExam+2);
		    		//Ya comporbado que se ha producido un evento el boton de presentar soluciónes realizaremos la busqueda de todos los <p> con 
		    		//las soluciones y los presentaremos
		    		
		    		
		    		var $inputsStatement=$('input[name|="result_input_berridazketa-exam-'+numExam+'-level-'+level+'"]');
		    		if(exams!=null || $inputsStatement.length){
		    			//var statements=exams[numExam].statements;
		    			var successes=0;
		    			$inputsStatement.each(function( index ) {
		    				//Recorre todos los input sacando los valores para que podamos examinarlo los aciertos comparandolos
		    				var value=$(this).val().trim().toLowerCase();
		    			    var solution=exams[numExam].statements[index].solution.trim().toLowerCase();
		    			    if(value==solution){
		    			    	//La solución es correcta
		    			    	successes++;
		    			    	var $result_label_error__berridazketa=$('p[id|="result_label_solution_berridazketa-exam-'+numExam+'-level-'+level+'-statement-'+index+'"]');
		    			    	if($result_label_error__berridazketa.length){
		    			    		$result_label_error__berridazketa.hide();
		    			    	}
		    			    }else{
		    			    	//NO es igual
		    			    	//result_label_error__berridazketa-exam-'+i+'-level-'+level+'-statement-'+i+'
		    			    	var $result_label_error__berridazketa=$('p[id|="result_label_solution_berridazketa-exam-'+numExam+'-level-'+level+'-statement-'+index+'"]');
		    			    	if($result_label_error__berridazketa.length){
		    			    		$result_label_error__berridazketa.show();
		    			    	}
		    			    }
		    			  });
		    			$('#example_h4_correct_answer_berridazketa-exam-'+numExam+'').text("Erantzun zuzena:"+successes);
		    		}else{
		    			alert("Error 11");
		    		}
		    		
		    	}
		    });

		    //Ahora realizamos la espera de eventos de que se visualice la pagina de seleccional el nivel
	    	$("div").on( "pageshow", function( event, ui ) {
	    		var idSearch="example_page_menu_exams_berridazketa-level-";
	    		var id=$(this).attr("id");
	    		var positionID =id.indexOf(idSearch);
	    		if(positionID>=0){
	    			var positionString =id.indexOf(idSearch)+idSearch.length;
	    			var levelExam=id.slice(positionString,positionString+2);
	    			var examsBerridazketakNow=new Array();
	    			if(userNow!=null){
	    				if(userNow.examsBerridazketak==undefined){
		    				userNow.examsBerridazketak=new Array();
		    			}
	    				for(con=0;con<userNow.examsBerridazketak.length;con++){
							if(userNow.examsBerridazketak[con].level==levelExam){
								examsBerridazketakNow.push(userNow.examsBerridazketak[con]);
							}
						}
    				}
	    			$('a[id|="example_li_menu_exams_berridazketa-level-'+levelExam+'"]').each(function( index ) {
	    				for(con=0;con<examsBerridazketakNow.length;con++){
	    					if(examsBerridazketakNow[con].numExam==index){
	    						if(examsBerridazketakNow[con].result>=6){
		    						//Aprobado ponemos en azul
		    						$(this).css('color', 'blue');
		    						$(this).text("Azterketa "+(index+1)+" Puntuazio:"+examsBerridazketakNow[con].result);
		    						
		    					}else{
		    						//Suspendido ponemos en rojo
		    						$(this).css('color', 'red');
		    					}
	    					}
	    				
	    					
	    				}
	    			});
	    			
	    			//id example_li_menu_exams_berridazketa-level-'+level+'-exams-'+con+'
	    			//Sabiendo el nivel del examen podemos mirar si existne examen de este tipo aprobados e imprimirlo en pantalla
	    		}
	    		
	    		
	    		
	    	});*/    
	    }else{
	    	alert("Error:"+"No exite el ID de dicha pagina");
	    }
	    $("div").on( "pageshow", function( event, ui ) {
    		var idSearch="levels_page_menu";
    		var id=$(this).attr("id");
    		if(id==idSearch){
    			pageAhozkoa.remove(exams,level);
    		}
    			
    	});   
	    
	    
	    
	});	
}

var pageAhozkoa={
		
		remove: function(exams,level){
			if(exams==null || level==null)return;
			//.empty(
			//example_page_menu_exams_berridazketa-level-
			var idS="example_page_menu_exams_ahozkoa-level-"+level;
			$("#"+idS).empty();
			$("#"+idS).remove();

			for(var con=0;con<exams.length;con++){
				//example_page_berridazketa-exam-'+i+'-level-'+level+'
				$('#'+'example_page_ahozkoa-exam-'+con+'-level-'+level+'').empty();
				$('#'+'example_page_ahozkoa-exam-'+con+'-level-'+level+'').remove();
			}
		},
		
		createMenu: function(exams,level){
			if(level==null || exams==null){
				return null;
			}
			var pageDiv=$('<div data-role="page" id="example_page_menu_exams_ahozkoa-level-'+level+'" name="example_page_menu_exams_ahozkoa-level-'+level+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Ahozkoak '+level+'</h1>'+
				'</div>';
			
			var statementsDivs='<ul data-role="listview" data-inset="true">';
			
			for(var con=0;con<exams.length;con++){
				statementsDivs=statementsDivs+
				  '<li><a href="#example_page_ahozkoa-exam-'+con+'-level-'+level+'" id="example_li_menu_exams_ahozkoa-level-'+level+'-exams-'+con+'">'+'Azterketa ' +''+(con+1)+'</a></li>';
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
			var pageDiv=$('<div data-role="page" id="example_page_ahozkoa-exam-'+i+'-level-'+level+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Ahozkoa '+(i+1)+'</h1>'+
				'</div>';
			
			var statementsDivs="";
			/*
			for(var con=0;con<exams[i].statements.length;con++){
				statementsDivs=statementsDivs+
				'<div id="result_div_ahozkoa-exam-'+i+'-level-'+level+'-statement-'+con+'" class="ui-field-contain">'+
				'<p hidden name="result_p_error_berridazketa" id="result_label_error__berridazketa-exam-'+i+'-level-'+level+'-statement-'+con+'" style="color:red" >'+'Erantzuna ez da zuzena'+'</p>'+
				'<p name="result_p_ahozkoa-exam-'+i+'-level-'+level+'-statement-'+con+'" id="result_label_berridazketa-exam-'+i+'-level-'+level+'-statement-'+con+'">'+exams[i].statements[con].statement+'</p>'+
				'<input  name="result_input_berridazketa-exam-'+i+'-level-'+level+'-statement-'+con+'" id="result_label_berridazketa-exam-'+i+'-level-'+level+'-answer-'+con+'" data-clear-btn="true" value="" type="text" placeholder="'+exams[i].statements[con].placeholder+'"/>'+
				'<p hidden name="result_p_solution_berridazketa" id="result_label_solution_berridazketa-exam-'+i+'-level-'+level+'-statement-'+con+'" style="color:red" >'+'Konponbidea:'+exams[i].statements[con].solution+'</p>'+
				'</div>'
				;
			}*/
			statementsDivs=statementsDivs+
			'<div id="div_ahozkoa-exam-'+i+'-level-'+level+'-statement-'+con+'" class="ui-field-contain">'+
			'<p name="title_p_ahozkoa-exam-'+i+'-level-'+level+'" id="title_p_ahozkoa-exam-'+i+'-level-'+level+'">'+exams[i].title+'</p>'+
			'<p name="explanation_p_ahozkoa-exam-'+i+'-level-'+level+'" id="explanation_p_ahozkoa-exam-'+i+'-level-'+level+'">'+exams[i].explanation+'</p>'+
			'<ul data-role="listview" data-inset="true">';	
			/*
			for(var con=0;con<exams[i].questions.length;con++){
				statementsDivs=statementsDivs+
				'<li id="questions_li_ahozkoa-exam-'+i+'-level-'+level+'-question-'+con+'>'+exams[i].questions[con].question+'</li>'
				;
				alert("1");
			}
			*/
			statementsDivs=statementsDivs+
			'<li id="questions_li_ahozkoa-exam-'+i+'-level-'+level+'-question-'+0+'>'+exams[i].questions[0].question+'</li><br/>'
			;
			statementsDivs=statementsDivs+
			'<li id="questions_li_ahozkoa-exam-'+i+'-level-'+level+'-question-'+1+'>'+exams[i].questions[1].question+'</li><br/>'
			;
			statementsDivs=statementsDivs+
			'<li id="questions_li_ahozkoa-exam-'+i+'-level-'+level+'-question-'+2+'>'+exams[i].questions[2].question+'</li><br/>'
			;
			
			statementsDivs=statementsDivs+
			'</ul></div>';
			statementsDivs=statementsDivs+
			'<ul data-role="listview" data-inset="true"><li><a href="#">Default is right arrow</a></li><li data-icon="plus"><a href="#">data-icon="plus"</a></li><li data-icon="minus"><a href="#">data-icon="minus"</a></li><li data-icon="delete"><a href="#">data-icon="delete"</a></li><li data-icon="location"><a href="#">data-icon="location"</a></li>   <li data-icon="false"><a href="#">data-icon="false"</a></li></ul>';
		
			//statementsDivs=statementsDivs+'<a id="correctExams_a_'+'ahozkoa'+'-exam-'+i+'-level-'+level+'" name="onClickCorrectExamsAhozkoa" href="" class="ui-btn">Zuzena</a>'
			
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

function loadAhozkoa(level){
	if(level==null){
		alert("Error en el nivel de examen");
	}
	loadDataJSONAhozkoa(fileNameAhozkoa,level);
}
//AHOZKOA END

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
		    			//En el caso de que successes sea mayor a la mitad de las presntas se dara por superiado el examen
    			    	if(successes>=((exams[numExam].statements.length/2)+1)){	
    			    		var resultExam=10*(successes/(exams[numExam].statements.length));
    			    		alert("Azterketa gainditu ditu "+resultExam+" puntu eman");
    			    		//Guardamos el resultado para indicar que ha sido superado el examen
    			    		if(userNow!=null){
    			    			//examsBerridazketak
    			    			var con=-1;
    			    			var control=false;
    			    			if(userNow.examsBerridazketak==undefined){
    			    				userNow.examsBerridazketak=new Array();
    			    			}
    			    			for(con=0;con<userNow.examsBerridazketak.length;con++){
    			    				if(userNow.examsBerridazketak[con].level==level && userNow.examsBerridazketak[con].numExam==numExam){
    			    					control=true;
    			    					break;
    			    				}
    			    			}
    			    			examBerridazketak=new ResultExamn();
    			    			examBerridazketak.level=levelExam;
    			    			examBerridazketak.numExam=numExam;
    			    			examBerridazketak.result=resultExam;
    			    			if(control){
        			    			userNow.examsBerridazketak[con]=examBerridazketak;
    			    			}else{
        			    			userNow.examsBerridazketak.push(examBerridazketak);
    			    			}
    			    			//Guardamos todas las modificaciones
    			    			saveUsers();
    			    			
    			    			
    			    			//Ya se ha guardado el resultado
    			    			$.mobile.back();
    			    		}
    			    		
    			    		
    			    	}
		    			
		    		}else{
		    			alert("Error 10");
		    		}
		    		
		    	}
		    	
		    });
		    //Evento onClick en el boton de presentar solucion
		    $( "a[name='onClickShowSolution']" ).on( "click", function() {
		    	
		    	var id=$(this).attr("id");
		    	if (id.indexOf('correctExams_a_showSolution')!=-1 && id.indexOf('berridazketa')!=-1) {
		    		var positionNumExam =id.indexOf('exam-')+'exam-'.length;
		    		var numExam=id[positionNumExam];
		    		var positionlevelExam =id.indexOf('level-')+'level-'.length;
		    		var levelExam=id.slice(positionlevelExam,positionlevelExam+2);
		    		//Ya comporbado que se ha producido un evento el boton de presentar soluciónes realizaremos la busqueda de todos los <p> con 
		    		//las soluciones y los presentaremos
		    		
		    		
		    		var $inputsStatement=$('input[name|="result_input_berridazketa-exam-'+numExam+'-level-'+level+'"]');
		    		if(exams!=null || $inputsStatement.length){
		    			//var statements=exams[numExam].statements;
		    			var successes=0;
		    			$inputsStatement.each(function( index ) {
		    				//Recorre todos los input sacando los valores para que podamos examinarlo los aciertos comparandolos
		    				var value=$(this).val().trim().toLowerCase();
		    			    var solution=exams[numExam].statements[index].solution.trim().toLowerCase();
		    			    if(value==solution){
		    			    	//La solución es correcta
		    			    	successes++;
		    			    	var $result_label_error__berridazketa=$('p[id|="result_label_solution_berridazketa-exam-'+numExam+'-level-'+level+'-statement-'+index+'"]');
		    			    	if($result_label_error__berridazketa.length){
		    			    		$result_label_error__berridazketa.hide();
		    			    	}
		    			    }else{
		    			    	//NO es igual
		    			    	//result_label_error__berridazketa-exam-'+i+'-level-'+level+'-statement-'+i+'
		    			    	var $result_label_error__berridazketa=$('p[id|="result_label_solution_berridazketa-exam-'+numExam+'-level-'+level+'-statement-'+index+'"]');
		    			    	if($result_label_error__berridazketa.length){
		    			    		$result_label_error__berridazketa.show();
		    			    	}
		    			    }
		    			  });
		    			$('#example_h4_correct_answer_berridazketa-exam-'+numExam+'').text("Erantzun zuzena:"+successes);
		    		}else{
		    			alert("Error 11");
		    		}
		    		
		    	}
		    });

		    //Ahora realizamos la espera de eventos de que se visualice la pagina de seleccional el nivel
	    	$("div").on( "pageshow", function( event, ui ) {
	    		var idSearch="example_page_menu_exams_berridazketa-level-";
	    		var id=$(this).attr("id");
	    		var positionID =id.indexOf(idSearch);
	    		if(positionID>=0){
	    			var positionString =id.indexOf(idSearch)+idSearch.length;
	    			var levelExam=id.slice(positionString,positionString+2);
	    			var examsBerridazketakNow=new Array();
	    			if(userNow!=null){
	    				if(userNow.examsBerridazketak==undefined){
		    				userNow.examsBerridazketak=new Array();
		    			}
	    				for(con=0;con<userNow.examsBerridazketak.length;con++){
							if(userNow.examsBerridazketak[con].level==levelExam){
								examsBerridazketakNow.push(userNow.examsBerridazketak[con]);
							}
						}
    				}
	    			$('a[id|="example_li_menu_exams_berridazketa-level-'+levelExam+'"]').each(function( index ) {
	    				for(con=0;con<examsBerridazketakNow.length;con++){
	    					if(examsBerridazketakNow[con].numExam==index){
	    						if(examsBerridazketakNow[con].result>=6){
		    						//Aprobado ponemos en azul
		    						$(this).css('color', 'blue');
		    						$(this).text("Azterketa "+(index+1)+" Puntuazio:"+examsBerridazketakNow[con].result);
		    						
		    					}else{
		    						//Suspendido ponemos en rojo
		    						$(this).css('color', 'red');
		    					}
	    					}
	    				
	    					
	    				}
	    			});
	    			
	    			//id example_li_menu_exams_berridazketa-level-'+level+'-exams-'+con+'
	    			//Sabiendo el nivel del examen podemos mirar si existne examen de este tipo aprobados e imprimirlo en pantalla
	    		}
	    		
	    		
	    		
	    	});    
	    }else{
	    	alert("Error:"+"No exite el ID de dicha pagina");
	    }
	    $("div").on( "pageshow", function( event, ui ) {
    		var idSearch="levels_page_menu";
    		var id=$(this).attr("id");
    		if(id==idSearch){
    			pageBerridazketak.remove(exams,level);
    		}
    			
    	});   
	    
	    
	    
	});	
}

var pageBerridazketak={
		
		remove: function(exams,level){
			if(exams==null || level==null)return;
			//.empty(
			//example_page_menu_exams_berridazketa-level-
			var idS="example_page_menu_exams_berridazketa-level-"+level;
			$("#"+idS).empty();
			$("#"+idS).remove();

			for(con=0;con<exams.length;con++){
				//example_page_berridazketa-exam-'+i+'-level-'+level+'
				$('#'+'example_page_berridazketa-exam-'+con+'-level-'+level+'').empty();
				$('#'+'example_page_berridazketa-exam-'+con+'-level-'+level+'').remove();
			}
		},
		
		createMenu: function(exams,level){
			if(level==null || exams==null){
				return null;
			}
			var pageDiv=$('<div data-role="page" id="example_page_menu_exams_berridazketa-level-'+level+'" name="example_page_menu_exams_berridazketa-level-'+level+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Berridazketak '+level+'</h1>'+
				'</div>';
			
			var statementsDivs='<ul data-role="listview" data-inset="true">';
			
			for(var con=0;con<exams.length;con++){
				statementsDivs=statementsDivs+
				  '<li><a href="#example_page_berridazketa-exam-'+con+'-level-'+level+'" id="example_li_menu_exams_berridazketa-level-'+level+'-exams-'+con+'">'+'Azterketa ' +''+(con+1)+'</a></li>';
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
			var pageDiv=$('<div data-role="page" id="example_page_berridazketa-exam-'+i+'-level-'+level+'"></div>');
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
				'<p hidden name="result_p_solution_berridazketa" id="result_label_solution_berridazketa-exam-'+i+'-level-'+level+'-statement-'+con+'" style="color:red" >'+'Konponbidea:'+exams[i].statements[con].solution+'</p>'+
				'</div>'
				;
			}
			statementsDivs=statementsDivs+'<a id="correctExams_a_'+'berridazketa'+'-exam-'+i+'-level-'+level+'" name="onClickCorrectExams" href="" class="ui-btn">Zuzena</a>'
			statementsDivs=statementsDivs+'<a id="correctExams_a_showSolution'+'berridazketa'+'-exam-'+i+'-level-'+level+'" name="onClickShowSolution" href="" class="ui-btn">Ikusi Soluzio</a>'
			
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



//BERRIDAZKETAK END

//MENU LEVEL
function loadPageLeves(){
	var pageDiv=pageLeves.create();
	$("body").append(pageDiv);
	$("body").enhanceWithin();
	var idSearch="levels_page_menu";
	//Ahora realizamos el cambio de pantalla a la del menu de examenes
    if( $('#'+idSearch).length )         // use this if you are using id to check
    {
    	//Existe.
	    $(':mobile-pagecontainer').pagecontainer('change','#'+idSearch);
    }else{
    	alert("No se tiene el id del menu de niveles");
    }
	
}
var pageLeves={
		
		create: function(){
			var pageDiv=$('<div data-role="page" id="levels_page_menu" name="levels_page_menu"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Euskal mailak Erabiltzaileak:'+userNow.name+'</h1>'+
				'</div>';
			
			
			//Debemos crear los niveles
			
			var statementsDivs='<ul data-role="listview" data-inset="true">';
			
			//for(var con=0;con<exams.length;con++){
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadPageExams(&#39;'+'A1'+'&#39;)" id="levels_li_menu">'+'A1'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadPageExams(&#39;'+'A2'+'&#39;)" id="levels_li_menu">'+'A2'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadPageExams(&#39;'+'B1'+'&#39;)" id="levels_li_menu">'+'B1'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadPageExams(&#39;'+'B2'+'&#39;)" id="levels_li_menu">'+'B2'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadPageExams(&#39;'+'C1'+'&#39;)" id="levels_li_menu">'+'C1'+'</a></li>';
			//}
			
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
		
		load: function(i) {
			
			alert("load2");
		}
			
};
//MENU LEVEL END

//MENU EXAMS

function loadPageExams(level){
	if(level==null){
		alert("Error en el nivel de examen");
		return;
	}
	var pageDiv=pageExams.create(level);
	$("body").append(pageDiv);
	$("body").enhanceWithin();
	var idSearch="tests_page_menu_level_"+level+"";
	//Ahora realizamos el cambio de pantalla a la del menu de examenes
    if( $('#'+idSearch).length )         // use this if you are using id to check
    {
    	//Existe.
	    $(':mobile-pagecontainer').pagecontainer('change','#'+idSearch);
    }else{
    	alert("No se tiene el id del menu de pruebas");
    }
	
}
var pageExams={
		create: function(level){
			if(level==null || level==""){
				alert("Error al crear el menu de examenes");
			}
			var pageDiv=$('<div data-role="page" id="tests_page_menu_level_'+level+'" name="tests_page_menu_level_'+level+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Maila: '+level+'</h1>'+
				'</div>';
			
			
			//Debemos crear los niveles
			
			var statementsDivs='<ul data-role="listview" data-inset="true">';
			
				statementsDivs=statementsDivs+
				  '<li><a href="#" id="levels_li_menu_tests_level_'+level+'-proof-'+'atarikoa'+'">'+'Atarikoa'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" id="levels_li_menu_tests_level_'+level+'-proof-'+'idatzizkoa'+'">'+'Idatzizkoa'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" id="levels_li_menu_tests_level_'+level+'-proof-'+'sinonimoak'+'">'+'Sinonimoak'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadBerridazketak(&#39;'+level+'&#39;)" id="levels_li_menu_tests_level_'+level+'-proof-'+'berridazketak'+'">'+'Berridazketak'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#"  id="levels_li_menu_tests_level_'+level+'-proof-'+'entzumena'+'">'+'Entzumena'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadAhozkoa(&#39;'+level+'&#39;)" id="levels_li_menu_tests_level_'+level+'-proof-'+'entzumena'+'">'+'Ahozkoa'+'</a></li>';
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
		
		load: function(i) {
			
			alert("load3");
		},
		
		remove: function(){
			
		}
			
};
//MENU EXAMS END


