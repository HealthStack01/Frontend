import "./styles.css";

const AnimatedDots = ({text}) => {
  return (
    <div className="wrapper">
      <div className="loading-text">
        <h1 style={{color: "#ffffff"}}>
          {text}
          <span className="dot-one"> .</span>
          <span className="dot-two"> .</span>
          <span className="dot-three"> .</span>
        </h1>
      </div>
    </div>
  );
};

export default AnimatedDots;
