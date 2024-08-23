import axios from "axios";
import { apiNotes } from "./url-apis";

const ax = axios.create({
  baseURL: apiNotes,
  timeout: 5000,
});

export const getNotes = async (): Promise<Note[]> => {
  const res = await ax.get<Note[]>("/notes");
  return res.data;
};

export const addNote = async (note: Omit<Note, "id">): Promise<Note> => {
  const res = await ax.post<Note>("/notes", note);
  return res.data;
};

export const toggleImportanceOf = async (note: Note): Promise<Note> => {
  const res = await ax.patch<Note>(`/notes/${note.id}`, note);
  return res.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await ax.delete(`/notes/${id}`);
};
