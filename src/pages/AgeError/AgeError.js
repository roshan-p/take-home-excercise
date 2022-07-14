import { useNavigate } from "react-router-dom";
import "./AgeError.css";
export default function AgeError() {
  const navigate = useNavigate();
  const onClickOK = () => {
    navigate("/");
  };
  return (
    <div className="common-container">
      <div className="content-container">
        <h1 className="margin20">Ooops</h1>
        <p className="paddingBottom20 age-error-font">
          Your age is over our accepted limit.
          <br />
          We are sorry but we can not insure you now
        </p>
        <button
          onClick={() => {
            onClickOK();
          }}
          className="start-button"
        >
          {"Ok :("}
        </button>
      </div>
    </div>
  );
}
