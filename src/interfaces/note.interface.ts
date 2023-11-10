export interface IScheduleComment {
	id: string;
	projectId: string;
	taskId: string;
	comment: string;
	created: Date;
	createdBy: string;
	modified: Date;
	modifiedBy: string;
}

export function mapNotes(notes: IScheduleComment[]): IScheduleComment[] {
	return notes.map(n => ({
		...n,
		created: new Date(n.created),
		modified: new Date(n.modified),
	}))
}
