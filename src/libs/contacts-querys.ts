import axios from "axios";
import { apiContacts } from "./url-apis";

const ax = axios.create({
  baseURL: apiContacts,
  timeout: 5000,
});

export const getContacts = async (): Promise<Contact[]> => {
  const res = await ax.get<Contact[]>("/contacts");
  return res.data;
};

export const addContact = async (contact: Omit<Contact, "id">) => {
  const res = await ax.post<Contact>("/contacts", contact);
  return res.data;
};

export const deleteContac = async (id: string): Promise<void> =>
  await ax.delete(`/contacts/${id}`);

export const updateNumber = async (
  contactUpdated: Contact
): Promise<Contact> => {
  const res = await ax.patch<Contact>(`/contacts/${contactUpdated.id}`, {
    number: contactUpdated.number,
  });

  return res.data;
};
