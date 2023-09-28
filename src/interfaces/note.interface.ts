export interface INote {
	noteId: string;
	projectId: string;
	taskId: string;
	note: string;
	created: Date;
	createdBy: string;
	modified: Date;
	modifiedBy: string;
}

export function mapNotes(notes: INote[]): INote[] {
	return notes.map(n => ({
		...n,
		created: new Date(n.created),
		modified: new Date(n.modified),
	}))
}
