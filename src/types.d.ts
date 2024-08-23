type Note = {
  id: string;
  content: string;
  important: boolean;
};

type Course = {
  name: string;
  id: number;
  parts: Topic[];
};

type Topic = {
  id: number;
  name: string;
  exercises: number;
};

type Contact = {
  id: string;
  name: string;
  number: string;
};
