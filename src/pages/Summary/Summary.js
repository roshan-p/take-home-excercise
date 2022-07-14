import { useLocation } from "react-router-dom";
import "./Summary.css";
import { useNavigate } from "react-router-dom";
export default function Summary() {
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <div className="common-container">
      <div className="content-container">
        <h1 className="margin20">Summary</h1>
        <p className="paddingBottom20 age-error-font">
          Name: {state?.username}
          <br />
          Age: {state?.age}
          <br />
          Where do you live: {state?.selectedCountry}
          <br />
          Package: {state?.selectedPackage}
          <br />
          Premium: {state?.price + state.selectedCurrency}
        </p>
        <div className="button-container">
          <div className="button-inner">
            <button
              onClick={() => {
                navigate("/user-info-form", { state: state });
              }}
              className="back-button"
            >
              Back
            </button>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="next-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
