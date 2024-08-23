type Props = {
  course: Topic;
};
const Topic = ({ course }: Props) => (
  <li>
    {course.name} {course.exercises}
  </li>
);

export default Topic;
