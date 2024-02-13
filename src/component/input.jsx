export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  errorMessage,
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
      {errorMessage ? <small className="text-red">{errorMessage}</small> : null}
    </>
  );
}
