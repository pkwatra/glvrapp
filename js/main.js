/* ------------------------------------ Login --------------------------------------*/
function loginFunc(){
	$(".login-btn").click(function(e) {
		e.preventDefault();
		loginOpen();
	});
	
	$(".close-icon").click(function(e) {
		e.preventDefault();
		loginClose();
	});
}


function loginOpen(){
	$('.login-panel').animate({"right": '0'});
}

function loginClose(){
	$('.login-panel').animate({"right": '-400px'});
}	




/* --------------------------------- Main nav ---------------------------------------*/
function mainNav(){
	$(".main-menu-link").click(function(e) {
		e.preventDefault();
		navOpen();
	});
	
	$(".close-icon-mainnav").click(function(e) {
		e.preventDefault();
		navClose();
	});
}


function navOpen(){
	$(".main-menu-link").hide();
	$('.main-nav').animate({"right": '0'});
}

function navClose(){
	$('.main-nav').animate({"right": '-400px'}, function() {
		$(".main-menu-link").show();
	});
}

/*--------------------------------- Init -------------------------------------------*/
function init(){
	loginFunc();
	mainNav();
}


$(document).ready(function(){
	init()
});