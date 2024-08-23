type Props = {
  note: Note;
  toggleImportace: (note: Note) => void;
  handleDelete: (id: string) => void;
};

const Note = ({ note, toggleImportace, handleDelete }: Props) => {
  return (
    <li key={note.id} className="note">
      <h3>{note.content}</h3>
      <div className="notes-btns-container">
        <input
          type="checkbox"
          onClick={() =>
            toggleImportace({ ...note, important: !note.important })
          }
          defaultChecked={note.important}
        />

        <button className="btn-delete" onClick={() => handleDelete(note.id)}>
          delete
        </button>
      </div>
    </li>
  );
};

export default Note;
