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
	  var examsAhozkoa=new Array();
	  var examsIdatzizkoa=new Array();
}
/**
 * clase para gurdar los resultados de los examenes, se usa 
 * la misma para todos los tipos de examenes
 */
function ResultExamn(){
		var level="";
		var numExam=-1.1;
		var result=-1.1;
		var voiceFileName="";
		var idatzizkoa="";
}
var userNow=new User();//Usuario actual del sistema
userNow.name="";
userNow.pass="";
userNow.examsBerridazketak=new Array();

//EXAMS
var fileFolder="exams/";
var fileNameBerridazketak="berridazketak.json";
var fileNameAhozkoa="ahozkoa.json";
var fileNameIdatzizkoa="idatzizkoa.json";
var fileFolderAhozkoaVoice="/sdcard/Euskhazi/voice/";

//var level="B1";
var exams=null;

//IDATZIKOA INIT
function loadDataJSONIdatzizkoa(fileName,level){
	$.getJSON(fileFolder+level+'/'+fileName, function(json) {
	    console.log(json); // this will show the info it in firebug console
	    exams=json;
	    
	    exams=json;
	    var pageDiv;
	    pageDiv=pageIdatzizkoa.createMenu(exams,level);
    	//No se puede concatenar pageDiv con lo que se debe introducir cada una de las veces como valores independientes 
	    $("body").append(pageDiv);
	    console.log(pageDiv);
	    //Creamos todos los div pertinentes de los examenes Berridazketak
	    for(var con=0;con<exams.length;con++){
	    	//No se puede concatenar pageDiv con lo que se debe introducir cada una de las veces como valores independientes 
	    	pageDiv=pageIdatzizkoa.create(con,exams,level);
	    	//alert(""+pageDiv);
	    	$("body").append(pageDiv);
	    }
	    console.log(pageDiv);
	    //Los introducimos en el body

	    $("body").enhanceWithin();
	    
	    //Ahora realizamos el cambio de pantalla a la del menu de examenes
	    if( $('#example_page_menu_exams_idatzizkoa-level-'+level+'').length )         // use this if you are using id to check
	    {
	    	//Existe.
		    $(':mobile-pagecontainer').pagecontainer('change', '#example_page_menu_exams_idatzizkoa-level-'+level+'');
		    //Se ejecutara cuando se presiona el boton de corrección
		    
		    $( "a[name='onClickCorrectExamsIdatzizkoa']" ).on( "click", function() {
		    	var id=$(this).attr("id");
		    	if (id.indexOf('correctExams_a_')!=-1 && id.indexOf('idatzizkoa')!=-1) {
		    		var positionNumExam =id.indexOf('exam-')+'exam-'.length;
		    		var numExam=id[positionNumExam];
		    		var positionlevelExam =id.indexOf('level-')+'level-'.length;
		    		var levelExam=id.slice(positionlevelExam,positionlevelExam+2);
		    		//result_input_idatzizkoa-exam-'+i+'-level-'+level+'
		    		var $idatzikoa=$('#result_input_idatzizkoa-exam-'+numExam+'-level-'+levelExam);
		    		//idatzizkoa
		    		if($idatzikoa.val()!=""){
		    			if(userNow.examsIdatzizkoa==undefined){
		    				userNow.examsIdatzizkoa=new Array();
		    			}
		    			resultExamnNow=new ResultExamn();
	    				resultExamnNow.idatzizkoa=$idatzikoa.val();
	    				resultExamnNow.level=levelExam;
	    				resultExamnNow.numExam=numExam;
	    				resultExamnNow.result=0;//DE momento no se tiene un resultado del examen
	    				var control=true;
	    				for(var con=0;con<userNow.examsIdatzizkoa.length;con++){
	    					if(userNow.examsIdatzizkoa[con].level==levelExam && userNow.examsIdatzizkoa[con].numExam==numExam){
								userNow.examsIdatzizkoa[con]=resultExamnNow
								control=false;
								break;
							}
						}
	    				if(control){
	    					userNow.examsIdatzizkoa.push(resultExamnNow);
	    				}
	    				alert("Idazketan egin da. Ontziak zuzendu behar");
	    				//Guardamos todas las modificaciones
		    			saveUsers();
		    			//Ya se ha guardado el resultado
		    			$.mobile.back();
		    		}
		    		
		    	}
		    	
		    });
		       
	    }else{
	    	alert("Errorea:"+"Ez da existitzen orrialde horren IDrik");
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

var pageIdatzizkoa={
		
		remove: function(exams,level){
			if(exams==null || level==null)return;
			//.empty(
			//example_page_menu_exams_berridazketa-level-
			var idS="example_page_menu_exams_idatzizkoa-level-"+level;
			$("#"+idS).empty();
			$("#"+idS).remove();

			for(var con=0;con<exams.length;con++){
				//example_page_berridazketa-exam-'+i+'-level-'+level+'
				$('#'+'example_page_idatzizkoa-exam-'+con+'-level-'+level+'').empty();
				$('#'+'example_page_idatzizkoa-exam-'+con+'-level-'+level+'').remove();
			}
		},
		
		createMenu: function(exams,level){
			if(level==null || exams==null){
				return null;
			}
			var pageDiv=$('<div data-role="page" id="example_page_menu_exams_idatzizkoa-level-'+level+'" name="example_page_menu_exams_idatzizkoa-level-'+level+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Ahozkoak '+level+'</h1>'+
				'</div>';
			
			var statementsDivs='<ul data-role="listview" data-inset="true">';
			for(var con=0;con<exams.length;con++){
				statementsDivs=statementsDivs+
				  '<li><a href="#example_page_idatzizkoa-exam-'+con+'-level-'+level+'" id="example_li_menu_exams_idatzizkoa-level-'+level+'-exams-'+con+'">'+'Azterketa ' +''+(con+1)+'</a></li>';
			}
			
			statementsDivs=statementsDivs+'</ul>';
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;width:60%;">'+'<ul data-role="listview"><li><a href="#tests_page_menu_level_'+level+'" class="ui-btn ui-btn-inline ui-corner-all" >Atzera</a></li></ul>'+'</div>'+
						'<div class="ui-block-c" style="text-align:right;width:20%;">'+
						'</div>'+
					'</div>'+
				'</div>';
			pageDiv.append(headerDiv,contentDiv,footerDiv);
			return pageDiv;
		},
		
		create: function(i,exams,level){
			if(exams==null || level==null){
				alert("Ezin izan da pantaila erakutsi, pasatako balioa minus bat izan baita");
				return null;
			}else if(i>=exams.length){
				alert("Ezin da daukazuna baino maila altuagoko azterketarik eskatu");
				return null;
			}
			var pageDiv=$('<div data-role="page" id="example_page_idatzizkoa-exam-'+i+'-level-'+level+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Ahozkoa '+(i+1)+'</h1>'+
				'</div>';
			
			var statementsDivs="";
			statementsDivs=statementsDivs+
			'<div id="div_idatzizkoa-exam-'+i+'-level-'+level+'-statement-'+con+'" class="ui-field-contain">';
				statementsDivs=statementsDivs+
				'<h3 name="title_p_idatzizkoa-exam-'+i+'-level-'+level+'" id="title_p_idatzizkoa-exam-'+i+'-level-'+level+'">'+exams[i].title+'</h3>'+
				'<p name="explanation_p_idatzizkoa-exam-'+i+'-level-'+level+'" id="explanation_p_idatzizkoa-exam-'+i+'-level-'+level+'">'+exams[i].explanation+'</p>';	
				
				
				statementsDivs=statementsDivs+
				'<ul>';
				for(var con=0;con<exams[i].items.length;con++){
					statementsDivs=statementsDivs+
					'<li id="questions_li_idatzizkoa-exam-'+i+'-level-'+level+'-question-'+con+'">'+exams[i].items[con].item+'</li>'
					;
				}
				statementsDivs=statementsDivs+
				'</ul>';
				
				for(var con=0;con<exams[i].imagesURL.length;con++){
					statementsDivs=statementsDivs+
					'<div style="width: 100%;">';
						statementsDivs=statementsDivs+
						'<img id="imagesURL_img_idatzizkoa-exam-'+i+'-level-'+level+'-img-'+con+'" style="width: 100%;" alt="Photo portrait" src="'+exams[i].imagesURL[con].imageURL+'"/>';
					statementsDivs=statementsDivs+
					'</div>';
				}
			statementsDivs=statementsDivs+
			'</div>';
			
			statementsDivs=statementsDivs+
			'<div id="div2_idatzizkoa-exam-'+i+'-level-'+level+'" class="ui-field-contain">';

				statementsDivs=statementsDivs+
				'<textarea style="width: 100%;" rows="8" name="result_input_idatzizkoa-exam-'+i+'-level-'+level+'" id="result_input_idatzizkoa-exam-'+i+'-level-'+level+'" data-clear-btn="true" value="" placeholder=""/>';

				statementsDivs=statementsDivs+
				'<h4>Termino:</h4><p><i>'+exams[i].conditions+'</i></p>';
				
			
				statementsDivs=statementsDivs+'<a id="correctExams_a_'+'idatzizkoa'+'-exam-'+i+'-level-'+level+'" name="onClickCorrectExamsIdatzizkoa" href="" class="ui-btn">Zuzena</a>'
			statementsDivs=statementsDivs+
			'</div>';
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;align-content:center;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;align-content:center;width:60%;"><h4 id="example_h4_correct_answer_berridazketa-exam-'+i+'" style="margin-bottom:1%;"></h4></div>'+
						'<div class="ui-block-c" style="text-align:right;align-content:center;width:20%;">'+
						'</div>'+
					'</div>'+
				'</div>';
			pageDiv.append(headerDiv,contentDiv,footerDiv);
			return pageDiv;
		},
		load: function(i) {
			alert("load11");
		}
			
};


function loadIdatzizkoa(level){
	if(level==null){
		alert("Errorea azterketaren mailan");
	}
	loadDataJSONIdatzizkoa(fileNameIdatzizkoa,level);
}

//IDATZIZKOA END

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
		    
		    $( "a[name='onClickCorrectExamsAhozkoa']" ).on( "click", function() {
		    	var id=$(this).attr("id");
		    	if (id.indexOf('correctExams_a_')!=-1 && id.indexOf('ahozkoa')!=-1) {
		    		var positionNumExam =id.indexOf('exam-')+'exam-'.length;
		    		var numExam=id[positionNumExam];
		    		var positionlevelExam =id.indexOf('level-')+'level-'.length;
		    		var levelExam=id.slice(positionlevelExam,positionlevelExam+2);
		    		//Ahora debemos comprobar si esta el archivo de la grabacion esta realizado o no
		    		checkIfFileExists("cdvfile://"+fileFolderAhozkoaVoice,"voice_ahozkoa_userName_"+userNow.name+"_level_"+levelExam+"_exam_"+numExam+".3gp",function(fileEntry){
		    			//El archivo existe con lo que podemos realizar el almacenamiento en la variable concreta dentro de UserNow
		    			if(userNow!=null && userNow!=undefined){
		    				if(userNow.examsAhozkoa==undefined){
			    				userNow.examsAhozkoa=new Array();
			    			}
		    				resultExamnNow=new ResultExamn();
		    				resultExamnNow.voiceFileName;
		    				resultExamnNow.level=levelExam;
		    				resultExamnNow.numExam=numExam;
		    				resultExamnNow.result=0;//DE momento no se tiene un resultado del examen
		    				var control=true;
		    				for(var con=0;con<userNow.examsAhozkoa.length;con++){
								if(userNow.examsAhozkoa[con].level==levelExam && userNow.examsAhozkoa[con].numExam==numExam){
									userNow.examsAhozkoa[con]=resultExamnNow
									control=false;
									break;
								}
							}
		    				if(control){
		    					userNow.examsAhozkoa.push(resultExamnNow);
		    				}
		    				alert("Grabazioa egin da eta zuzenketarako bidali da");
		    				//Guardamos todas las modificaciones
			    			saveUsers();
			    			//Ya se ha guardado el resultado
			    			$.mobile.back();
	    				}
		    		});

		    	}
		    	
		    });
		       
	    }else{
	    	alert("Errorea:"+"Ez da existitzen orrialde horren IDrik");
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

function checkIfFileExists(path,fileName,onSuccess){
	window.resolveLocalFileSystemURL(path+fileName,//Acceder al fichero original por su URL
			function(fileEntry) {//función successCallback: si se ha podido acceder al fichero original
				//fileEntry.remove(onSuccess);//Borrar el fichero y seguir con onSuccess
				if(onSuccess!=false)
					onSuccess(fileEntry);
			},
			function(error) {
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
						'<div class="ui-block-b" style="text-align:center;width:60%;">'+'<ul data-role="listview"><li><a href="#tests_page_menu_level_'+level+'" class="ui-btn ui-btn-inline ui-corner-all" >Atzera</a></li></ul>'+'</div>'+
						'<div class="ui-block-c" style="text-align:right;width:20%;">'+
						'</div>'+
					'</div>'+
				'</div>';
			pageDiv.append(headerDiv,contentDiv,footerDiv);
			return pageDiv;
		},
		
		create: function(i,exams,level){
			if(exams==null || level==null){
				alert("Ezin izan da pantaila erakutsi, pasatako balioa minus bat izan baita");
				return null;
			}else if(i>=exams.length){
				alert("Ezin da daukazuna baino maila altuagoko azterketarik eskatu");
				return null;
			}
			var pageDiv=$('<div data-role="page" id="example_page_ahozkoa-exam-'+i+'-level-'+level+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Ahozkoa '+(i+1)+'</h1>'+
				'</div>';
			
			var statementsDivs="";
			
			statementsDivs=statementsDivs+
			'<div id="div_ahozkoa-exam-'+i+'-level-'+level+'-statement-'+con+'" class="ui-field-contain">';
				statementsDivs=statementsDivs+
				'<h3 name="title_p_ahozkoa-exam-'+i+'-level-'+level+'" id="title_p_ahozkoa-exam-'+i+'-level-'+level+'">'+exams[i].title+'</h3>'+
				'<p name="explanation_p_ahozkoa-exam-'+i+'-level-'+level+'" id="explanation_p_ahozkoa-exam-'+i+'-level-'+level+'">'+exams[i].explanation+'</p>';	
				
				
				statementsDivs=statementsDivs+
				'<ul>';
				for(var con=0;con<exams[i].questions.length;con++){
					statementsDivs=statementsDivs+
					'<li id="questions_li_ahozkoa-exam-'+i+'-level-'+level+'-question-'+con+'">'+exams[i].questions[con].question+'</li>'
					;
				}
				statementsDivs=statementsDivs+
				'</ul>';
				
				
				for(var con=0;con<exams[i].imagesURL.length;con++){
					statementsDivs=statementsDivs+
					'<div style="width: 100%;">';
						statementsDivs=statementsDivs+
						'<img id="imagesURL_img_ahozkoa-exam-'+i+'-level-'+level+'-img-'+con+'" style="width: 100%;" alt="Photo portrait" src="'+exams[i].imagesURL[con].imageURL+'"/>';
					statementsDivs=statementsDivs+
					'</div>';
				}
			statementsDivs=statementsDivs+
			'</div>';
			
			statementsDivs=statementsDivs+
			'<div id="div2_ahozkoa-exam-'+i+'-level-'+level+'-statement-'+con+'" class="ui-field-contain">';
				statementsDivs=statementsDivs+
				'<div data-role="controlgroup" id="buttons-1" data-type="horizontal" align="center">'+
					'<a href="#" onClick="recordVoice(&#39;'+level+'&#39;,&#39;'+i+'&#39;)" name="Butons_recorder_ahozkoa" id="Butons_recorder_ahozkoa-exam-'+i+'-level-'+level+'" class="ui-btn ui-corner-all">Record</a>'+
					'<a href="#" onClick="stopVoice(&#39;'+level+'&#39;,&#39;'+i+'&#39;)" name="Butons_play_ahozkoa" id="Butons_play_ahozkoa-exam-'+i+'-level-'+level+'" class="ui-btn ui-corner-all">stop</a>'+
				'</div>';
				
				statementsDivs=statementsDivs+
				'<p hidden id="file_voice_p_ahozkoa-exam-'+i+'-level-'+level+'"></p>'+
				'<audio hidden id="file_voice_audio_ahozkoa-exam-'+i+'-level-'+level+'" controls="controls">'+
					'<source src=""/>'+
				'</audio>';
				statementsDivs=statementsDivs+
				'<h4>Termino:</h4><p><i>'+exams[i].conditions+'</i></p>';
				
			
				statementsDivs=statementsDivs+'<a id="correctExams_a_'+'ahozkoa'+'-exam-'+i+'-level-'+level+'" name="onClickCorrectExamsAhozkoa" href="" class="ui-btn">Zuzendu</a>'
			statementsDivs=statementsDivs+
			'</div>';
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;align-content:center;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;align-content:center;width:60%;"><h4 id="example_h4_correct_answer_berridazketa-exam-'+i+'" style="margin-bottom:1%;"></h4></div>'+
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
		alert("Errorrea azterketaren mailan");
	}
	loadDataJSONAhozkoa(fileNameAhozkoa,level);
}
var state=0;
function recordVoice(level,exam){
	//Butons_recorder_ahozkoa-exam-'+i+'-level-'+level+'
	//$('#Butons_recorder_ahozkoa-exam-'+i+'-level-'+level).blur();
	audio.doStartRecord();
	
	
}
function stopVoice(level,exam){
	//$("#button-"+i+"-1-1").blur();
	var fileFolder=fileFolderAhozkoaVoice;
	if(userNow!=null){
		var fileName="voice_ahozkoa_userName_"+userNow.name+"_level_"+level+"_exam_"+exam+".3gp";
		audio.doStopRecordAsync(
			fileFolder,
			fileName,
			//Se ejecuta si ha ido todo bien
			function () {
				var file=audio.fileFolder+audio.fileName;//Guardar la ubicación del fichero de solución donde corresponda, según el ejercicio
				alert("Audio in: "+file);
				$('#file_voice_p_ahozkoa-exam-'+exam+'-level-'+level).text("File save:"+file);
				$('#file_voice_p_ahozkoa-exam-'+exam+'-level-'+level).show();
				//file_voice_audio_ahozkoa-exam-'+i+'-level-'+level+'
				$('#file_voice_audio_ahozkoa-exam-'+exam+'-level-'+level).attr("src",file);
				$('#file_voice_audio_ahozkoa-exam-'+exam+'-level-'+level).show();
			}
		);
	}
}

var audio = {
		media:null,
		fileFolder:null,
		fileName:null,
		//debemos crear un objeto medio sobre el que trabajar
		create: function(fileFolder,fileName) {
			this.fileFolder=fileFolder;
			this.fileName=fileName;
			if(this.media){
				//Liveramos si existe un objeto media usado
				this.media.release();
			}
				
			this.media=new Media(this.fileFolder+this.fileName);//Crear nuevo objeto media del fichero fileName de fileFolder y guardarlo en el atributo media
		},
		//metodo para empezar a grabar
		doStartRecord: function() {
			this.create("cdvfile://sdcard/","tmprecording.3gp");//Crear nuevo objeto para el atributo media, del fichero "tmprecording.3gp" de la carpeta por defecto
			if(this.media) {
				this.media.startRecord();//Comenzar a grabar con el objeto del atributo media
			}else {

				alert("Ez dago multiedia fitxategirik grabaketa egiteko");
			}	

		},
		//Se le pasa la carpeta donde queremos guardado, lo que queremos que se ejecute una vez grabado
		doStopRecordAsync: function(fileFolder,fileName,onSuccess) {
			if(this.media) {
		        var s=this.media.stopRecord();//Dejar de grabar con el objeto del atributo media
				fileUtilities.moveAsync(
						"/sdcard/tmprecording.3gp",fileFolder,fileName,//Mover el fichero de grabación creado "/sdcard/tmprecording.3gp", a la carpeta fileFolder, con nombre fileName
		        	function() {//función successCallback: si el fichero se ha movido
							audio.media.release();//Liberar el objeto del atributo media
						audio.fileFolder=fileFolder;//Guardar en el atributo fileFolder del objeto audio, la carpeta destino
						audio.fileName=fileName;//Guardar en el atributo fileName del objeto audio, el nuevo nombre del fichero
						if(onSuccess!=false)
							onSuccess();
		        	}
		        );
		    }
			else {
				alert("Ez dago multimedia fitxategirik gelditzeko");
			}		
		}		
};


var fileUtilities = {
		moveAsync: function (sourceFullPath,destFolder,destName,onSuccess){
			var url="cdvfile://"+sourceFullPath;
			var destFile="cdvfile://"+destFolder+destName;
			var ft=new FileTransfer();//Crear objeto FileTransfer
		    ft.download(//Copiar (descargar) el fichero indicado por URL en destFile
				url,
				destFile,
		    	function() {//función successCallback: si el fichero se descargó bien
					window.resolveLocalFileSystemURL(url,//Acceder al fichero original por su URL
		    				function(fileEntry) {//función successCallback: si se ha podido acceder al fichero original
								fileEntry.remove(onSuccess);//Borrar el fichero y seguir con onSuccess
		    				},
		    				function(error) {
		    					alert("Ez dago iturri fitxategirik baliagarri; ez da ezabatu");
		    				}
		    		);			
				},
				function(error) {
					alert(error.prototype+' Fitxategia ez da kopiatu. '+'error.code: '+error.code+'\nerror.source: '+error.source+'\nerror.target: '+error.target+'\nerror.http_status: '+error.http_status);
				}
			);
		}
};

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
		    			$('#example_h4_correct_answer_berridazketa-exam-'+numExam+'').text("Erantzun zuzenak: "+successes);
		    			//En el caso de que successes sea mayor a la mitad de las presntas se dara por superiado el examen
    			    	if(successes>=((exams[numExam].statements.length/2)+1)){	
    			    		var resultExam=10*(successes/(exams[numExam].statements.length));
    			    		alert("Azterketa gainditu duzu "+resultExam+" punturekin");
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
		    			$('#example_h4_correct_answer_berridazketa-exam-'+numExam+'').text("Erantzun zuzenak: "+successes);
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
		    						$(this).text("Azterketa "+(index+1)+" Puntuazioa: "+examsBerridazketakNow[con].result);
		    						
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
	    	alert("Errorea:"+"Ez da existitzen orrialde horren IDrik");
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
						'<div class="ui-block-b" style="text-align:center;width:60%;">'+'<ul data-role="listview"><li><a href="#tests_page_menu_level_'+level+'" class="ui-btn ui-btn-inline ui-corner-all" >Atzera</a></li></ul>'+'</div>'+
						'<div class="ui-block-c" style="text-align:right;width:20%;">'+
						'</div>'+
					'</div>'+
				'</div>';
			pageDiv.append(headerDiv,contentDiv,footerDiv);
			return pageDiv;
		},
		
		create: function(i,exams,level){
			if(exams==null || level==null){
				alert("Ezin izan da pantaila erakutsi, pasatako balioa minus bat izan baita");
				return null;
			}else if(i>=exams.length){
				alert("Ezin da daukazuna baino maila altuagoko azterketarik eskatu");
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
			statementsDivs=statementsDivs+'<a id="correctExams_a_'+'berridazketa'+'-exam-'+i+'-level-'+level+'" name="onClickCorrectExams" href="" class="ui-btn">Zuzendu</a>'
			statementsDivs=statementsDivs+'<a id="correctExams_a_showSolution'+'berridazketa'+'-exam-'+i+'-level-'+level+'" name="onClickShowSolution" href="" class="ui-btn">Ikusi soluzioak</a>'
			
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;align-content:center;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;align-content:center;width:60%;"><h4 id="example_h4_correct_answer_berridazketa-exam-'+i+'" style="margin-bottom:1%;">Erantzun zuzenak: 0</h4></div>'+
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
		alert("Errorea azterketaren mailan");
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
    	alert("Ezin da aurkitu azterketa mailen menuaren IDa");
    }
	
}
var pageLeves={
		
		create: function(){
			var pageDiv=$('<div data-role="page" id="levels_page_menu" name="levels_page_menu"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Hizkuntza mailak - Erabiltzailea: '+userNow.name+'</h1>'+
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
						'<div class="ui-block-b" style="text-align:center;width:60%;">'+'<ul data-role="listview"><li><a href="#authentication_page" class="ui-btn ui-btn-inline ui-corner-all" >Irten</a></li></ul>'+'</div>'+
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
		alert("Errorea azterketaren mailan");
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
    	alert("Ez da aurkitu azterketa moten menuaen IDa");
    }
	
}
var pageExams={
		create: function(level){
			if(level==null || level==""){
				alert("Errorea azterketen menua sortzerakoan");
			}
			var pageDiv=$('<div data-role="page" id="tests_page_menu_level_'+level+'" name="tests_page_menu_level_'+level+'"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Maila: '+level+'</h1>'+
				'</div>';
			
			
			//Debemos crear los niveles
			
			var statementsDivs='<ul data-role="listview" data-inset="true">';
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadAtarikoaMenu(&#39;'+level+'&#39;)" id="levels_li_menu_tests_level_'+level+'-proof-'+'atarikoa'+'">'+'Atarikoa'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadIdatzizkoa(&#39;'+level+'&#39;)" id="levels_li_menu_tests_level_'+level+'-proof-'+'idatzizkoa'+'">'+'Idatzizkoa'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadSinonimoakMenu(&#39;'+level+'&#39;)" id="levels_li_menu_tests_level_'+level+'-proof-'+'sinonimoak'+'">'+'Sinonimoak'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadBerridazketak(&#39;'+level+'&#39;)" id="levels_li_menu_tests_level_'+level+'-proof-'+'berridazketak'+'">'+'Berridazketak'+'</a></li>';
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadEntzunezkoaMenu(&#39;'+level+'&#39;)" id="levels_li_menu_tests_level_'+level+'-proof-'+'entzumena'+'">'+'Entzunezkoa'+'</a></li>';
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
						'<div class="ui-block-b" style="text-align:center;width:60%;">'+'<ul data-role="listview"><li><a href="#levels_page_menu" class="ui-btn ui-btn-inline ui-corner-all" >Atzera</a></li></ul>'+
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
//ATARIKOA OBJECT
var pageAtarikoa={
		
		createMenu: function(exams,level){
			if(level==null || exams==null){
				return null;
			}
			$('#page_menu_atarikoa').remove();
			var pageDiv=$('<div data-role="page" id="page_menu_atarikoa" name="page_menu_atarikoa"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Atarikoa '+level+'</h1>'+
				'</div>';
			
			var statementsDivs='<ul data-role="listview" data-inset="true">';
			
			for(var con=0;con<exams.length;con++){
				if(userNow.examsAtarikoa){
					var aprobado=false;
					var examenHecho=false;
					for(var k=0;k<userNow.examsAtarikoa.length;k++){
						if(userNow.examsAtarikoa[k].level==level && userNow.examsAtarikoa[k].numExam==con){
							examenHecho=true;
							if(userNow.examsAtarikoa[k].result>exams[con].statements.length*(3/4)){
								aprobado=true;
							}
						}
					}
					if(aprobado){
						statementsDivs=statementsDivs+
						'<li><a href="#" onClick="loadExamAtarikoa(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" style="color:#0000ff;" id="menu_exam_atarikoa-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
					}else if(examenHecho){
						statementsDivs=statementsDivs+
						'<li><a href="#" onClick="loadExamAtarikoa(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" style="color:#cc0000;" id="menu_exam_atarikoa-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
					}else{
						statementsDivs=statementsDivs+
						'<li><a href="#" onClick="loadExamAtarikoa(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" id="menu_exam_atarikoa-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
					}
				}else{
					statementsDivs=statementsDivs+
					'<li><a href="#" onClick="loadExamAtarikoa(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" id="menu_exam_atarikoa-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
				}
			}
			
			statementsDivs=statementsDivs+'</ul>';

			
			
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;width:60%;">'+'<ul data-role="listview"><li><a href="#tests_page_menu_level_'+level+'" class="ui-btn ui-btn-inline ui-corner-all" >Atzera</a></li></ul>'+'</div>'+
						'<div class="ui-block-c" style="text-align:right;width:20%;">'+
						'</div>'+
					'</div>'+
				'</div>';
			pageDiv.append(headerDiv,contentDiv,footerDiv);
			return pageDiv;
		},
		
		createExam: function(i,exams,level){
			if(exams==null || level==null){
				alert("Ezin izan da pantaila erakutsi, pasatako balioa minus bat izan baita");
				return null;
			}else if(i>=exams.length){
				alert("Ezin da daukazuna baino maila altuagoko azterketarik eskatu");
				return null;
			}
			$('#page-exam-atarikoa-'+i).remove();
			var pageDiv=$('<div id="page-exam-atarikoa-'+i+'" data-role="page" ></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Atarikoa '+level+' '+(i+1)+'</h1>'+
				'</div>';
			
			var statementsDivs="";
			for(var con=0;con<exams[i].statements.length;con++){
				statementsDivs+=
				'<fieldset data-role="controlgroup" data-iconpos="right">'+
				'<legend id="question-'+con+'">'+(con+1)+'.- '+exams[i].statements[con].statement+'</legend>'+
				'<input name="radio-choice-atarikoa-'+con+'" id="radio-choice-'+con+'a" data-mini="true" value="0" type="radio"/>'+
				'<label for="radio-choice-'+con+'a" id="label-radio-choice-'+con+'-0">'+exams[i].statements[con].answers[0].first+'</label>'+
				'<input name="radio-choice-atarikoa-'+con+'" id="radio-choice-'+con+'b" data-mini="true" value="1" type="radio"/>'+
				'<label for="radio-choice-'+con+'b" id="label-radio-choice-'+con+'-1">'+exams[i].statements[con].answers[0].second+'</label>'+
				'<input name="radio-choice-atarikoa-'+con+'" id="radio-choice-'+con+'c" data-mini="true" value="2" type="radio"/>'+
				'<label for="radio-choice-'+con+'c" id="label-radio-choice-'+con+'-2">'+exams[i].statements[con].answers[0].third+'</label>'+
				'<input name="radio-choice-atarikoa-'+con+'" id="radio-choice-'+con+'d" data-mini="true" value="3" type="radio"/>'+
				'<label for="radio-choice-'+con+'d" id="label-radio-choice-'+con+'-3">'+exams[i].statements[con].answers[0].fourth+'</label>'+
				'</fieldset>';
			}
			statementsDivs=statementsDivs+'<div id="form-atarikoa-buttons">';
			statementsDivs=statementsDivs+'<a id="correctExams_atarikoa" name="onClickCorrectExams" href="" onClick="checkAtarikoa(&#39;'+i+'&#39;,&#39;'+level+'&#39;)" class="ui-btn">Zuzendu</a>'
			statementsDivs=statementsDivs+'</div>';
			statementsDivs='<form id="form-atarikoa">'+statementsDivs+'</form>';
			
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;align-content:center;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;align-content:center;width:60%;"><h4 id="correct_answer_atarikoa" style="margin-bottom:1%;">Erantzun zuzena: 0</h4></div>'+
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
var pageSinonimoak={
		
		createMenu: function(exams,level){
			if(level==null || exams==null){
				return null;
			}
			$('#page_menu_sinonimoak').remove();
			var pageDiv=$('<div data-role="page" id="page_menu_sinonimoak" name="page_menu_sinonimoak"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Sinonimoak '+level+'</h1>'+
				'</div>';
			
			var statementsDivs='<ul data-role="listview" data-inset="true">';
			
			for(var con=0;con<exams.length;con++){
				if(userNow.examsSinonimoak){
					var aprobado=false;
					var examenHecho=false;
					for(var k=0;k<userNow.examsSinonimoak.length;k++){
						if(userNow.examsSinonimoak[k].level==level && userNow.examsSinonimoak[k].numExam==con){
							examenHecho=true;
							if(userNow.examsSinonimoak[k].result>exams[con].statements.length*(3/5)){
								aprobado=true;
							}
						}
					}
					if(aprobado){
						statementsDivs=statementsDivs+
						'<li><a href="#" onClick="loadExamSinonimoak(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" style="color:#0000ff;" id="menu_exam_sinonimoak-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
					}else if(examenHecho){
						statementsDivs=statementsDivs+
						'<li><a href="#" onClick="loadExamSinonimoak(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" style="color:#cc0000;" id="menu_exam_sinonimoak-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
					}else{
						statementsDivs=statementsDivs+
						'<li><a href="#" onClick="loadExamSinonimoak(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" id="menu_exam_sinonimoak-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
					}
				}else{
					statementsDivs=statementsDivs+
					'<li><a href="#" onClick="loadExamSinonimoak(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" id="menu_exam_sinonimoak-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
				}
			}
			
			statementsDivs=statementsDivs+'</ul>';

			
			
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;width:60%;">'+'<ul data-role="listview"><li><a href="#tests_page_menu_level_'+level+'" class="ui-btn ui-btn-inline ui-corner-all" >Atzera</a></li></ul>'+'</div>'+
						'<div class="ui-block-c" style="text-align:right;width:20%;">'+
						'</div>'+
					'</div>'+
				'</div>';
			pageDiv.append(headerDiv,contentDiv,footerDiv);
			return pageDiv;
		},
		
		createExam: function(i,exams,level){
			if(exams==null || level==null){
				alert("Ezin izan da pantaila erakutsi, pasatako balioa minus bat izan baita");
				return null;
			}else if(i>=exams.length){
				alert("Ezin da daukazuna baino maila altuagoko azterketarik eskatu");
				return null;
			}
			$('#page-exam-sinonimoak').remove();
			var pageDiv=$('<div id="page-exam-sinonimoak" data-role="page" ></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Sinonimoak '+level+' '+(i+1)+'</h1>'+
				'</div>';
			
			var statementsDivs="";
			for(var con=0;con<exams[i].statements.length;con++){
				statementsDivs+=
				'<fieldset data-role="controlgroup" data-iconpos="right">'+
				'<legend id="question-'+con+'">'+(con+1)+'.- '+exams[i].statements[con].statement+' ('+exams[i].statements[con].placeholder+')</legend>'+
				'<input name="answer-sinonimoak-'+con+'" id="answer-sinonimoak-'+con+'a" data-mini="true" data-clear-btn="true" value="" type="text"/>'+
				'</fieldset>';
			}
			statementsDivs=statementsDivs+'<div id="form-sinonimoak-buttons">';
			statementsDivs=statementsDivs+'<a id="correctExams_sinonimoak" name="onClickCorrectExams" href="" onClick="checkSinonimoak(&#39;'+i+'&#39;,&#39;'+level+'&#39;)" class="ui-btn">Zuzendu</a>'
			statementsDivs=statementsDivs+'</div>';
			statementsDivs='<form id="form-sinonimoak">'+statementsDivs+'</form>';
			
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;align-content:center;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;align-content:center;width:60%;"><h4 id="correct_answer_sinonimoak" style="margin-bottom:1%;">Erantzun zuzena: 0</h4></div>'+
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
var pageEntzunezkoa={
		
		createMenu: function(exams,level){
			if(level==null || exams==null){
				return null;
			}
			$('#page_menu_entzunezkoa').remove();
			var pageDiv=$('<div data-role="page" id="page_menu_entzunezkoa" name="page_menu_entzunezkoa"></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Entzunezkoa '+level+'</h1>'+
				'</div>';
			
			var statementsDivs='<ul data-role="listview" data-inset="true">';
			
			for(var con=0;con<exams.length;con++){
				if(userNow.examsEntzunezkoa){
					var aprobado=false;
					var examenHecho=false;
					for(var k=0;k<userNow.examsEntzunezkoa.length;k++){
						if(userNow.examsEntzunezkoa[k].level==level && userNow.examsEntzunezkoa[k].numExam==con){
							examenHecho=true;
							if(userNow.examsEntzunezkoa[k].result>exams[con].statements.length*(3/5)){
								aprobado=true;
							}
						}
					}
					if(aprobado){
						statementsDivs=statementsDivs+
						'<li><a href="#" onClick="loadExamEntzunezkoa(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" style="color:#0000ff;" id="menu_exam_entzunezkoa-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
					}else if(examenHecho){
						statementsDivs=statementsDivs+
						'<li><a href="#" onClick="loadExamEntzunezkoa(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" style="color:#cc0000;" id="menu_exam_entzunezkoa-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
					}else{
						statementsDivs=statementsDivs+
						'<li><a href="#" onClick="loadExamEntzunezkoa(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" id="menu_exam_entzunezkoa-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
					}
				}else{
					statementsDivs=statementsDivs+
					'<li><a href="#" onClick="loadExamEntzunezkoa(&#39;'+con+'&#39;,&#39;'+level+'&#39;)" id="menu_exam_entzunezkoa-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
				}
			}
			
			statementsDivs=statementsDivs+'</ul>';

			
			
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;width:60%;">'+'<ul data-role="listview"><li><a href="#tests_page_menu_level_'+level+'" class="ui-btn ui-btn-inline ui-corner-all" >Atzera</a></li></ul>'+'</div>'+
						'<div class="ui-block-c" style="text-align:right;width:20%;">'+
						'</div>'+
					'</div>'+
				'</div>';
			pageDiv.append(headerDiv,contentDiv,footerDiv);
			return pageDiv;
		},
		
		createExam: function(i,exams,level){
			if(exams==null || level==null){
				alert("Ezin izan da pantaila erakutsi, pasatako balioa minus bat izan baita");
				return null;
			}else if(i>=exams.length){
				alert("Ezin da daukazuna baino maila altuagoko azterketarik eskatu");
				return null;
			}
			$('#page-exam-entzunezkoa').remove();
			var pageDiv=$('<div id="page-exam-entzunezkoa" data-role="page" ></div>');
			var headerDiv=
				'<div data-role="header" data-position="fixed" >'+
					'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">'+'Entzunezkoa '+level+' '+(i+1)+'</h1>'+
				'</div>';

			var statementsDivs='<audio controls>'+
									// '<source src="/sdcard/eus.ehu.INTEL901_504021.TTA1516_LS_EX_09v2/audio/Libre.mp3" type="audio/mpeg">'+
									'<source src="'+exams[i].audioUrl+'.mp3" type="audio/mpeg">'+
									'<source src="'+exams[i].audioUrl+'.ogg" type="audio/ogg">'+
									'Your browser does not support the audio element.'+
								'</audio>';
			for(var con=0;con<exams[i].statements.length;con++){
				statementsDivs+=
				'<fieldset data-role="controlgroup" data-iconpos="right">'+
				'<legend id="question-'+con+'">'+(con+1)+'.- '+exams[i].statements[con].statement+'</legend>'+
				'<input name="radio-choice-entzunezkoa-'+con+'" id="radio-choice-'+con+'a" data-mini="true" value="0" type="radio"/>'+
				'<label for="radio-choice-'+con+'a" id="label-radio-choice-'+con+'-0">'+exams[i].statements[con].answers[0].first+'</label>'+
				'<input name="radio-choice-entzunezkoa-'+con+'" id="radio-choice-'+con+'b" data-mini="true" value="1" type="radio"/>'+
				'<label for="radio-choice-'+con+'b" id="label-radio-choice-'+con+'-1">'+exams[i].statements[con].answers[0].second+'</label>'+
				'<input name="radio-choice-entzunezkoa-'+con+'" id="radio-choice-'+con+'c" data-mini="true" value="2" type="radio"/>'+
				'<label for="radio-choice-'+con+'c" id="label-radio-choice-'+con+'-2">'+exams[i].statements[con].answers[0].third+'</label>'+
				'</fieldset>';
			}
			statementsDivs=statementsDivs+'<div id="form-entzunezkoa-buttons">';
			statementsDivs=statementsDivs+'<a id="correctExams_entzunezkoa" name="onClickCorrectExams" href="" onClick="checkEntzunezkoa(&#39;'+i+'&#39;,&#39;'+level+'&#39;)" class="ui-btn">Zuzendu</a>'
			statementsDivs=statementsDivs+'</div>';
			statementsDivs='<form id="form-entzunezkoa">'+statementsDivs+'</form>';
			
			var contentDiv=
				'<div data-role="content">'+statementsDivs+'</div>';
			var footerDiv=
				'<div data-role="footer" data-position="fixed" style="padding-top:1%;">'+
					'<div class="ui-grid-b">'+
						'<div class="ui-block-a" style="text-align:left;align-content:center;width:20%;">'+
						'</div>'+
						'<div class="ui-block-b" style="text-align:center;align-content:center;width:60%;"><h4 id="correct_answer_entzunezkoa" style="margin-bottom:1%;">Erantzun zuzena: 0</h4></div>'+
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
