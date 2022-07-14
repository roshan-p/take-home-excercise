import "./Radio.css";

export default function Radio({ items, onChangeRadio, selectedValue }) {
  return (
    <div className="radio-container">
      {items.map((item, index) => {
        return (
          <div key={index}>
            <input
              type="radio"
              id={item?.name}
              name="fav_language"
              value={item?.value}
              checked={selectedValue === item?.value}
              onChange={onChangeRadio}
            />
            <label className="user-form-label" for="html">
              {item?.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}
