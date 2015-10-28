






function login() {
	/*
	var loginVal=$("#authentication_login_input").val();
	var newUser=new User();
	newUser.name=loginVal.toString().trim();
	if(loginVal!=null && loginVal.toString().trim().length != 0){
		if(checkUser(newUser)){
			saveNewUser(newUser)
			refreshNewUsersList();
			user.name=loginVal;
			$("#authentication_page").hide();
		}else{
			alert("A user already exists with this name");
		}
	}else{
		alert("Empty string");
	}
	*/
	alert("HOLA1");
	
	/*$("#request").hide();
	$("#form-0").show();*/
	
	alert("HOLA2");
	var a=$("#example_page_berridazketa-exam-0");
	if(a!=null){
		a.show();
	}else{
		alert("ḦOLA4");
	}
	$("#authentication_page").hide();
	
	//$.mobile.changePage("#example_page_berridazketa-exam-0");
	alert("HOLA3");
}

function start(){
	loadBerridazketak("B1");
	/*
	//Sacamos los valores gusrdados de los diferentes usuarios guardados
	var permanentStorage = window.localStorage;
	var tempStorage = window.sessionStorage;
	var usersJSON=window.localStorage.getItem(keyUsers);
	if(usersJSON!=null){
	//Existen usuario con lo que hay que cargarlos
		users=JSON.parse(usersJSON);
		refreshUsersList();			
	}
	*/
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
function refreshUsersList(){
	if(users!=null){
		var $authentication_users_ul=$('#authentication_users_ul');
		for(con=0;con<users.length;con++){
			
			$authentication_users_ul.append(
					'<li><a href="item1.html" name="authentication_users_ul_li_'+users[con].name+'">'+users[con].name+'</a></li>'
					);
			
		}
		
    	$('#authentication_users_ul').listview('refresh');
	}
}

function refreshNewUsersList(){
	if(users!=null){
		var $authentication_users_ul=$('#authentication_users_ul');	
		$authentication_users_ul.append('<li><a href="item1.html" name="authentication_users_ul_li_'+users[con].name+'>'+users[users.length-1].name+'</a></li>');
		$authentication_users_ul.listview('refresh');
	}
}

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
}


/**
 * Esta funcion nos indica
 * @param name
 * @returns se devuelve la posición del usuario en el array.
 */
function findUser(name){
	if(name==null || users==null)return -1;
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
	alert("s2")
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
				alert("ADVICE: "+adv);
			}
		}
	}
		
}
