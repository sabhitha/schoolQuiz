<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<script src="script.js" type="text/javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<head>
<link href="style.css" type="text/css" type="text/css" rel="stylesheet" />
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
<script>
$(document).ready(function(){
	var cat = getCategories();
	var obj = JSON.parse(cat);
	var list = obj.trivia_categories;
	for (var i = 0; i < list.length; i++) {
		var a = list[i];
		var x = document.getElementById("dropdownbox");
		var option = document.createElement("option");
		if (i == 0) {
			option.text = 'categories';
		}
		option.text = a.name;
		x.add(option);
	}
	var overlay = $('<div id="overlay"></div>');
	overlay.show();
	overlay.appendTo(document.body);
	$('.popup').show();
	$('#cancelbut').click(function() {
		$('.popup').hide();
		overlay.appendTo(document.body).remove();
		return false;
	});
});
</script>
<div class='popup'>
<div class='content'>
<h3>Enter the UserName <h3>
<div style="padding-top:20px">
<label for="uname">User name:</label>
  <input type="text" id="uname" name="uname"><br><br>
</div>
<button id="cancelbut" type="button">Cancel</button>
<button style="margin-left:20px;" onclick="loginviausername()" type="button">Login</button>

</div>
</div>
<div class="heading" style="display:flex;flex-direction:row;padding-top:20px;padding-bottom:10px"><div style="width:50%;display:flex;color:white"> 
<select name="dropdown" id="dropdownbox" onchange="loadQuestions()"></select>
<div id="loginname" style="margin-left:600px;width: 50%;justify-content: flex-end;display: flex;">username</div></div>
</div>
<div id='questions' class="wrapper clearfix">

</div>
</body>
</html>