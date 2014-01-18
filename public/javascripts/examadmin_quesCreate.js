window.onload = function() {
	highlightMenu('menu_quesCreate');

	CKEDITOR.disableAutoInline = true;
	CKEDITOR.inline( 'questionId');
	CKEDITOR.inline( 'choiceAId' );
	CKEDITOR.inline( 'choiceBId' );
	CKEDITOR.inline( 'choiceCId' );
	CKEDITOR.inline( 'choiceDId' );

}
