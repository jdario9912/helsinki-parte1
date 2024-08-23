export const findContact = (
  contacts: Contact[],
  contact: Omit<Contact, "id">
): Contact | undefined =>
  contacts.find(
    (contacto) => contacto.name.toLowerCase() === contact.name.toLowerCase()
  );

export const isSamePhone = (
  contactToSave: Omit<Contact, "id">,
  contactSaved: Contact
): boolean => contactToSave.number === contactSaved.number;
