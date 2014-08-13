var successFlag = false;
var response = false;
var responseID = '';
var errorID = '';

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

function setFilterFields(event) {
	postSilently('/servlet/SenteAssistantPreferencesServlet/' + this.id, this);
	displayContent();
}

function setDisplayScope(event) {
	postSilently('/servlet/SenteAssistantPreferencesServlet/' + this.id, this);
	displayContent();
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