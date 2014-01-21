window.onload = function() {
	highlightMenu('menu_quesCreate');

	CKEDITOR.disableAutoInline = true;
	CKEDITOR.inline( 'questionId');
	CKEDITOR.inline( 'choiceAId' );
	CKEDITOR.inline( 'choiceBId' );
	CKEDITOR.inline( 'choiceCId' );
	CKEDITOR.inline( 'choiceDId' );
	CKEDITOR.inline( 'descriptiveChoiceId' );

}

function showQuestionSection() {
	console.log('showQuestionSection');
	var questionType = $( 'input[name=questionType]:checked' ).val();
	console.log(questionType);
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
			$("#singleMultiSelectChoicesGroupDivId").show()
			$("#multiSelectAnswerGroupDivId").show()
			break;
		case 'TrueFalse': 
			$("#trueFalseChoicesGroupDivId").show()
			$("#trueFalseAnswerGroupDivId").show()
			break;      
		case 'Descriptive': 
			$("#descriptiveChoicesGroupDivId").show()
			break;
		default:
			alert('Nobody Wins!');
	}
}

function removeOption() {
	
}