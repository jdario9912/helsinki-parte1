import { useEffect, useState } from "react";
import Contacts from "./contacts";
import FormContact from "./form-contact";
import FilterContacts from "./filter-contacts";
import {
  addContact,
  deleteContac,
  getContacts,
  updateNumber,
} from "../libs/contacts-querys";
import { AxiosError } from "axios";
import { findContact, isSamePhone } from "../libs/phonebook";
import Succes from "./succes";

const Phonebook = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const initialValue: Omit<Contact, "id"> = { name: "", number: "" };
  const [contact, setContact] = useState<Omit<Contact, "id">>(initialValue);
  const [filter, setFilter] = useState("");
  const [succesMessage, setSuccesMessage] = useState<string | undefined>("");

  useEffect(() => {
    const data = async () => {
      const contacts = await getContacts();
      
      setContacts(contacts);
    };

    try {
      data();
    } catch (error) {
      alert(
        error instanceof AxiosError ? error.response?.data : "Algo salio mal."
      );
    }
  }, []);

  const endSucces = () => setTimeout(() => setSuccesMessage(undefined), 4500);

  const resetContact = () => setContact(initialValue);

  const updateContacts = (contactUpdated: Contact) =>
    setContacts(
      contacts.map((contact) =>
        contact.id === contactUpdated.id ? contactUpdated : contact
      )
    );

  const isEmpty = (contact: Omit<Contact, "id">) =>
    contact.name === "" || contact.number === "";

  const hadleDelete = async (id: string) => {
    window.alert(`Are you sure you want to delete ${id}?`);

    try {
      await deleteContac(id);

      setContacts(contacts.filter((contact) => contact.id !== id));
    } catch (error) {
      alert(error instanceof Error ? error.message : "Algo salio mal.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEmpty(contact)) {
      alert("Please fill in all fields");
      return;
    }

    const contactSaved = findContact(contacts, contact);

    if (!contactSaved) {
      const newContact = await addContact(contact);
      setSuccesMessage(`${contact.name} added to phonebook`);
      endSucces();
      setContacts([newContact, ...contacts]);
      resetContact();
      return;
    }

    const samePhone = isSamePhone(contact, contactSaved);

    if (samePhone) {
      alert(`${contact.name} is already added to phonebook`);
      return;
    }

    const confirmUpdateNumber = confirm(
      `${contact.name} is already added to phonebook, replace the old number with the new one?`
    );

    if (!confirmUpdateNumber) {
      resetContact();
      return;
    }

    try {
      const contactUpdated = await updateNumber({
        id: contactSaved.id,
        ...contact,
      });

      updateContacts(contactUpdated);

      resetContact();
    } catch (error) {
      alert(error instanceof AxiosError ? error.message : "Algo salio mal.");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <section className="section">
      <h2>Phonebook</h2>

      <Succes message={succesMessage} />

      <FormContact
        contact={contact}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      <h3>Contacts</h3>

      <FilterContacts filter={filter} handleFilter={handleFilter} />

      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <Contacts
          contacts={
            filter === ""
              ? contacts
              : contacts.filter((contact) =>
                  contact.name.toLowerCase().includes(filter.toLowerCase())
                )
          }
          handleDelete={hadleDelete}
        />
      )}
    </section>
  );
};

export default Phonebook;
