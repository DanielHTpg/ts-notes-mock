# Notes API

A simple Express REST API to manage notes for projects.

## Endpoints

### 1. Get all notes for a project

- **Method:** `GET`
- **Route:** `/project/:projectId/notes`
- **Response:** 
  - `200 OK`: Returns an array of notes.

### 2. Get a specific note from a project

- **Method:** `GET`
- **Route:** `/project/:projectId/notes/:noteId`
- **Response:** 
  - `200 OK`: Returns the note object.
  - `404 Not Found`: If the note does not exist.

### 3. Create a note for a project

- **Method:** `POST`
- **Route:** `/project/:projectId/notes`
- **Payload:** 
```json
{
	"taskId": "string",
	"note": "string"
}
```

- **Response:** 
  - `201 Created`: Returns the created note object.
  - `400 Bad Request`: For validation errors.

### 4. Update a note from a project

- **Method:** `PUT`
- **Route:** `/project/:projectId/notes/:noteId`
- **Payload:** 
```json
{
	"note": "string"
}
```

- **Response:** 
  - `200 OK`: Returns the updated note object.
  - `404 Not Found`: If the note does not exist.
  - `400 Bad Request`: For validation errors.

### 5. Delete a note from a project

- **Method:** `DELETE`
- **Route:** `/project/:projectId/notes/:noteId`
- **Response:** 
  - `200 OK`: Returns the deleted note object.
  - `404 Not Found`: If the note does not exist.

## Validations

The API uses `Joi` for validation. Ensure you send valid payloads to avoid `400 Bad Request` responses:

- For creating a note, both `taskId` and `note` fields are mandatory.
- For updating a note, the `note` field is mandatory.

## Running the server

To run the server, execute:
```console
npm run start
```

The server will be available at `http://localhost:3000`.
