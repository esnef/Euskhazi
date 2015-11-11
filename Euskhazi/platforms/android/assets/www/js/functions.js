/*
 * $Id: functions.js Oct 9, 2015 9:47:15 AM tta1516$
 * 
 * Copyright (C) 2015 Maider Huarte Arrayago
 * 
 * This file is part of TTA1516_LS-EX_08v5_www.zip.
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
//BERRIDAZKETAK INIT
function loadDataJSONAtarikoa(level){
//	$.getJSON(fileFolder+level+'/'+fileName, function(json) {
	$.getJSON('exams/'+level+'/Atarikoa.json', function(json) {
	    console.log(json); // this will show the info it in firebug console
	    examsAtarikoa=json;
//	    examsAtarikoa[0].statements[0].statement;//lehenengo galdera iteko
//	    examsAtarikoa[0].statements[0].answers[0];//lehenengo galderaren lehenengo erantzuna
	});	
}

function loadAtarikoaMenu(){
	loadDataJSONAtarikoa('B1');
	setTimeout(function() {
		var $menuAtarikoa = pageAtarikoa.createMenu(examsAtarikoa, 'B1');
		$("body").append($menuAtarikoa);
		$("body").enhanceWithin();
		$(':mobile-pagecontainer').pagecontainer('change', '#page_menu_atarikoa');
	}, 50);
	
}

function loadExamAtarikoa(i){
	var $examenAtarikoa = pageAtarikoa.createExam(i, examsAtarikoa, 'B1')
	$("body").append($examenAtarikoa);
	$("body").enhanceWithin();
	$(':mobile-pagecontainer').pagecontainer('change', '#page-exam-atarikoa-'+i);
}

function checkAtarikoa(i){
	var respondidos=0;
	var correctos=0;
	for(var con=0;con < examsAtarikoa[i].statements.length;con++){
		var answer=$("input[name='radio-choice-atarikoa-"+con+"']:checked").val();
		if(answer){
			$("label[id|='label-radio-choice-"+con+"']").each(
				function(index) {
					if(index!=examsAtarikoa[i].statements[con].solution) {
						$(this).css("color","red");
					}
					else
						$(this).css({"color":"white","background-color":"green","font-size":"24px"});
				}
			);
			respondidos++;
			if(answer == examsAtarikoa[i].statements[con].solution){
				correctos++;
			}
		}
	}
	$('#correct_answer_atarikoa').text('Erantzun zuzenak: '+correctos);
	if(respondidos < examsAtarikoa[i].statements.length){
		alert((examsAtarikoa[i].statements.length-respondidos)+' galdera falta zaizkizu erantzuteko');
		return;
	}
	var minimoParaAprobar=examsAtarikoa[i].statements.length*(3/4);
	
	$buttons=$('#form-atarikoa-buttons').empty();
	backButton='<a id="salir-atarikoa-button" href="#page_menu_atarikoa" class="ui-btn">Irten</a>';
	$buttons.append(backButton);
	
	if(correctos<minimoParaAprobar){
		alert('Ez duzu gainditu!');
		
	}else{
		alert('ZORIONAK!! Gainditu duzu!');
	}
}

/*function login() { 
	var loginVal=$("#login").val();
	

	if(loginVal.trim.length != 0){
		user.name=loginVal;
		confirm("User login"+loginVal);
		$(".login").text("LOGIN: "+loginVal);
		tests.login=loginVal;
		results.login=loginVal;
		$("#form-0").show();
		$("#request").hide();
	}
	
		
}

function check(i) {
//	alert("check 1");
	
	results.answered++;
	
	var answer=$("input[name='radio-choice-"+i+"']:checked").val();
	
	if(answer==tests.test[i].correct) {
		alert("CORRECT");
		results.corrects++;
	}
	else {
		alert("WRONG");
		$("#button-"+i+"-2").attr("onclick","advice("+i+","+answer+")");
		$("#button-"+i+"-2").css("display","block");
	}
	
	$(".res-1").text(""+results.corrects+"/"+results.answered);
	$(".res-2").text(""+(results.corrects*100/results.answered).toFixed(2)+"%");
	
	$("label[id|='label-radio-choice-"+i+"']").each(
		function(index) {
			if(index!=tests.test[i].correct) { //This can be done because of appropriate "value" attributes and label-radio-choice id attributes
				$(this).css("color","red");
			}
			else
				$(this).css({"color":"white","background-color":"green","font-size":"24px"});
		}
	);

	$("#button-"+i+"-1").attr("onclick","");
//	alert("check 7");
}*/

/*function advice(pI,qI) {
	var adv=tests.test[pI].adv[qI];
	if(adv.endsWith("ogg")||adv.endsWith("mp3")){
		$("#src-audio-"+pI).attr("src",adv);
		$("#audio-"+pI).trigger("load");
		$("#audioAdvice-"+pI).show();
		$("#audio-"+pI).trigger("play");
	}
	else{
		if(adv.endsWith("mp4")){
			//set video URL
			//load video
			//show video
			//play video	
		}
		else{
			if(adv.endsWith("jpg")||adv.endsWith("png")){
				$("#image-"+pI).attr("src",adv);
				$("#imageAdvice-"+pI).show();
			}
			else{
				alert("ADVICE: "+adv);
			}
		}
	}
		
}*/
