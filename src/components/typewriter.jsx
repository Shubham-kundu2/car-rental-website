import { TypeAnimation } from "react-type-animation";

const TypeWriter = () => {
  return (
    <TypeAnimation
      sequence={[
        "Experience the thrill of the open road",
        1000,
        "Explore the thrill of adventure",
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{
        fontSize: "1.5em",
        display: "inline-block",
        color: "white",
        fontWeight: "700",
        marginTop: "100px",
        marginLeft: "40px",
      }}
      repeat={Infinity}
    />
  );
};

export default TypeWriter;
