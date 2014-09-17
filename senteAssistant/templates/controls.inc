<div class="controlHeader" onclick="displayContent();" title="Refresh">Assistant</div>

<div class="control"><p class="heading">View</p>
	<form id="templateControl">
		<select id="templateSelect" name="template">
			<s:templateOptions />
		</select>
	</form>
</div>

<%
	prefs := application preferences.
	filterBlock := [:aMode | aMode = prefs filterMode ifTrue: ['selected'] ifFalse: ['']].
	filterInputsStyle := prefs filterMode = 'none' ifTrue: ['style="display: none;"']. 
	scopeBlock := [:aScope | aScope = prefs displayScope ifTrue: ['selected'] ifFalse: ['']]. 
	filterReferenceInputsStyle := (prefs displayScope first ~= $f) ifTrue: ['style="display: none;"']. 
%>

<form id="referenceDisplayScope" method="post">
<div class="control"><p class="heading">References</p>
	<select id="referenceSelect" name="displayScope">
		<option value="selected" <%= scopeBlock value: 'selected'. %> >Selected References</option>
		<option value="all" <%= scopeBlock value: 'all'. %> >All References</option>
		<option value="filterSelected" <%= scopeBlock value: 'filterSelected'. %> >Filter Selected</option>
		<option value="filterAll" <%= scopeBlock value: 'filterAll'. %> >Filter All</option>
	</select>
</form>
<form id="referenceFields" method="post">
	<div id="referenceInputFields" <%= filterReferenceInputsStyle. %> >
		<input type="text" id="filterReferenceTitle" name="filterReferenceTitle"
			onkeypress="return noenter(event);" value="" placeholder="Title" />
		<input type="text" id="filterReferenceAuthor" name="filterReferenceAuthor"
			onkeypress="return noenter(event);" value="" placeholder="Author" />
		<input type="text" id="filterReferenceAnnotation" name="filterReferenceAnnotation"
			onkeypress="return noenter(event);" value="" placeholder="Annotation" />
	</div>
</form>
</div>

<form id="filterModeControl">
<div class="control"><p class="heading">Notes</p>
<select id="filterSelect" name="filterMode">
	<option value="none" <%= filterBlock value: 'none'. %> >All</option>
	<option value="filter" <%= filterBlock value: 'filter'. %> >Filter</option>
</select>
</form>

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

<form id="colorButtons" method="post">
	<!-- #include file="colorButtons.inc" -->
</form>
</div>

<script>
	Event.observe('templateControl', 'change', setTemplate);
	Event.observe('referenceDisplayScope', 'change', setDisplayScope);
	Event.observe('referenceFields', 'change', setFields);
	Event.observe('filterModeControl', 'change', setFilter);
	Event.observe('filterFields', 'change', setFields);
</script>

<div class="control"><p class="heading"><a href="about.ssp" target="contentFrame" >About</a></p></div>

<div class="control"><p class="heading"><a href="saveFile.ssp" target="contentFrame" >Save As...</a></p></div>

<div class="control"><p class="heading"><a href="preferences.ssp" target="contentFrame" >Preferences...</a></p></div>

<div class="control"><p class="heading"><a href="quit.ssp" target="contentFrame" >Quit</a></p></div>
