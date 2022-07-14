import React, { useState } from "react";
import "./UserInfoForm.css";
import Radio from "../../components/Radio/Radio";
import Dropdown from "../../components/Dropdown/Dropdown";
import { useNavigate, useLocation } from "react-router-dom";
export default function UserInfoForm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [userInfo, setUserInfo] = useState({
    username: state?.username || "",
    age: state?.age || null,
    price: state?.price || null,
    basePrice: state?.basePrice || 0,
    selectedPackage: state?.selectedPackage || "Standard",
    selectedCurrency: state?.selectedCurrency || "HKD",
    selectedCountry: state?.selectedCountry || "Hong Kong",
  });
  const [calculatedPackage, setCalculatedPackage] = useState({
    standard: state?.calculatedPackage?.standard || 0,
    safe: state?.calculatedPackage?.safe || 0,
    supersafe: state?.calculatedPackage?.supersafe || 0,
  });
  const packageList = [
    { id: 1, name: "pkg_standard", value: "Standard", label: "Standard" },
    {
      id: 2,
      name: "pkg_safe",
      value: "Safe",
      label: `Safe (+${calculatedPackage?.safe || 0}${
        userInfo?.selectedCurrency
      },50%)`,
    },
    {
      id: 3,
      name: "pkg_super_safe",
      value: "Super Safe",
      label: `Super Safe (+${calculatedPackage?.supersafe || 0}${
        userInfo?.selectedCurrency
      },75%)`,
    },
  ];
  const countryList = [
    { id: 1, name: "country_hongkong", value: "HKD", label: "Hong Kong" },
    { id: 2, name: "country_usa", value: "USD", label: "USA" },
    { id: 3, name: "country_australia", value: "AUD", label: "Australia" },
  ];

  const handleCountry = () => {
    let tmpUserInfo = userInfo;
    if (tmpUserInfo?.selectedCurrency === "HKD") {
      tmpUserInfo.basePrice = 10 * userInfo?.age * 1;
    }
    if (tmpUserInfo?.selectedCurrency === "USD") {
      tmpUserInfo.basePrice = 10 * userInfo?.age * 2;
    }
    if (tmpUserInfo?.selectedCurrency === "AUD") {
      tmpUserInfo.basePrice = 10 * userInfo?.age * 3;
    }
    if (!tmpUserInfo?.age) {
      tmpUserInfo.basePrice = null;
    }
    setUserInfo({ ...tmpUserInfo });
    handlePkg();
  };
  const handlePkg = () => {
    let tmpUserInfo = userInfo;
    let tmpCalculatedPackage = calculatedPackage;
    tmpCalculatedPackage.standard = tmpUserInfo.basePrice;
    tmpCalculatedPackage.safe =
      tmpUserInfo.basePrice + tmpUserInfo.basePrice * 0.5;
    tmpCalculatedPackage.supersafe =
      tmpUserInfo.basePrice + tmpUserInfo.basePrice * 0.75;
    if (tmpUserInfo?.selectedPackage === "Standard") {
      tmpUserInfo.price = tmpCalculatedPackage?.standard;
    }
    if (tmpUserInfo?.selectedPackage === "Safe") {
      tmpUserInfo.price = tmpCalculatedPackage?.safe;
    }
    if (tmpUserInfo?.selectedPackage === "Super Safe") {
      tmpUserInfo.price = tmpCalculatedPackage?.supersafe;
    }
    if (!tmpUserInfo?.age) {
      tmpUserInfo.price = null;
      tmpCalculatedPackage.standard = 0;
      tmpCalculatedPackage.safe = 0;
      tmpCalculatedPackage.supersafe = 0;
    }
    setCalculatedPackage({ ...tmpCalculatedPackage });
    setUserInfo({ ...tmpUserInfo });
  };
  const handleChangeDropdown = (event) => {
    const currency = event?.target?.value;
    let tmpUserInfo = userInfo;
    if (currency === "USD") {
      tmpUserInfo.selectedCountry = "USA";
    }
    if (currency === "AUD") {
      tmpUserInfo.selectedCountry = "Australia";
    }
    tmpUserInfo.selectedCurrency = currency;
    setUserInfo({ ...tmpUserInfo });
    handleCountry();
  };
  const handleChangeRadio = (event) => {
    const pkg = event?.target?.value;
    let tmpUserInfo = userInfo;
    tmpUserInfo.selectedPackage = pkg;
    handlePkg();
    setUserInfo({ ...tmpUserInfo });
  };
  const handleChangeInfo = (event, key) => {
    let tmpUserInfo = userInfo;
    tmpUserInfo[key] = event?.target?.value;
    setUserInfo(tmpUserInfo);
    if (key === "age") {
      handleCountry();
      //handlePkg();
    }
  };
  const onSubmit = () => {
    if (userInfo?.username.length === 0 || !userInfo?.age) return;
    if (userInfo?.age > 100) {
      navigate("/age-error");
    } else {
      navigate("/summary", { state: { ...userInfo, calculatedPackage } });
    }
  };
  return (
    <div className="common-container user-info-form-contailner">
      <h3 className="home-header">Tell us about yourself</h3>
      <div className="form-container">
        <label className="user-form-label" for="user-name">
          Name
        </label>
        <input
          type="text"
          id="user-name"
          name="user-name"
          placeholder="Your name.."
          defaultValue={userInfo?.username}
          onChange={(e) => {
            handleChangeInfo(e, "username");
          }}
        />
        <label className="user-form-label" for="user-age">
          Age
        </label>
        <input
          type="number"
          id="user-age"
          name="user-age"
          placeholder="Your Age.."
          value={userInfo?.age}
          onChange={(e) => {
            handleChangeInfo(e, "age");
          }}
        />
        <label className="user-form-label" for="user-country">
          Where do you live
        </label>
        <Dropdown
          items={countryList}
          onChangeDropdownChange={handleChangeDropdown}
          selectedValue={userInfo?.selectedCurrency}
        />
        <div className="content-container w93percent">
          <Radio
            items={packageList}
            onChangeRadio={handleChangeRadio}
            selectedValue={userInfo?.selectedPackage}
          />
          {userInfo?.price && (
            <h3 className="home-header">Your premium is: {userInfo?.price}</h3>
          )}
          <div className="button-container">
            <div className="button-inner">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="back-button"
              >
                Back
              </button>
              <button
                onClick={() => {
                  onSubmit();
                }}
                className="next-button"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
