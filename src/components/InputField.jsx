import { useState } from "react";

const InputField = ({ type, placeholder, icon, value, onChange }) => {
  // State to toggle password visibility
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="input-wrapper">
      <input
        type={type === "password" && isPasswordShown ? "text" : type}
        placeholder={placeholder}
        className="input-field"
        required
        value={value} // ✅ controlled input
        onChange={onChange} // ✅ handle change
      />
      <i className="material-symbols-rounded">{icon}</i>

      {type === "password" && (
        <i
          onClick={() => setIsPasswordShown((prev) => !prev)}
          className="material-symbols-rounded eye-icon"
        >
          {isPasswordShown ? "visibility" : "visibility_off"}
        </i>
      )}
    </div>
  );
};

export default InputField;
