import fs from 'fs';

import { v4 } from 'uuid';

import { IScheduleComment, mapNotes, INoteUpdateInformation, INoteCreationInformation } from './interfaces';

const DB_FILE = './data.json';

const currentUser = 'test_user123';

export class Database {
	notes: IScheduleComment[] = [];

	constructor() {
		this.load();
	}

	load() {
		if (fs.existsSync(DB_FILE)) {
			const data = fs.readFileSync(DB_FILE, 'utf-8');
			this.notes = mapNotes(JSON.parse(data));
		}
	}

	save() {
		fs.writeFileSync(DB_FILE, JSON.stringify(this.notes, null, 2));
	}

	add(projectId: string, creationInfo: INoteCreationInformation): IScheduleComment | null {

		const noteForTask = this.notes.find(n => n.projectId === projectId && n.taskId === creationInfo.taskId);
		if (noteForTask) {
			return null;
		}

		const note: IScheduleComment = {
			id: v4(),
			projectId,
			taskId: creationInfo.taskId,
			comment: creationInfo.comment,
			created: new Date(),
			modified: new Date(),
			createdBy: currentUser,
			modifiedBy: currentUser
		}

		this.notes.push(note);
		this.save();

		return note;
	}

	getAll(projectId: string): IScheduleComment[] {
		return this.notes.filter(note => note.projectId === projectId);
	}

	get(projectId: string, noteId: string): IScheduleComment | null {
		const note = this.notes.find(note => note.projectId === projectId && note.id === noteId);
		if (!note) {
			return null
		}

		return note;
	}

	// JohannesF - added
	getForTask(projectId: string, taskId: string): IScheduleComment[] {
		const notes = this.notes.filter(note => note.projectId === projectId && note.taskId === taskId);
		return notes;
	}

	update(noteId: string, updateInfo: INoteUpdateInformation) {
		const index = this.notes.findIndex(note => note.id === noteId);
		if (index !== -1) {
			this.notes[index] = {
				...this.notes[index],
				...updateInfo,
				modified: new Date(),
				modifiedBy: currentUser
			};
			this.save();
			return this.notes[index];
		}
		return null;
	}

	delete(noteId: string): IScheduleComment | null {
		const index = this.notes.findIndex(note => note.id === noteId);
		const note = this.notes[index];
		if (index !== -1) {
			this.notes.splice(index, 1);
			this.save();
			return note;
		}

		return null;
	}
}
