export default function Dropdown({ items, onChangeDropdownChange, selectedValue }) {
  return (
    <select id="country" name="country" onChange={onChangeDropdownChange}>
          {items.map((item, index) => {
            return <option key={index} selected={selectedValue===item.selectedValue} value={item.value}>{item.label}</option>
          })}
    </select>
  );
}
