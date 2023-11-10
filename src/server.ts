// server.ts
import express from 'express';
import Joi from 'joi';

import { Database } from './db';
import { INoteCreationInformation, INoteUpdateInformation } from './interfaces';

const app = express();
const PORT = 3000;
const db = new Database();

const noteCreationSchema = Joi.object({
	taskId: Joi.string().required(),
	comment: Joi.string().required(),
});

const noteUpdateSchema = Joi.object({
	comment: Joi.string().required(),
});

const validateRequestBody = (schema: Joi.ObjectSchema) => {
	return (req: express.Request, res: express.Response, next: express.NextFunction) => {
		const { error } = schema.validate(req.body);
		if (error) {
			res.status(400).json({
				error: error.details[0].message
			});
		} else {
			next();
		}
	};
};

app.use(express.json());

// Get notes for a project
app.get('/project/:projectId/comments', (req, res) => {
	const notes = db.getAll(req.params.projectId);
	res.json(notes);
});

app.get('/project/:projectId/comments/:noteId', (req, res) => {
	const note = db.get(req.params.projectId, req.params.noteId);
	if (note === null) {
		return res.status(404);
	}
	res.json(note);
});

// JohannesF - added
// get notes for a single task
app.get('/project/:projectId/tasks/:taskId/comments', (req, res) => {
	const notes = db.getForTask(req.params.projectId, req.params.taskId);
	res.json(notes);
});

// Create a note
app.post('/project/:projectId/comments', validateRequestBody(noteCreationSchema), (req, res) => {
	const creationInfo: INoteCreationInformation = req.body;
	const note = db.add(req.params.projectId, creationInfo);

	if (note === null) {
		return res.status(400).send();
	}

	res.status(201).json(note);
});

// Update a note
app.put('/project/:projectId/notes/:noteId', validateRequestBody(noteUpdateSchema), (req, res) => {
	const updateInfo: INoteUpdateInformation = req.body;
	const updated = db.update(req.params.noteId, updateInfo);
	if (updated === null) {
		return res.status(404);
	}
	res.json(updated);
});

// Delete a note
app.delete('/project/:projectId/notes/:noteId', (req, res) => {
	const deletedNote = db.delete(req.params.noteId);
	if (deletedNote === null) {
		return res.status(404).send();
	}

	return res.json(deletedNote);
});

app.listen(PORT, () => {
	console.log(`Server started on http://localhost:${PORT}`);
});
