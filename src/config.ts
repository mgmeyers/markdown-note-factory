import * as vscode from 'vscode'

export enum FileNameFormat {
    slugged = 'slugged',
    lowercaseSlugged = 'lowercase-slugged',
    asIs = 'as-is',
}

export enum NoteDirectory {
    sameAsActiveNote = 'SAME_AS_ACTIVE_NOTE',
    workspaceRoot = 'WORKSPACE_ROOT',
}

export enum NoteDestination {
    foreground = 'foreground',
    background = 'background',
    none = 'none',
}

export interface Config {
    dateFormat: string
    defaultFileExtension: string
    fileNameFormat: FileNameFormat
    newNoteDirectory: NoteDirectory | string
    noteTemplate: string
    noteTemplateFile: string
    newNoteFromSelectionTab: NoteDestination
    newNoteTab: NoteDestination
    selectionReplacementTemplate: string
}

export function getConfig(): Config {
    const config = vscode.workspace.getConfiguration('markdown-note-factory')

    return {
        dateFormat: config.get('dateFormat') || 'yyyy-MM-dd',
        defaultFileExtension: config.get('defaultFileExtension') || 'md',
        fileNameFormat:
            config.get('fileNameFormat') || FileNameFormat.lowercaseSlugged,
        newNoteDirectory:
            config.get('newNoteDirectory') || NoteDirectory.sameAsActiveNote,
        noteTemplate:
            config.get('noteTemplate') || '# ${noteTitle}\n\n${noteContent}',
        noteTemplateFile: config.get('noteTemplateFile') || '',
        newNoteFromSelectionTab:
            config.get('newNoteFromSelectionTab') ||
            NoteDestination.foreground,
        newNoteTab:
            config.get('newNoteTab') || NoteDestination.foreground,
        selectionReplacementTemplate:
            config.get('selectionReplacementTemplate') || '[[${fileName}]]',
    }
}
