import "./Home.css";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const onClickStart = () => {
    navigate("/user-info-form");
  };
  return (
    <div className="common-container">
      <div className="content-container">
        <h2 className="margin20">Hello There!</h2>
        <p className="paddingBottom20">
          Let's buy some insurance. it is going to take only a few steps
        </p>
        <button
          onClick={() => {
            onClickStart();
          }}
          className="start-button"
        >
          Start
        </button>
      </div>
    </div>
  );
}
