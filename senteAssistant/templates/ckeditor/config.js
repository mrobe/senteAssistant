/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	config.extraPlugins = 'find,sourcedialog';

	config.toolbar = [
		['Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo'],
		['Bold', 'Italic', 'Underline', '-', 'Blockquote', '-', 'TextColor'],
		['NumberedList', 'BulletedList', 'Outdent', 'Indent', 'HorizontalRule'],
		['Link', 'Table'],
		['Replace', 'Sourcedialog'],
		['Format']
            ];

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';

	// Remove the annoying title tooltips
	config.title = false;
};
