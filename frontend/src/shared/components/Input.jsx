import "../styles/input.scss";

export default function Input({ type, label, value, onChange,placeholder }) {
  return (
    <div className="floating-label">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <label>{label}</label>
    </div>
  );
}
