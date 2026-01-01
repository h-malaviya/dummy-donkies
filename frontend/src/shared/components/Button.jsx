import "../styles/button.scss";

export default function Button({ children,onclick=()=>{} }) {
  return <button className="btn-primary" onClick={onclick}>{children}</button>;
}
