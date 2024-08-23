import { useEffect, useId, useState } from "react";
import Note from "./note";
import {
  addNote,
  deleteNote,
  getNotes,
  toggleImportanceOf,
} from "../libs/notes-querys";
import { AxiosError } from "axios";

const Notes = () => {
  const idNote = useId();
  const [notas, setNotas] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const [showAll, setShowAll] = useState(true);

  const resetNote = () => setNewNote("");

  useEffect(() => {
    const data = async () => {
      const notes = await getNotes();
      setNotas(notes);
    };

    try {
      data();
    } catch (error) {
      alert(error);
    }
  }, []);

  const handleDelete = async (id: string) => {
    window.alert("Are you sure you want to delete this note?");
    await deleteNote(id);
    setNotas(notas.filter((nota) => nota.id !== id));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    try {
      const res = await addNote(noteObject);

      setNotas([...notas, res]);
    } catch (error) {
      alert(
        error instanceof AxiosError ? error.response?.data : "Algo salio mal."
      );
    }

    resetNote();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notas
    : notas.filter((note) => note.important === true);

  const toggleShowAll = () => setShowAll(!showAll);

  const toggleImportace = async (note: Note) => {
    const res = await toggleImportanceOf(note);

    setNotas(notas.map((nota) => (nota.id !== res.id ? nota : res)));
  };

  return (
    <section className="section">
      <h2>Add a new note</h2>

      <form onSubmit={handleSubmit} className="form">
        <label htmlFor={idNote}>
          <span className="label-input">new note</span>
          <input
            type="text"
            value={newNote}
            onChange={handleChange}
            id={idNote}
          />
        </label>
        <button type="submit">save</button>
      </form>

      <button onClick={toggleShowAll}>
        {showAll ? "Show only important" : "Show all"}
      </button>

      <ul>
        {notesToShow.map((note) => (
          <Note
            note={note}
            key={note.id}
            toggleImportace={toggleImportace}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
};

export default Notes;
