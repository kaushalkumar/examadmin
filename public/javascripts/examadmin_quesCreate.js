window.onload = function() {
	highlightMenu('menu_quesCreate');

	CKEDITOR.disableAutoInline = true;
	CKEDITOR.inline( 'questionId');
	CKEDITOR.inline( 'choiceId1' );
	CKEDITOR.inline( 'choiceId2' );
	CKEDITOR.inline( 'choiceId3' );
	CKEDITOR.inline( 'choiceId4' );
	CKEDITOR.inline( 'descriptiveChoiceId' );

}

function showQuestionSection() {
	
	var questionType = $( 'input[name=questionType]:checked' ).val();
	
	$("#questionGroupDivId").show();
	$("#singleMultiSelectChoicesGroupDivId").hide();
	$("#trueFalseChoicesGroupDivId").hide();
	$("#singleSelectAnswerGroupDivId").hide();
	$("#multiSelectAnswerGroupDivId").hide();
	$("#trueFalseAnswerGroupDivId").hide();
	$("#descriptiveChoicesGroupDivId").hide();
	switch (questionType) { 
		case 'SingleSelect': 
			$("#singleMultiSelectChoicesGroupDivId").show()
			$("#singleSelectAnswerGroupDivId").show()
			break;
		case 'MultiSelect': 
			$("#singleMultiSelectChoicesGroupDivId").show();
			$("#multiSelectAnswerGroupDivId").show();
			$("#multiSelectAnswerId").multiselect({ numberDisplayed: 10});
			break;
		case 'TrueFalse': 
			$("#trueFalseChoicesGroupDivId").show();
			$("#trueFalseAnswerGroupDivId").show();
			break;      
		case 'Descriptive': 
			$("#descriptiveChoicesGroupDivId").show();
			break;
		default:
			alert('Nobody Wins!');
	}
}

function removeChoice(choiceId) {

	/*rearrange the option numbers*/
	var rearrangeIndexFlag = false;
	//get parent
	$("div#"+choiceId).parent().children().each(function () {

		if(this.id == choiceId){
			//choice found, rearrange the index numbers after this
			rearrangeIndexFlag = true;
			
			return true;
		}
		if(rearrangeIndexFlag) {
			var choiceCurrVal = $("div#"+this.id).children().filter(".choiceNum").text();
			if(choiceCurrVal != null) {
				choiceCurrVal = choiceCurrVal.substr(0,choiceCurrVal.length-1);
				
				$("div#"+this.id).children().filter(".choiceNum").text((choiceCurrVal-1)+".");
			}
		}
		
	});

	/*remove the row*/
	$("div").remove("#"+choiceId);

	/*remove option for single or multi select*/
	/*add option for single or multi select*/
	modifyAnswerOptions();

}

function addChoice() {
	
	/*add the row*/
	//get nextId
	var lastChoiceVal = $("div#singleMultiSelectChoicesTableId .choiceRow:last-child").children().filter(".choiceNum").text();
	var nextId = lastChoiceVal.substr(0,lastChoiceVal.length-1)*1+1;//multiplyied by 1 to make it as integer
	
	var newChoiceElm = '<div class="choiceRow" id="singleMultiSelectChoiceRowId' + nextId + '" >' +
		'<div class = "choiceNum">' + nextId + '.' + '</div>' +
		'<div class = "choiceContent">' + 
			'<textarea id="choiceId' + nextId + '" style="display: none;"></textarea>' +
		'</div>' +
		'<div class="choiceOperation">' +
			'<a href="#" onclick="removeChoice(\'singleMultiSelectChoiceRowId' + nextId + '\')">' +
				'<span class="glyphicon glyphicon-trash"></span>' +
			'</a>' +
		'</div>' +
	'</div>';
	
	$(newChoiceElm).appendTo("div#singleMultiSelectChoicesTableId");
	//add CKEditor
	CKEDITOR.inline( 'choiceId'+nextId );


	/*add option for single or multi select*/
	modifyAnswerOptions();
}

function modifyAnswerOptions() {
	$("select#singleSelectAnswerId").empty();
	var count = 1;
	var numOfChoices = $("div#singleMultiSelectChoicesTableId").children().each(function () {
		var option = $('<option></option>').attr("value", count).text(count);
		$("select#singleSelectAnswerId").append(option);
		count = count + 1;
	});
	
	$("select#multiSelectAnswerId").empty();
	var count = 1;
	var numOfChoices = $("div#singleMultiSelectChoicesTableId").children().each(function () {
		var option = $('<option></option>').attr("value", count).text(count);
		$("select#multiSelectAnswerId").append(option);
		count = count + 1;
	});
	$("#multiSelectAnswerId").multiselect('rebuild');
}