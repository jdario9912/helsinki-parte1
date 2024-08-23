import Contact from "./contact";

type Props = {
  contacts: Contact[];
  handleDelete: (id: string) => void;
};
const Contacts = ({ contacts, handleDelete }: Props) => (
  <ul>
    {contacts.map((contact) => (
      <Contact
        contact={contact}
        key={contact.name}
        handleDelete={handleDelete}
      />
    ))}
  </ul>
);

export default Contacts;
