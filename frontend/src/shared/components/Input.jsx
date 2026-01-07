import "../styles/input.scss";

export default function Input({id, type, label, value, onChange,placeholder,onBlur }) {
  return (
    <div className="floating-label">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
      <label>{label}</label>
    </div>
  );
}
