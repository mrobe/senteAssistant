<%	prefs := application preferences.
	iconBlock := [:aColor | (prefs noteColors includes: aColor) ifTrue: [(String with: aColor first) , '-O'] ifFalse: [(String with: aColor first) , '-C']].
	modeBlock := [:aColor | (prefs noteColors includes: aColor) ifTrue: ['checked'] ifFalse: ['']].
%>
<form id="colorButtons">
	<table id="colorButtonsTable" <%= prefs filterNotesByColor ifTrue: [''] ifFalse: ['class="hideItem"']. %> >
	<tr>
		<td id="<%= iconBlock value: 'yellow'. %>" onclick="toggleColorFilter(this);" />
		<td id="<%= iconBlock value: 'red'. %>" onclick="toggleColorFilter(this);" />
		<td id="<%= iconBlock value: 'blue'. %>" onclick="toggleColorFilter(this);" />
		<td id="<%= iconBlock value: 'green'. %>" onclick="toggleColorFilter(this);" />
		<td id="<%= iconBlock value: 'purple'. %>" onclick="toggleColorFilter(this);" />
		<td id="<%= iconBlock value: 'orange'. %>" onclick="toggleColorFilter(this);" />
		<td id="<%= iconBlock value: 'clear'. %>" onclick="toggleColorFilter(this);" />
	</tr>
	</table>
	<input id="y-Mode" name="colorButtonMode" hidden type="checkbox" value="yellow" <%= modeBlock value: 'yellow'. %> />
	<input id="r-Mode" name="colorButtonMode" hidden type="checkbox" value="red" <%= modeBlock value: 'red'. %> />
	<input id="b-Mode" name="colorButtonMode" hidden type="checkbox" value="blue" <%= modeBlock value: 'blue'. %> />
	<input id="g-Mode" name="colorButtonMode" hidden type="checkbox" value="green" <%= modeBlock value: 'green'. %> />
	<input id="p-Mode" name="colorButtonMode" hidden type="checkbox" value="purple" <%= modeBlock value: 'purple'. %> />
	<input id="o-Mode" name="colorButtonMode" hidden type="checkbox" value="orange" <%= modeBlock value: 'orange'. %> />
	<input id="c-Mode" name="colorButtonMode" hidden type="checkbox" value="clear" <%= modeBlock value: 'clear'. %> />
</form>