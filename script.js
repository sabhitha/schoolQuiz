var categories;
function getCategories(){
     categories = HTTPGet('https://opentdb.com/api_category.php');
     return categories;
}
function HTTPGet(uri){
	var objHTTP = new XMLHttpRequest();
	objHTTP.open("GET", uri,false);
	objHTTP.send();
	var resp = objHTTP.responseText;
	return resp;
}
var quetns;
function loadQuestions(){
	var cat = JSON.parse(categories);
	var list = cat.trivia_categories;
	var id = list.findIndex(function(item, i){
		  return item.name === $('#dropdownbox').val()
	});
	$('#questions').html('');
	var url = 'https://opentdb.com/api.php?amount=10&category=' + id;
	var questions = JSON.parse(HTTPGet(url));
	quetns = questions.results;
	record = new Array(10);
	scores = new Array(10);
	getQuestions(0,false);
}
var record = new Array(10);
var scores = new Array(10);

function getQuestions(indexval,isRecorded){
	$('#questions').html('');
	var nextindexval=indexval+1;
	var preindexval;
	if(indexval==0){
		preindexval=0;
	}else if(nextindexval == 10){
		var score = calculateScore();
		$('#questions').append('<div id="score"><h3>Your Score is '+score+'</div></h3></h3>');
		if(score<=5){
			$('#questions').css('color','red');
		}else{
			$('#questions').css('color','green');
		}
		return;
	}else{
		preindexval=indexval-1;
	}
	$('#questions').append('<div id="ques">'+quetns[indexval].question+'</div><div style="padding-top:20px;"id="options_radio"></div><button type="button" id="submitbutton" onclick="checkAnswer('+indexval+')">Record</button><button style="margin-left:10px" type="button" id="nextbutton" onclick="getQuestions('+nextindexval+',true)">Next</button><button style="margin-left:10px" type="button" id="previousbutton" onclick="getQuestions('+preindexval+',true)">Previous</button>');
	if(indexval==0){
		$('#previousbutton').hide();
	}
	var options = [];
	options.push.apply(options, quetns[indexval].incorrect_answers);
	options.push(quetns[indexval].correct_answer);
	if(!isRecorded){
		shuffle(options);
	}
	for(var j=0;j<4;j++){
		var labelid="label"+options[j].replace(/ /g,'');
		$('#options_radio').append('<div><input type="radio" id="'+options[j]+'" name="radiobuttongroup" value="'+options[j]+'"><label id="'+labelid+'" for="'+options[j]+'">'+options[j]+'</label></div>');
	}
	if(isRecorded && record[indexval] !=''){
		var radioid=record[indexval].replace('label','');
		$('#'+radioid).prop("checked", true);
		if(scores[indexval]){
			$('#'+record[indexval]).css('background-color','green');
		}else{
			$('#'+record[indexval]).css('background-color','red');
		}
	}
 }
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
function loginviausername(){
	if(document.getElementById('uname').value != ''){
		$('#loginname').html(document.getElementById('uname').value);
	}
	$('#cancelbut').click();
}
function calculateScore(){
	var score = 0;
	for(var i = 0;i<10;i++){
		if(scores[i]){
			score++;
		}
	}
	return score;
}
function checkAnswer(index){
	var svalue=$('input[name="radiobuttongroup"]:checked').val();
	var labelid="label"+svalue.replace(/ /g,'');
	record[index] = labelid;
	if(quetns[index].correct_answer==svalue){
		$('#'+labelid).css('background-color','green');
		scores[index] = true;
	}else{
		$('#'+labelid).css('background-color','red');
		scores[index]=false;
	}
	var radio=document.getElementsByName("radiobuttongroup");
	var len=radio.length;
	for(var i=0;i<len;i++)
	{
		radio[i].disabled=true;
	}

}