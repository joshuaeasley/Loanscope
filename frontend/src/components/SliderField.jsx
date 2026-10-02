function SliderField({ label, value, min, max, step, onChange }) {
  return (
    <div>
      <label>{label}</label>
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
        aria-label={`${label} value`}
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