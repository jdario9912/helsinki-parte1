import { useId } from "react";

type Props = {
  contact: Omit<Contact, "id">;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const FormContact = ({ contact, handleChange, handleSubmit }: Props) => {
  const idName = useId();
  const idPhone = useId();

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor={idName}>
        <span className="label-input">name</span>
        <input
          type="text"
          id={idName}
          value={contact?.name}
          name="name"
          onChange={handleChange}
        />
      </label>

      <label htmlFor={idPhone}>
        <span className="label-input">phone</span>
        <input
          type="number"
          name="number"
          id={idPhone}
          onChange={handleChange}
          value={contact?.number}
          min={0}
        />
      </label>

      <button>save</button>
    </form>
  );
};

export default FormContact;
