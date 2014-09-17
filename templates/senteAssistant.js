var successFlag = false;
var response = false;
var responseID = '';
var errorID = '';
var messageID = '';
var referenceID = '';

function postSilently(url, formObject) {
	successFlag = false;
	new Ajax.Request (url, {
		onSuccess : successFunc,
		asynchronous : false,
		parameters : Form.serialize(formObject)
		});
}

function successFunc(resp) {
	successFlag = true;
	response = resp;
}

function showSuccessFunc(resp) {
	$(responseID).innerHTML = resp.responseText;
	$(errorID).innerHTML = '';
	successFlag = true;
}

function showErrorFunc(resp) {
	$(responseID).innerHTML = '';
	$(errorID).innerHTML = resp.responseText;
}

function noenter(e) {
	if (e && e.keyCode == 13) { 
		postSilently('/servlet/SenteAssistantPreferencesServlet/filterOptions', document.getElementById('filterOptions'));
		var iframe = document.getElementById('contentFrame');
		iframe.src = iframe.src;
	}
}

function displayContent() {
	var iframe = document.getElementById('contentFrame');
	iframe.src = iframe.src;
}

function setTemplate(event) {
	postSilently('/servlet/SenteAssistantPreferencesServlet/' + this.id, this);
	var templateSelect = document.getElementById('templateSelect');
	var selectedTemplate = templateSelect.options[templateSelect.selectedIndex].value;
	iFrame = document.getElementById('contentFrame');
	iFrame.src = selectedTemplate;
}

function setFilter(event) {
	postSilently('/servlet/SenteAssistantPreferencesServlet/' + this.id, this);
	var filterSelect = document.getElementById('filterSelect');
	var selectedFilter = filterSelect.options[filterSelect.selectedIndex].value;
	var target = document.getElementById('filterInputFields');
	if (selectedFilter == 'none') {
		target.style.display = 'none';
		} else {
		target.style.display = 'block';
	}
	displayContent();
}

function setFields(event) {
	postSilently('/servlet/SenteAssistantPreferencesServlet/' + this.id, this);
	displayContent();
}

function setDisplayScope(event) {
	postSilently('/servlet/SenteAssistantPreferencesServlet/' + this.id, this);
	var referenceSelect = document.getElementById('referenceSelect');
	var selectedFilter = referenceSelect.options[referenceSelect.selectedIndex].value;
	var target = document.getElementById('referenceInputFields');
	if (selectedFilter[0] != 'f') {
		target.style.display = 'none';
		} else {
		target.style.display = 'block';
	}
	displayContent();
}

function showSuccess(resp) {
	var rID = 'an-' + referenceID;
	$(rID).innerHTML = resp.responseText;
	successFlag = true;
}

function showError(resp) {
	var rID = 'an-' + referenceID;
	$(rID).innerHTML = '<span style="color: red;">' + resp.responseText + '</span>';
	successFlag = true;
}

function showCheckAndUpdateSuccess(resp) {
	if (resp.responseText.charAt(0) == '<') {
		var rID = 'an-' + referenceID;
		$(rID).innerHTML = resp.responseText;
		$(messageID).innerHTML = 'Updated';
	} else {
		$(messageID).innerHTML = resp.responseText + ' <a class="noteSource" href="#" onClick="updateAnnotations(referenceID);">Update</a> or <a class="noteSource" href="#" onClick="$(messageID).innerHTML = null;">Cancel</a>?';
	}
	successFlag = true;
}

function showUpdateSuccess(resp) {
	var rID = 'an-' + referenceID;
	$(rID).innerHTML = resp.responseText;
	$(messageID).innerHTML = '';
	successFlag = true;
}

function showUpdateError(resp) {
	$(messageID).innerHTML = '<span style="color: red;">' + resp.responseText + '</span>';
}

function updateAnnotations(refID) {
	referenceID = refID;
	messageID = 'ms-' + refID;
	successFlag = false;
	$(messageID).innerHTML = '<img src="progress.gif" />';
	var result = new Ajax.Request ('/servlet/SenteAssistantAnnotationsServlet/update/' + refID , {
			onSuccess : showUpdateSuccess,
			onFailure : showUpdateError,
			asynchronous : true,
			method : 'get'
			});
}

function checkAndUpdateAnnotations(refID) {
	referenceID = refID;
	messageID = 'ms-' + refID;
	successFlag = false;
	$(messageID).innerHTML = '<img src="progress.gif" />';
	var result = new Ajax.Request ('/servlet/SenteAssistantAnnotationsServlet/checkAndUpdate/' + refID , {
			onSuccess : showCheckAndUpdateSuccess,
			onFailure : showUpdateError,
			asynchronous : true,
			method : 'get'
			});
}

function showUpdateAllSuccess(resp) {
	successFlag = true;
}

function showUpdateAllError(resp) {
	$('updateAllError').innerHTML = resp.responseText;
}

function updateAllAnnotations() {
	successFlag = false;
	var result = new Ajax.Request ('/servlet/SenteAssistantAnnotationsServlet/updateAll' , {
			onSuccess : showUpdateAllSuccess,
			onFailure : showUpdateAllError,
			asynchronous : true,
			method : 'get'
			});
	new Ajax.PeriodicalUpdater('dialog-content', '/servlet/SenteAssistantAnnotationsServlet/updateStatus', { method: 'get', frequency: 0.5 });
}

function cancelUpdateAnnotations() {
	successFlag = false;
	var result = new Ajax.Request ('/servlet/SenteAssistantAnnotationsServlet/cancelUpdate' , {
			onSuccess : showUpdateAllSuccess,
			onFailure : showUpdateAllError,
			asynchronous : true,
			method : 'get'
			});
}

function editAnnotations(refID, enable) {
	var targetElem, anEditor;
	messageID = 'ms-' + refID;
	$(messageID).innerHTML = '';
	var annotationID = 'an-' + refID;
	var annotationElements = $(annotationID).getElementsByClassName('annotationContent');
	for (var i = 0; i < annotationElements.length; i++) { 
		targetElem = annotationElements[i];
		targetElem.setAttribute('contenteditable', enable);
		if (enable) {
			CKEDITOR.inline(targetElem.id);
		} else {
			anEditor = editorForID(targetElem.id);
			if (anEditor != false) {
				if (anEditor.checkDirty()) { 
					postAnnotationEdit(anEditor);
				}
				anEditor.destroy(); 
			}
		}
	}
	annotationElements = $(annotationID).getElementsByClassName('annotationDelete');
	for (var i = 0; i < annotationElements.length; i++) { 
		annotationElements[i].style.visibility = (enable) ? 'visible' : 'hidden';
	}
	document.getElementById('cn-' + refID).style.display = (enable) ? 'inline' : 'none';
	document.getElementById('en-' + refID).style.display = (enable) ? 'none' : 'inline';
}

function addAnnotation(refID) {
	referenceID = refID;
	messageID = 'ms-' + refID;
	editAnnotations(refID, false);
	successFlag = false;
	$(messageID).innerHTML = '<img src="progress.gif" />';
	var result = new Ajax.Request ('/servlet/SenteAssistantAnnotationsServlet/add/' + refID , {
			onSuccess : showSuccess,
			onFailure : showError,
			asynchronous : false,
			method : 'get'
			});
	editAnnotations(refID, true);
	$(messageID).innerHTML = 'Added';
}

function deleteAnnotations(refID) {
	var formValues = document.getElementById('fm-' + refID).serialize();
	referenceID = refID;
	messageID = 'ms-' + refID;
	editAnnotations(refID, false);
	successFlag = false;
	$(messageID).innerHTML = '<img src="progress.gif" />';
	var result = new Ajax.Request ('/servlet/SenteAssistantAnnotationsServlet/delete/' + refID , {
			onSuccess : showSuccess,
			onFailure : showError,
			asynchronous : false,
			method : 'post',
			parameters : formValues
			});
	editAnnotations(refID, true);
	$(messageID).innerHTML = 'Deleted';
}

function editorForID(targetID) {
	var anEditor;
	for(var i in CKEDITOR.instances) {
		anEditor = CKEDITOR.instances[i];
		if (anEditor.name == targetID) return anEditor;
	}
	return false;
}

function saveFile(rID, eID) {
	responseID = rID;
	errorID = eID;
	successFlag = false;
	var result = new Ajax.Request ('/servlet/SenteAssistantSaveFileServlet/', {
				onSuccess : showSuccessFunc,
				onFailure : showErrorFunc,
				asynchronous : false,
				method : 'get'
				});
}

function setPrefs(event) {
	postSilently('/servlet/SenteAssistantPreferencesServlet/' + this.id, this);
}

function setPrefsAndReload(event) {
	postSilently('/servlet/SenteAssistantPreferencesServlet/' + this.id, this);
	parent.document.location.reload(true);
}

function setSaveFilename(inputForm) {
	postSilently('/servlet/SenteAssistantPreferencesServlet/' + inputForm.id, inputForm);
}

function setSaveFileType() {
	var textInputField = document.getElementById('saveFilename');
	textInputField.value = getPreference('saveFullFilename');
}

function getPreference(prefName) {
	successFlag = false;
	var result = new Ajax.Request ('/servlet/SenteAssistantPreferencesServlet/' + prefName, {
				onSuccess : successFunc,
				asynchronous : false,
				method : 'get'
				});
	return (response.responseText);
}

function updateSaveFilename() {
	var textInputField = document.getElementById('saveFilename');
	textInputField.value = getPreference('saveFullFilename');
}

function toggleColorFilter(selectItem) {
	var itemID = selectItem.id;
	var colorPrefix = itemID.substring(0,2);
	var enabledIcon = colorPrefix + 'O';
	var disabledIcon = colorPrefix + 'C';
	var checkboxItem = document.getElementById(colorPrefix + 'Mode');
	if (selectItem.id == enabledIcon) {
		selectItem.id = disabledIcon;
		checkboxItem.checked = false;
	} else {
		selectItem.id = enabledIcon;
		checkboxItem.checked = true;
	}
	postSilently('/servlet/SenteAssistantPreferencesServlet/colorButtons', document.getElementById('colorButtons'));
	displayContent();
}

function toggleColorButtons(checkbox) {
      target = parent.document.getElementById('colorButtonsTable');
      if (checkbox.checked) {
		target.style.display = "block";
      } else {
		target.style.display = "none";
      }
}