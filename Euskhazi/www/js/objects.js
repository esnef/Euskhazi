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

var user={
		name:null,
		pass:null
}


var tests = {
	login: null,
	total: 3,
	test: [
	       {
	    	   	question: "Bla bla bla?",
	    	   	resp: [
	    	          "Response 0-A",
	    	          "Response 0-B",
	    		      "Response 0-C",
	    		      "Response 0-D"
	    		      ],
	    		correct: "1",
	    		adv: [
	    	          "audio/ADV_0_0.ogg",
	    	          "",
	    		      "Advice 0-C",
	    		      "Advice 0-D"
	    		     ]
	       },
	       {
	    	   	question: "Ble ble ble?",
	    	   	resp: [
	    	          "Response 1-A",
	    	          "Response 1-B",
	    		      "Response 1-C",
	    		      "Response 1-D"
	    		      ],
	    		correct: "3",
	    		adv: [
	    	          "video/ADV_1_0.mp4",
	    	          "Advice 1-B",
	    		      "Advice 1-C",
	    		      ""
	    		     ]	      
	       },
	       {
	    	   	question: "Bli bli bli?",
	    	   	resp: [
	    	          "Response 2-A",
	    	          "Response 2-B",
	    		      "Response 2-C",
	    		      "Response 2-D"
	    		      ],
	    		correct: "0",
	    		adv: [
	    	          "",
	    	          "img/ADV_2_1.jpg",
	    		      "img/ADV_2_2.png",
	    		      "Advice 2-D"
	    		     ]
	       }
	 ]
};

var results = {
	login: null,
	corrects: 0,
	answered: 0
};

var page = {
	create: function(i) {
//		alert("create1");
		var pageDiv=$('<div data-role="page" id="page-'+i+'"></div>');
		var headerDiv=
			'<div data-role="header" data-position="fixed" >'+
				'<h1 style="margin-left:0;margin-right:0;white-space: nowrap;overflow: visible;">TTA1516_LS-EX_08v5: test5</h1>'+
			'</div>';
		
		var contentDiv=
			'<div data-role="content">'+
				'<h3 class="login"></h3>'+
				'<form id="form-'+i+'">'+
					'<fieldset data-role="controlgroup" data-iconpos="right">'+
					'<legend id="question-'+i+'"></legend>'+
					'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'a" data-mini="true" value="0" type="radio"/>'+
					'<label for="radio-choice-'+i+'a" id="label-radio-choice-'+i+'-0"></label>'+
					'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'b" data-mini="true" value="1" type="radio"/>'+
					'<label for="radio-choice-'+i+'b" id="label-radio-choice-'+i+'-1"></label>'+
					'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'c" data-mini="true" value="2" type="radio"/>'+
					'<label for="radio-choice-'+i+'c" id="label-radio-choice-'+i+'-2"></label>'+
					'<input name="radio-choice-'+i+'" id="radio-choice-'+i+'d" data-mini="true" value="3" type="radio"/>'+
					'<label for="radio-choice-'+i+'d" id="label-radio-choice-'+i+'-3"></label>'+
					'</fieldset>'+
					'<div style="text-align:center;">'+
						'<a href="" id="button-'+i+'-1" class="ui-btn ui-btn-inline ui-corner-all" onclick="check('+i+')">CHECK</a>'+
						'<a href="" id="button-'+i+'-2" class="ui-btn ui-btn-inline ui-corner-all" style="display:none;" onclick="">ADVICE</a>'+						
					'</div>'+
				'</form>'+
				'<div id="audioAdvice-'+i+'" style="display:none;">'+
					'AUDIO ADVICE'+
					'<audio id="audio-'+i+'" controls="controls" preload="none">'+
						'<source id="src-audio-'+i+'" src=""/>'+
					'</audio>'+
				'</div>'+						
				'<div id="videoAdvice-'+i+'" style="display:none;">'+
					'VIDEO ADVICE'+
					'<video id="video-'+i+'" controls="controls" width="100%" height="auto">'+						
						'<source id="src-video-'+i+'" src="" type="video/mp4"/>'+
					'</video>'+
				'</div>'+
				'<div id="imageAdvice-'+i+'" style="display:none;">'+
					'<img id="image-'+i+'" alt="" src="" width="auto" height="auto" style="border: black 1px solid;"/>'+
				'</div>'+				
			'</div>';
		
		var footerDiv=
			'<div data-role="footer" data-position="fixed">'+
				'<div class="ui-grid-b" style="width:80%; text-align:center; font-weight:normal;">'+
					'<div class="ui-block-a">RESULTS: </div>'+
					'<div class="ui-block-b res-1" id="res-'+i+'-1"></div>'+
					'<div class="ui-block-c res-2" id="res-'+i+'-2"></div>'+
				'</div>'+			
				'<h4>2015-2016 TTA</h4>'+
				'<a href="#" id="prev-'+i+'" class="ui-btn ui-mini ui-corner-all ui-icon-arrow-l ui-btn-icon-left" data-transition="turn">Prev</a>'+
				'<a href="#" id="next-'+i+'" class="ui-btn ui-mini ui-corner-all ui-icon-arrow-r ui-btn-icon-left" data-transition="turn">Next</a>'+
			'</div>';
		
		pageDiv.append(headerDiv,contentDiv,footerDiv);
		
//		alert("create2");
		return pageDiv;
	},
	load: function(i) {
//		alert("load1");
		
     	$("#question-"+i).text("QUESTION "+i+": "+tests.test[i].question);
    	
     	$("label[id|='label-radio-choice-"+i+"']").each(
     			function(index) {     				
     				$(this).text(tests.test[i].resp[index]);     				
    		    }
     	);
     	
     	$("#prev-"+i).attr("href","#page-"+(i-1));
     	$("#next-"+i).attr("href","#page-"+(i+1));
//			alert("load7");
 	}
};
