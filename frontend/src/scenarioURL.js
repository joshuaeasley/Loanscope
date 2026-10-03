const DEFAULTS = {principal: 200000, interestRate: 6.5, payment: 1500};

const FIELDS = [
  { param: "principal", key: "principal", label: "Principal", min: 1, max: 100000000 },
  { param: "rate", key: "interestRate", label: "Interest rate", min: 0, max: 40 },
  { param: "payment", key: "payment", label: "Monthly payment", min: 1, max: Infinity },
];

export function readScenarioFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const scenario = {...DEFAULTS};
  const problems = [];

  for (const field of FIELDS) {
    const text = params.get(field.param);

    if (text === null) continue;

    const number = Number(text);
    const valid =
      text.trim() !== "" &&
      Number.isFinite(number) &&
      number >= field.min &&
      number <= field.max;

    if (valid) {
      scenario[field.key] = number;
    } else {
      problems.push(
        `${field.label} "${text}" in the link is not valid, so the default (${DEFAULTS[field.key]}) was used.`
      );
    }
  }

  return {scenario, problems};
}