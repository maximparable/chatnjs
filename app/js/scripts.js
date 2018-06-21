$(document).ready(function(){
//	"use strict";
//io('http://dominio.com');
//io();
const socket = io();

let mychat = document.getElementById('mychat');
let message = document.getElementById('message');
let ejecuta = document.getElementById('actions');
let estade = document.getElementById('estado');
var username = document.getElementById('username');
let enviar = document.getElementById('send');

var audio_mensaje = new Audio();
	audio_mensaje.src="audio/sms.mp3";

$("#send").click(function(){
	enviar_mensaje();
});
	
$("#message").focusin(function(){
	$("#message").keyup(function(e){
        if (e.keyCode === 13) {
			enviar_mensaje();
        }
		
	});
});

$("#message").keyup(function(){
	socket.emit('chat:writing', {
		username: username.value
	});
});

socket.on('chatget:message', function (data) {
	if(username.value === data.username){
		$(".panel-body form").append(
			'<div class="form-group">'+data.username+
				'<br><span class="fa fa-lg fa-user pb-chat-fa-user"></span>'+
				'<span class="label label-default pb-chat-labels pb-chat-labels-left">'+data.message+'</span>'+		
			'</div>'+
			'<hr>'
		);
	}else{
		audio_mensaje.play();
		$(".panel-body form").append(
			'<div class="form-group pull-right pb-chat-labels-right">'+data.username+
				'<br><span class="label label-primary pb-chat-labels pb-chat-labels-primary">'+data.message+'</span><span class="fa fa-lg fa-user pb-chat-fa-user"></span>'+		
			'</div><div class="clearfix"></div>'+
			'<hr>'
		);
	}
});
	
socket.on('chat:writing', function(dato) {
	$("#estado").text(' '+dato.username+' esta escribiendo...');
	setTimeout(function(){
		$("#estado").text('');
	},2000);
});
	//$("#send").click(function(){	});
	//$("#send").click(function(){	});
	/**/
function enviar_mensaje(){
	socket.emit('chatsend:message', {
		username: username.value,
		message: message.value
	});
	$("#message").val("");
}
});