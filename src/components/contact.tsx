type Props = {
  contact: Contact;
  handleDelete: (id: string) => void;
};

const Contact = ({ contact, handleDelete }: Props) => {
  return (
    <li className="contact">
      <p>
        {contact.name} : {contact.number}
      </p>
      <button className="btn-delete" onClick={() => handleDelete(contact.id)}>
        Delete
      </button>
    </li>
  );
};
export default Contact;
