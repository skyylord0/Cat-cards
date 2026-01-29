export default function SelectType({ onTypeChange }) {
  return (
    <select onChange={(e) => onTypeChange(e.target.value)} defaultValue="image">
      <option value="image">Regular Image</option>
      <option value="gif">GIF</option>
    </select>
  );
}