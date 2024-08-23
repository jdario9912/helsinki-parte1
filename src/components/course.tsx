import Topic from "./topic";

type Props = {
  course: Course;
};
const Course = ({ course }: Props) => {
  const count = course.parts.reduce((sum, course) => sum + course.exercises, 0);

  return (
    <>
      <h3>{course.name}</h3>
      <ul>
        {course.parts.map((part) => (
          <Topic course={part} key={part.id} />
        ))}
      </ul>

      <p>Number of exercises: {count}</p>
    </>
  );
};

export default Course;
