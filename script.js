// Data as of October 2026, from
// https://doctortaller.com/blogs/science-insight/top-10-tallest-basketball-players-in-the-world

const ACTIVE_PROS = [
  { name: "Tacko Fall", country: "Senegal", inches: 90, club: "Philadelphia 76ers (training camp)" },
  { name: "Xu Xin", country: "China", inches: 89, club: "Guangzhou Loong-Lions (CBA)" },
  { name: "Boban Marjanović", country: "Serbia", inches: 88, club: "Strong Group Athletics (2026 Jones Cup)" },
  { name: "Victor Wembanyama", country: "France", inches: 88, club: "San Antonio Spurs" },
  { name: "Bol Bol", country: "South Sudan", inches: 87, club: "Free agent" },
  { name: "Zach Edey", country: "Canada", inches: 87, club: "Memphis Grizzlies" },
  { name: "Youssoupha Fall", country: "Senegal", inches: 87, club: "Nanjing Monkey Kings (CBA)" },
  { name: "Aday Mara", country: "Spain", inches: 87, club: "Oklahoma City Thunder" },
  { name: "Edy Tavares", country: "Cape Verde", inches: 87, club: "Real Madrid" },
  { name: "Rocco Zikarsky", country: "Australia", inches: 87, club: "Minnesota Timberwolves (two-way)" }
];

// "meters" overrides the converted value where the source lists a different metric figure.
const LINEUP = [
  { label: "Average American man", inches: 69, type: "reference" },
  { label: "Average NBA player", inches: 79, meters: 2.0, type: "reference" },
  { label: "Victor Wembanyama", inches: 88, type: "pro" },
  { label: "Tacko Fall", inches: 90, type: "pro" },
  { label: "Bol & Mureșan, NBA record", inches: 91, type: "record" },
  { label: "Olivier Rioux", inches: 93, type: "pro" },
  { label: "Nashnush, tallest on record", inches: 96, meters: 2.45, type: "record" }
];

const CHART_MIN = 36;  // 3 ft
const CHART_MAX = 108; // 9 ft
const TALLEST_PRO = 90; // Tacko Fall

let unit = "imperial";

function formatFeet(totalInches) {
  const rounded = Math.round(totalInches);
  const feet = Math.floor(rounded / 12);
  const inches = rounded % 12;
  return `${feet}'${inches}"`;
}

function toMeters(totalInches) {
  return (totalInches * 2.54 / 100).toFixed(2);
}

function formatDifference(inchesDiff) {
  const rounded = Math.round(inchesDiff);
  const feet = Math.floor(rounded / 12);
  const inches = rounded % 12;
  const cm = Math.round(inchesDiff * 2.54);
  let text = "";
  if (feet > 0) text += `${feet} ft `;
  if (inches > 0 || feet === 0) text += `${inches} in`;
  return `${text.trim()} (${cm} cm)`;
}

function percentHeight(totalInches) {
  const clamped = Math.min(Math.max(totalInches, CHART_MIN), CHART_MAX);
  return ((clamped - CHART_MIN) / (CHART_MAX - CHART_MIN)) * 100;
}

function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let feet = 4; feet <= 9; feet++) {
    const line = document.createElement("div");
    line.className = "grid-line";
    line.style.bottom = `${percentHeight(feet * 12)}%`;
    const label = document.createElement("span");
    label.textContent = `${feet}'`;
    line.appendChild(label);
    grid.appendChild(line);
  }
}

function renderChart(userInches) {
  const bars = document.getElementById("bars");
  const entries = [...LINEUP, { label: "You", inches: userInches, type: "you" }]
    .sort((a, b) => a.inches - b.inches);

  bars.innerHTML = "";
  entries.forEach((entry) => {
    const bar = document.createElement("div");
    bar.className = `bar is-${entry.type}`;
    bar.style.height = `${percentHeight(entry.inches)}%`;

    const meters = entry.meters ? entry.meters.toFixed(2) : toMeters(entry.inches);
    const height = document.createElement("span");
    height.className = "bar-height";
    height.textContent = unit === "metric" ? `${Math.round(meters * 100)} cm` : formatFeet(entry.inches);

    const label = document.createElement("span");
    label.className = "bar-label";
    label.textContent = entry.label;

    bar.append(height, label);
    bars.appendChild(bar);
  });

  document.getElementById("chart").setAttribute(
    "aria-label",
    `Bar chart: your height of ${formatFeet(userInches)} (${toMeters(userInches)} m) compared with ` +
      LINEUP.map((e) => `${e.label}, ${formatFeet(e.inches)}`).join("; ")
  );
}

function renderResult(userInches) {
  const result = document.getElementById("result");
  const diff = TALLEST_PRO - userInches;

  if (diff > 0) {
    result.textContent = `Tacko Fall, the tallest active pro, stands ${formatDifference(diff)} taller than you.`;
  } else if (diff === 0) {
    result.textContent = "You'd stand eye to eye with Tacko Fall, the tallest active pro.";
  } else {
    result.textContent = `You're ${formatDifference(-diff)} taller than Tacko Fall, the tallest active pro.`;
  }
}

function renderTable() {
  const body = document.getElementById("ranking-body");
  body.innerHTML = "";
  ACTIVE_PROS.forEach((player, index) => {
    const row = document.createElement("tr");
    const cells = [
      String(index + 1),
      player.name,
      player.country,
      `${formatFeet(player.inches)} (${toMeters(player.inches)} m)`,
      player.club
    ];
    cells.forEach((value, i) => {
      const cell = document.createElement(i === 1 ? "th" : "td");
      if (i === 1) cell.scope = "row";
      if (i === 3) cell.className = "height-cell";
      cell.textContent = value;
      row.appendChild(cell);
    });
    body.appendChild(row);
  });
}

function readUserHeight() {
  if (unit === "metric") {
    const cm = Number(document.getElementById("cm").value);
    if (!Number.isFinite(cm) || cm < 92 || cm > 271) {
      return { error: "Enter a height between 92 and 271 cm." };
    }
    return { inches: cm / 2.54 };
  }

  const feet = Number(document.getElementById("feet").value);
  const inches = Number(document.getElementById("inches").value || 0);
  const valid =
    Number.isInteger(feet) && Number.isFinite(inches) &&
    feet >= 3 && feet <= 8 && inches >= 0 && inches < 12;
  if (!valid) {
    return { error: "Enter feet between 3 and 8, and inches between 0 and 11." };
  }
  return { inches: feet * 12 + inches };
}

function update() {
  const error = document.getElementById("form-error");
  const { inches, error: message } = readUserHeight();
  if (message) {
    error.textContent = message;
    return;
  }
  error.textContent = "";
  renderChart(inches);
  renderResult(inches);
}

function setUnit(nextUnit) {
  const current = readUserHeight();
  unit = nextUnit;

  document.querySelectorAll(".unit-btn").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.unit === unit));
  });
  document.getElementById("imperial-fields").hidden = unit !== "imperial";
  document.getElementById("metric-fields").hidden = unit !== "metric";

  // Carry the current height across to the other unit.
  if (current.inches) {
    if (unit === "metric") {
      document.getElementById("cm").value = Math.round(current.inches * 2.54);
    } else {
      const rounded = Math.round(current.inches);
      document.getElementById("feet").value = Math.floor(rounded / 12);
      document.getElementById("inches").value = rounded % 12;
    }
  }
  update();
}

document.querySelectorAll(".unit-btn").forEach((btn) => {
  btn.addEventListener("click", () => setUnit(btn.dataset.unit));
});

document.getElementById("height-form").addEventListener("submit", (event) => {
  event.preventDefault();
  update();
});

renderGrid();
renderTable();
update();
