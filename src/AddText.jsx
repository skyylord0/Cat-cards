export default function AddText({ inputText, onInputChange, onValidate }) {
  function handleKeyUp(e) {
    if (e.key === "Enter") {
      onValidate();
    }
  }

  return (
    <input
      type="text"
      placeholder="Type caption and press Enter"
      value={inputText}
      onChange={(e) => onInputChange(e.target.value)}
      onKeyUp={handleKeyUp}
    />
  );
}