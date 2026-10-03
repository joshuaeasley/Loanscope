function SliderField({ label, value, min, max, step, onChange }) {
  const id = "field-" + label.replace(/[^a-zA-Z]/g, "");

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        type="range"
        aria-label={`${label} slider`}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value), "slider")}
      />
      <input
        type="number"
        id={id}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value), "number")}
      />
    </div>
  );
}

export default SliderField;