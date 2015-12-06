// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode'; 

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('"vscode-multi-line-tricks" is now active!');
	
	/**
	 * Selects the cursor line and moves the cursor to the next line. If the 
	 * cursor is at the last line of the document, selects the line to its end. 
	 */
	context.subscriptions.push(vscode.commands.registerCommand('bcjti.selectLine', () => {
		let textEditor = vscode.window.activeTextEditor;
		let posCur = textEditor.selection.active;
		let startLinePos = posCur.with(posCur.line, 0);
		let endLinePos = startLinePos.with(startLinePos.line + 1, 0);
		if(textEditor.document.lineCount === startLinePos.line + 1) {
			let line = textEditor.document.lineAt(startLinePos.line);
			console.log(line);
			endLinePos = startLinePos.with(startLinePos.line, line.range.end.character);
		}
		if(textEditor.selection.isEmpty) {
			textEditor.selection = new vscode.Selection(startLinePos, endLinePos);
		} else {
			let r = textEditor.selection.union(new vscode.Range(startLinePos, endLinePos));
			textEditor.selection = new vscode.Selection(r.start, r.end);
		}
	}));
	
	/**
	 * Breaks the selection into one curso per line selected at the end of the line. 
	 */
	context.subscriptions.push(vscode.commands.registerCommand('bcjti.breakSelection', () => {
		let textEditor = vscode.window.activeTextEditor;
		let sel = textEditor.selection;
		if(!sel.isEmpty) {
			let doc = textEditor.document;
			let sels = new Array<vscode.Selection>();
			for (var i = sel.start.line; i <= sel.end.line; i++) {
				if(i !== sel.end.line) {
					let pos = new vscode.Position(i, doc.lineAt(i).range.end.character);
					sels.push(new vscode.Selection(pos, pos));
				} else if( sel.end.character > 0 ) {
					sels.push(new vscode.Selection(sel.end,sel.end));
				}
			}
			textEditor.selections = sels;
		}
	}));
}