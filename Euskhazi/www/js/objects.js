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
			
			var statementsDivs='<ul data-role="listview">';
			
			for(var con=0;con<exams.length;con++){
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadExamAtarikoa('+con+')" id="menu_exam_atarikoa-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
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
		
		createExam: function(i,exams,level){
			if(exams==null || level==null){
				alert("No se ha podido presentar en pantalla porque se ha pasado un valor menos a uno");
				return null;
			}else if(i>=exams.length){
				alert("No se puede solicitar un numero de examen superior al que se tiene");
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
			statementsDivs=statementsDivs+'<a id="correctExams_atarikoa" name="onClickCorrectExams" href="" onClick="checkAtarikoa('+i+')" class="ui-btn">Zuzendu</a>'
			statementsDivs=statementsDivs+'<a style="display:none;" id="salir-atarikoa-button" href="#page_menu_atarikoa" class="ui-btn">Irten</a>'
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
			
			var statementsDivs='<ul data-role="listview">';
			
			for(var con=0;con<exams.length;con++){
				statementsDivs=statementsDivs+
				  '<li><a href="#" onClick="loadExamSinonimoak('+con+')" id="menu_exam_sinonimoak-'+level+'-'+con+'">'+'Azterketa '+(con+1)+'</a></li>';
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
		
		createExam: function(i,exams,level){
			if(exams==null || level==null){
				alert("No se ha podido presentar en pantalla porque se ha pasado un valor menos a uno");
				return null;
			}else if(i>=exams.length){
				alert("No se puede solicitar un numero de examen superior al que se tiene");
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
			statementsDivs=statementsDivs+'<a id="correctExams_sinonimoak" name="onClickCorrectExams" href="" onClick="checkSinonimoak('+i+')" class="ui-btn">Zuzendu</a>'
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
