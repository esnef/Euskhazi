
function login() {
	var loginVal=$("#authentication_login_input").val();
	var newUser=new User();
	newUser.name=loginVal.toString().trim();
	if(loginVal!=null && loginVal.toString().trim().length != 0){
		if(checkUser(newUser)){
			saveNewUser(newUser);
			refreshUsersList();
			loadUser(newUser.name);
		}else{
			alert("Erabiltzaile bat existitzen da dagoeneko izen horrekin");
		}
	}else{
		alert("Erabiltzaile izena hutsa dago");
	}	
}

function start(){

	refreshUsers();

	
	/**
	 * Funcion que permite controlar los botones presionados un tiempo elevado
	 */
	/*
	$("a[name*='authentication_users_ul_li_']").on("taphold",function(){
			alert("s1");
		  var name=$(this).val;
		  var $dialogremoveuser=$('#dialogremoveuser');
		  
		  //$dialogremoveuser.show();
		  $.mobile.changePage('#dialogremoveuser', 'pop', true, true);
		  // New on() style:
		  $('#dialogRemoveUserConfirmar').on('click', '.item', function(name) {
			  alert("s8");
			  removeUser(name);
		  });
		  //$('#dialogRemoveUserConfirmar').click(removeUser(name));
		});
	*/
}

function refreshUsers(){
	//Sacamos los valores gusrdados de los diferentes usuarios guardados
	var permanentStorage = window.localStorage;
	var tempStorage = window.sessionStorage;
	var usersJSON=window.localStorage.getItem(keyUsers);
	if(usersJSON!=null){
		//Existen usuario con lo que hay que cargarlos
			users=JSON.parse(usersJSON);
			refreshUsersList();	
	}
}

function refreshUsersList(){
	if(users!=null){
		var $authentication_users_ul=$('#authentication_users_ul');
		$authentication_users_ul.empty()
		if(users.length>0){
			$('#lista_usuarios_h4').show();
		}
		for(con=0;con<users.length;con++){
			
			$authentication_users_ul.append(
					'<li><a href="#" onClick="loadUser(&#39;'+users[con].name+'&#39;)" name="authentication_users_ul_li_'+users[con].name+'">'+users[con].name+'</a></li>'
					);
			
		}
    	$('#authentication_users_ul').listview('refresh');
	}
}

function loadUser(name){
	var position=findUser(name);
	if(position>=0){
		userNow=users[position];
		loadPageLeves();
	}
}

/*
function refreshNewUsersList(){
	if(users!=null){
		var $authentication_users_ul=$('#authentication_users_ul');	
		$authentication_users_ul.append('<li><a href="#" name="authentication_users_ul_li_'+users[con].name+'>'+users[users.length-1].name+'</a></li>');
		$authentication_users_ul.listview('refresh');
	}
}
*/
function checkUser(newUser){
	if(newUser==null){
		return false;
	}else if(users==null){
		return false;
	}else{
		for(con=0;con<users.length;con++){
			if(users[con].name==newUser.name){
				return false;
			}
		}
		return true;
	}
}

function saveNewUser(newUser){
	if(users==null){
		users=new Array();
	}
	users.push(newUser);
	saveUsers();
}

function saveUsers(){
	var permanentStorage = window.localStorage;
	var tempStorage = window.sessionStorage;
	var usersJSON=window.localStorage.setItem(keyUsers,JSON.stringify(users));
	refreshUsers();
}


/**
 * Esta funcion nos indica
 * @param name
 * @returns se devuelve la posición del usuario en el array.
 */
function findUser(name){
	if(name==null){
		return -1;
	}else if(users==null){
		refreshUsers();
	}
	for(con=0;con<users.length;con++){
		if(name==users[con].name){
			return con
		}
	}
	return -1//No existe ningun usuario con ese nombre
}
/**
 * /**
 * Esta función se ejecuta cada vez que se quiera borrar un usuario, para ello se debe saber cual es el usuario
 * al que se quiera borrar con lo que en el caso de borrardo se debe saber que usuario borrar
 * @param name
 */
function removeUser(name){
	if(name==null)return false;
	var position=findUser(name);
	if(position <0){
		return false//Error o no existe el usuario indicado
	}else{
		users.splice(position,1);//Eliminamos un valor de la lista
		saveUsers();//Guardamos la lista para que se quede almacenada
		//ahora lo que nos faltaria es resetear la lista,con lo que tendremos que quitar de esta el <li>
		$("li[name='authentication_users_ul_li_"+name+"']").remove();
		return true;
	}
	
}


function check(i) {
//	alert("check 1");
	
	results.answered++;
	
	var answer=$("input[name='radio-choice-"+i+"']:checked").val();
	
	if(answer==tests.test[i].correct) {
		alert("ZUZENA");
		results.corrects++;
	}
	else {
		alert("OKERRA");
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
}

function advice(pI,qI) {
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
				alert("AHOLKUA: "+adv);
			}
		}
	}
		
}

//ATARIKOA INIT
function loadDataJSONAtarikoa(level){
//	$.getJSON(fileFolder+level+'/'+fileName, function(json) {
	$.getJSON('exams/'+level+'/Atarikoa.json', function(json) {
	    console.log(json); // this will show the info it in firebug console
	    examsAtarikoa=json;
//	    examsAtarikoa[0].statements[0].statement;//lehenengo galdera iteko
//	    examsAtarikoa[0].statements[0].answers[0];//lehenengo galderaren lehenengo erantzuna
	});	
}

function loadAtarikoaMenu(level){
	loadDataJSONAtarikoa(level);
	setTimeout(function() {
		var $menuAtarikoa = pageAtarikoa.createMenu(examsAtarikoa, level);
		$("body").append($menuAtarikoa);
		$("body").enhanceWithin();
		$(':mobile-pagecontainer').pagecontainer('change', '#page_menu_atarikoa');
	}, 50);
	
}

function loadExamAtarikoa(i,level){
	var $examenAtarikoa = pageAtarikoa.createExam(i, examsAtarikoa, level)
	$("body").append($examenAtarikoa);
	$("body").enhanceWithin();
	$(':mobile-pagecontainer').pagecontainer('change', '#page-exam-atarikoa-'+i);
}

function checkAtarikoa(i,level){
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
	backButton='<a id="salir-atarikoa-button" href="#" onClick="loadAtarikoaMenu(&#39;'+level+'&#39;)" class="ui-btn">Irten</a>';
	$buttons.append(backButton);

	//se guarda el resultado dentro del usuario
	var control=false;
	if(userNow.examsAtarikoa==undefined){
		userNow.examsAtarikoa=new Array();
	}
	var k=0;
	for(con=0;con<userNow.examsAtarikoa.length;con++){
		if(userNow.examsAtarikoa[con].level==level && userNow.examsAtarikoa[con].numExam==i){
			control=true;
			k=con;
			break;
		}
	}
	resultadoExamsAtarikoa=new ResultExamn();
	resultadoExamsAtarikoa.level=level;
	resultadoExamsAtarikoa.numExam=i;
	resultadoExamsAtarikoa.result=correctos;
	if(control){
		userNow.examsAtarikoa[k]=resultadoExamsAtarikoa;
	}else{
		userNow.examsAtarikoa.push(resultadoExamsAtarikoa);
	}
	//Guardamos todas las modificaciones
	saveUsers();

	if(correctos<minimoParaAprobar){
		alert('Ez duzu gainditu!');
		
	}else{
		alert('ZORIONAK!! Gainditu duzu!');
	}
}
//---------------------SINONIMOAK------------------------
function loadDataJSONSinonimoak(level){
	$.getJSON('exams/'+level+'/Sinonimoak.json', function(json) {
	    examsSinonimoak=json;
	});
}
function loadSinonimoakMenu(level){
	loadDataJSONSinonimoak(level);
	setTimeout(function() {
		var $menuSinonimoak = pageSinonimoak.createMenu(examsSinonimoak, level);
		$("body").append($menuSinonimoak);
		$("body").enhanceWithin();
		$(':mobile-pagecontainer').pagecontainer('change', '#page_menu_sinonimoak');
	}, 50);
	
}
function loadExamSinonimoak(i,level){
	var $examenAtarikoa = pageSinonimoak.createExam(i, examsSinonimoak, level);
	$("body").append($examenAtarikoa);
	$("body").enhanceWithin();
	$(':mobile-pagecontainer').pagecontainer('change', '#page-exam-sinonimoak');
}
function checkSinonimoak(i,level){
	var correctos=0;
	for(var con=0;con < examsSinonimoak[i].statements.length;con++){
		var $answer=$("input[name='answer-sinonimoak-"+con+"']");
		if($answer.val() !=examsSinonimoak[i].statements[con].solution) {
			$answer.css("color","red");
		}
		else{
			$answer.css({"color":"white","background-color":"green","font-size":"24px"});
			correctos++;
		}
	}
	$('#correct_answer_sinonimoak').text('Erantzun zuzenak: '+correctos+'/'+examsSinonimoak[i].statements.length);
	var minimoParaAprobar=examsSinonimoak[i].statements.length*(3/5);
	
	$buttons=$('#form-sinonimoak-buttons').empty();
	backButton='<a id="salir-sinonimoak-button" href="#" onClick="loadSinonimoakMenu(&#39;'+level+'&#39;)" class="ui-btn">Irten</a>';
	$buttons.append(backButton);

	//se guarda el resultado dentro del usuario
	var control=false;
	if(userNow.examsSinonimoak==undefined){
		userNow.examsSinonimoak=new Array();
	}
	var k=0;
	for(con=0;con<userNow.examsSinonimoak.length;con++){
		if(userNow.examsSinonimoak[con].level==level && userNow.examsSinonimoak[con].numExam==i){
			control=true;
			k=con;
			break;
		}
	}
	resultadoExamsSinonimoak=new ResultExamn();
	resultadoExamsSinonimoak.level=level;
	resultadoExamsSinonimoak.numExam=i;
	resultadoExamsSinonimoak.result=correctos;
	if(control){
		userNow.examsSinonimoak[k]=resultadoExamsSinonimoak;
	}else{
		userNow.examsSinonimoak.push(resultadoExamsSinonimoak);
	}
	//Guardamos todas las modificaciones
	saveUsers();
	
	if(correctos<minimoParaAprobar){
		alert('Ez duzu gainditu!');
		
	}else{
		alert('ZORIONAK!! Gainditu duzu!');
	}
}
//---------------------ENTZUNEZKOA------------------------
function loadDataJSONEntzunezkoa(level){
//	$.getJSON(fileFolder+level+'/'+fileName, function(json) {
	$.getJSON('exams/'+level+'/Entzunezkoa.json', function(json) {
	    examsEntzunezkoa=json;
	});	
}

function loadEntzunezkoaMenu(level){
	loadDataJSONEntzunezkoa(level);
	setTimeout(function() {
		var $menuEntzunezkoa = pageEntzunezkoa.createMenu(examsEntzunezkoa, level);
		$("body").append($menuEntzunezkoa);
		$("body").enhanceWithin();
		$(':mobile-pagecontainer').pagecontainer('change', '#page_menu_entzunezkoa');
	}, 50);
	
}

function loadExamEntzunezkoa(i,level){
	var $examenEntzunezkoa = pageEntzunezkoa.createExam(i, examsEntzunezkoa, level)
	$("body").append($examenEntzunezkoa);
	$("body").enhanceWithin();
	$(':mobile-pagecontainer').pagecontainer('change', '#page-exam-entzunezkoa');
}

function checkEntzunezkoa(i,level){
	var respondidos=0;
	var correctos=0;
	for(var con=0;con < examsEntzunezkoa[i].statements.length;con++){
		var answer=$("input[name='radio-choice-entzunezkoa-"+con+"']:checked").val();
		if(answer){
			$("label[id|='label-radio-choice-"+con+"']").each(
				function(index) {
					if(index!=examsEntzunezkoa[i].statements[con].solution) {
						$(this).css("color","red");
					}
					else
						$(this).css({"color":"white","background-color":"green","font-size":"24px"});
				}
			);
			respondidos++;
			if(answer == examsEntzunezkoa[i].statements[con].solution){
				correctos++;
			}
		}
	}
	$('#correct_answer_entzunezkoa').text('Erantzun zuzenak: '+correctos);
	if(respondidos < examsEntzunezkoa[i].statements.length){
		alert((examsEntzunezkoa[i].statements.length-respondidos)+' galdera falta zaizkizu erantzuteko');
		return;
	}
	var minimoParaAprobar=examsEntzunezkoa[i].statements.length*(3/5);
	
	$buttons=$('#form-entzunezkoa-buttons').empty();
	backButton='<a id="salir-entzunezkoa-button" href="#" onClick="loadEntzunezkoaMenu(&#39;'+level+'&#39;)" class="ui-btn">Irten</a>';
	$buttons.append(backButton);

	//se guarda el resultado dentro del usuario
	var control=false;
	if(userNow.examsEntzunezkoa==undefined){
		userNow.examsEntzunezkoa=new Array();
	}
	var k=0;
	for(con=0;con<userNow.examsEntzunezkoa.length;con++){
		if(userNow.examsEntzunezkoa[con].level==level && userNow.examsEntzunezkoa[con].numExam==i){
			control=true;
			k=con;
			break;
		}
	}
	var resultadoExamsEntzunezkoa=new ResultExamn();
	resultadoExamsEntzunezkoa.level=level;
	resultadoExamsEntzunezkoa.numExam=i;
	resultadoExamsEntzunezkoa.result=correctos;
	if(control){
		userNow.examsEntzunezkoa[k]=resultadoExamsEntzunezkoa;
	}else{
		userNow.examsEntzunezkoa.push(resultadoExamsEntzunezkoa);
	}
	//Guardamos todas las modificaciones
	saveUsers();
	
	if(correctos<minimoParaAprobar){
		alert('Ez duzu gainditu!');
		
	}else{
		alert('ZORIONAK!! Gainditu duzu!');
	}
}
function salirAplicacion(){
	navigator.app.exitApp();
}