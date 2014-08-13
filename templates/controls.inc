<div class="controlHeader" onclick="displayContent();" title="Refresh Notes">Assistant</div>

<div class="control"><p class="heading">View</p>
	<form id="templateControl">
		<select id="templateSelect" name="template">
			<s:templateOptions />
		</select>
	</form>
</div>

<%	prefs := application preferences.
	filterBlock := [:aMode | aMode = prefs filterMode ifTrue: ['selected'] ifFalse: ['']].
%>

<form id="filterModeControl">
<div class="control"><p class="heading">Filter</p>
<select id="filterSelect" name="filterMode">
	<option value="none" <%= filterBlock value: 'none'. %> >None</option>
	<option value="filter" <%= filterBlock value: 'filter'. %> >Notes Contain</option>
</select>
</form>

<%	filterInputsStyle := prefs filterMode = 'none' ifTrue: ['style="display: none;"']. 
	scopeBlock := [:aScope | aScope = prefs displayScope ifTrue: ['selected'] ifFalse: ['']]. %>

<form id="filterFields" method="post">
	<div id="filterInputFields" <%= filterInputsStyle. %> >
		<input type="text" id="filterAny" name="filterAny" title="Query all note fields"
			onkeypress="return noenter(event);" value="" placeholder="Any" />
		<input type="text" id="filterTitle" name="filterTitle" title="Query note titles"
			onkeypress="return noenter(event);" value="" placeholder="Title" />
		<input type="text" id="filterQuotation" name="filterQuotation" title="Query note quotations"
			onkeypress="return noenter(event);" value="" placeholder="Quotation" />
		<input type="text" id="filterComment" name="filterComment" title="Query note comments"
			onkeypress="return noenter(event);" value="" placeholder="Comment" />
	</div>
</form>

<form id="referenceDisplayScope" method="post">
	<select id="refDisplaySelect" name="displayScope">
		<option value="selected" <%= scopeBlock value: 'selected'. %> >Selected References</option>
		<option value="all" <%= scopeBlock value: 'all'. %> >All References</option>
	</select>
</form>
	
<form id="colorButtons" method="post">
	<!-- #include file="colorButtons.inc" -->
</form>
</div>

<script>
	Event.observe('templateControl', 'change', setTemplate);
	Event.observe('filterModeControl', 'change', setFilter);
	Event.observe('filterFields', 'change', setFilterFields);
	Event.observe('referenceDisplayScope', 'change', setDisplayScope);
</script>

<div class="control"><p class="heading"><a href="about.ssp" target="contentFrame" >About</a></p></div>

<div class="control"><p class="heading"><a href="saveFile.ssp" target="contentFrame" >Save As...</a></p></div>

<div class="control"><p class="heading"><a href="preferences.ssp" target="contentFrame" >Preferences...</a></p></div>

<div class="control"><p class="heading"><a href="quit.ssp" target="contentFrame" >Quit</a></p></div>
