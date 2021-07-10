import { useSelector } from "react-redux";
const Streams = () => {
  const streams = useSelector((state) => state.streams);

  console.log(streams);

  return <h1> Streams here </h1>;
};

export default Streams;
