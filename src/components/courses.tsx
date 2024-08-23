import { useState } from "react";
import { courses } from "../libs/courses";
import Course from "./course";

const Courses = () => {
  const [cursos] = useState<Course[]>(courses);

  return (
    <section className="section">
      <h2>Web development curriculum</h2>
      {cursos.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </section>
  );
};

export default Courses;
