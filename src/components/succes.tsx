type Props = {
  message?: string;
};

const Succes = ({ message }: Props) =>
  message ? <span className="succes">{message}</span> : null;

export default Succes;
