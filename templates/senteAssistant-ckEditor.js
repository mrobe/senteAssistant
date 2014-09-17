// Support code for CKEditor

function postAnnotationEdit(editor) {
	successFlag = false;
	new Ajax.Request ('/servlet/SenteAssistantAnnotationsServlet/modify' , {
		onSuccess : successFunc,
		asynchronous : false,
		method : 'post',
		parameters : { id: editor.name, value: editor.getData() }
		});
	editor.resetDirty();
}

CKEDITOR.on( 'instanceReady', function(event) {
	event.editor.on('blur', function(event) {
	if (event.editor.checkDirty()) { 
		postAnnotationEdit(event.editor);
		}
	} );
} );
