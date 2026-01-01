import "../styles/input.scss";

export default function Input({ type, label, value, onChange }) {
  return (
    <div className="floating-label">
      <input
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        required
      />
      <label>{label}</label>
    </div>
  );
}
