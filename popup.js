// popup.js – Valora com drag-and-drop, persistência e lógica completa

const selectors = ["currency1", "currency2", "currency3", "currency4"];
const inputs = ["value1", "value2", "value3", "value4"];
const flags = ["flag1", "flag2", "flag3", "flag4"];
let lastEditedIndex = null;
let isRefreshing = false;
let hadApiError = false;
let hadSuccess = false;

const storage = (typeof browser !== "undefined" && browser.storage)
  ? browser.storage
  : (typeof chrome !== "undefined" && chrome.storage)
  ? chrome.storage
  : null;

const currencies = {
  "AED": { "name": "United Arab Emirates Dirham" },
  "AFN": { "name": "Afghan Afghani" },
  "ALL": { "name": "Albanian Lek" },
  "AMD": { "name": "Armenian Dram" },
  "ANG": { "name": "Netherlands Antillean Guilder" },
  "AOA": { "name": "Angolan Kwanza" },
  "ARS": { "name": "Argentine Peso" },
  "AUD": { "name": "Australian Dollar" },
  "AWG": { "name": "Aruban Florin" },
  "AZN": { "name": "Azerbaijani Manat" },
  "BAM": { "name": "Bosnia And Herzegovina Convertible Mark" },
  "BBD": { "name": "Barbados Dollar" },
  "BDT": { "name": "Bangladeshi Taka" },
  "BGN": { "name": "Bulgarian Lev" },
  "BHD": { "name": "Bahraini Dinar" },
  "BIF": { "name": "Burundian Franc" },
  "BMD": { "name": "Bermudian Dollar" },
  "BND": { "name": "Brunei Dollar" },
  "BOB": { "name": "Boliviano" },
  "BRL": { "name": "Brazilian Real" },
  "BSD": { "name": "Bahamian Dollar" },
  "BTN": { "name": "Bhutanese Ngultrum" },
  "BWP": { "name": "Botswana Pula" },
  "BYN": { "name": "Belarusian Ruble" },
  "BZD": { "name": "Belize Dollar" },
  "CAD": { "name": "Canadian Dollar" },
  "CDF": { "name": "Congolese Franc" },
  "CHF": { "name": "Swiss Franc" },
  "CLP": { "name": "Chilean Peso" },
  "CNY": { "name": "Renminbi" },
  "COP": { "name": "Colombian Peso" },
  "CRC": { "name": "Costa Rican Colon" },
  "CUP": { "name": "Cuban Peso" },
  "CVE": { "name": "Cape Verdean Escudo" },
  "CZK": { "name": "Czech Koruna" },
  "DJF": { "name": "Djiboutian Franc" },
  "DKK": { "name": "Danish Krone" },
  "DOP": { "name": "Dominican Peso" },
  "DZD": { "name": "Algerian Dinar" },
  "EGP": { "name": "Egyptian Pound" },
  "ERN": { "name": "Eritrean Nakfa" },
  "ETB": { "name": "Ethiopian Birr" },
  "EUR": { "name": "Euro" },
  "FJD": { "name": "Fiji Dollar" },
  "FKP": { "name": "Falkland Islands Pound" },
  "GBP": { "name": "Pound Sterling" },
  "GEL": { "name": "Georgian Lari" },
  "GHS": { "name": "Ghanaian Cedi" },
  "GIP": { "name": "Gibraltar Pound" },
  "GMD": { "name": "Gambian Dalasi" },
  "GNF": { "name": "Guinean Franc" },
  "GTQ": { "name": "Guatemalan Quetzal" },
  "GYD": { "name": "Guyanese Dollar" },
  "HKD": { "name": "Hong Kong Dollar" },
  "HNL": { "name": "Honduran Lempira" },
  "HTG": { "name": "Haitian Gourde" },
  "HUF": { "name": "Hungarian Forint" },
  "IDR": { "name": "Indonesian Rupiah" },
  "ILS": { "name": "Israeli New Shekel" },
  "INR": { "name": "Indian Rupee" },
  "IQD": { "name": "Iraqi Dinar" },
  "IRR": { "name": "Iranian Rial" },
  "ISK": { "name": "Icelandic Króna" },
  "JMD": { "name": "Jamaican Dollar" },
  "JOD": { "name": "Jordanian Dinar" },
  "JPY": { "name": "Japanese Yen" },
  "KES": { "name": "Kenyan Shilling" },
  "KGS": { "name": "Kyrgyzstani Som" },
  "KHR": { "name": "Cambodian Riel" },
  "KMF": { "name": "Comoro Franc" },
  "KPW": { "name": "North Korean Won" },
  "KRW": { "name": "South Korean Won" },
  "KWD": { "name": "Kuwaiti Dinar" },
  "KYD": { "name": "Cayman Islands Dollar" },
  "KZT": { "name": "Kazakhstani Tenge" },
  "LAK": { "name": "Lao Kip" },
  "LBP": { "name": "Lebanese Pound" },
  "LKR": { "name": "Sri Lankan Rupee" },
  "LRD": { "name": "Liberian Dollar" },
  "LSL": { "name": "Lesotho Loti" },
  "LYD": { "name": "Libyan Dinar" },
  "MAD": { "name": "Moroccan Dirham" },
  "MDL": { "name": "Moldovan Leu" },
  "MGA": { "name": "Malagasy Ariary" },
  "MKD": { "name": "Macedonian Denar" },
  "MMK": { "name": "Myanmar Kyat" },
  "MNT": { "name": "Mongolian Tögrög" },
  "MOP": { "name": "Macanese Pataca" },
  "MRU": { "name": "Mauritanian Ouguiya" },
  "MUR": { "name": "Mauritian Rupee" },
  "MVR": { "name": "Maldivian Rufiyaa" },
  "MWK": { "name": "Malawian Kwacha" },
  "MXN": { "name": "Mexican Peso" },
  "MYR": { "name": "Malaysian Ringgit" },
  "MZN": { "name": "Mozambican Metical" },
  "NAD": { "name": "Namibian Dollar" },
  "NGN": { "name": "Nigerian Naira" },
  "NIO": { "name": "Nicaraguan Córdoba" },
  "NOK": { "name": "Norwegian Krone" },
  "NPR": { "name": "Nepalese Rupee" },
  "NZD": { "name": "New Zealand Dollar" },
  "OMR": { "name": "Omani Rial" },
  "PAB": { "name": "Panamanian Balboa" },
  "PEN": { "name": "Peruvian Sol" },
  "PGK": { "name": "Papua New Guinean Kina" },
  "PHP": { "name": "Philippine Peso" },
  "PKR": { "name": "Pakistani Rupee" },
  "PLN": { "name": "Polish Złoty" },
  "PYG": { "name": "Paraguayan Guaraní" },
  "QAR": { "name": "Qatari Riyal" },
  "RON": { "name": "Romanian Leu" },
  "RSD": { "name": "Serbian Dinar" },
  "RUB": { "name": "Russian Ruble" },
  "RWF": { "name": "Rwandan Franc" },
  "SAR": { "name": "Saudi Riyal" },
  "SBD": { "name": "Solomon Islands Dollar" },
  "SCR": { "name": "Seychelles Rupee" },
  "SDG": { "name": "Sudanese Pound" },
  "SEK": { "name": "Swedish Krona" },
  "SGD": { "name": "Singapore Dollar" },
  "SHP": { "name": "Saint Helena Pound" },
  "SLE": { "name": "Sierra Leonean Leone (New Leone)" },
  "SOS": { "name": "Somalian Shilling" },
  "SRD": { "name": "Surinamese Dollar" },
  "SSP": { "name": "South Sudanese Pound" },
  "STN": { "name": "São Tomé And Príncipe Dobra" },
  "SVC": { "name": "Salvadoran Colón" },
  "SYP": { "name": "Syrian Pound" },
  "SZL": { "name": "Swazi Lilangeni" },
  "THB": { "name": "Thai Baht" },
  "TJS": { "name": "Tajikistani Somoni" },
  "TMT": { "name": "Turkmenistan Manat" },
  "TND": { "name": "Tunisian Dinar" },
  "TOP": { "name": "Tongan Paʻanga" },
  "TRY": { "name": "Turkish Lira" },
  "TTD": { "name": "Trinidad And Tobago Dollar" },
  "TWD": { "name": "New Taiwan Dollar" },
  "TZS": { "name": "Tanzanian Shilling" },
  "UAH": { "name": "Ukrainian Hryvnia" },
  "UGX": { "name": "Ugandan Shilling" },
  "USD": { "name": "United States Dollar", "flag": "us" },
  "UYU": { "name": "Uruguayan Peso" },
  "UYW": { "name": "Unidad Previsional" },
  "UZS": { "name": "Uzbekistani Sum" },
  "VED": { "name": "Venezuelan Digital Bolívar" },
  "VES": { "name": "Venezuelan Sovereign Bolívar" },
  "VND": { "name": "Vietnamese Đồng" },
  "VUV": { "name": "Vanuatu Vatu" },
  "WST": { "name": "Samoan Tala" },
  "XCD": { "name": "East Caribbean Dollar" },
  "YER": { "name": "Yemeni Rial" },
  "ZAR": { "name": "South African Rand" },
  "ZMW": { "name": "Zambian Kwacha" },
  "ZWG": { "name": "Zimbabwe Gold" }
};

Object.keys(currencies).forEach(code => {
  if (!currencies[code].flag) {
    if (code === "EUR") currencies[code].flag = "eu";
    else if (code === "XCD") currencies[code].flag = "ag";
    else currencies[code].flag = code.substring(0, 2).toLowerCase();
  }
});

function updateFlag(index, currencyCode) {
  const flagCode = currencies[currencyCode]?.flag;
  const img = document.getElementById(flags[index]);
  if (flagCode) {
    img.src = `https://flagcdn.com/24x18/${flagCode}.png`;
    img.style.display = "inline";
  } else {
    img.removeAttribute("src");
    img.style.display = "none";
  }
}

function formatNumber(value) {
  const number = parseFloat(value);
  if (isNaN(number)) return "";

  const locale = navigator.language || "en-US";
  const hasDecimals = !(Math.floor(number) === number);
  return number.toLocaleString(locale, {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2
  });
}

function updateRecentCurrencies(newCode) {
  const recent = JSON.parse(localStorage.getItem("valora_recent")) || [];
  const updated = [newCode, ...recent.filter(code => code !== newCode)].slice(0, 8);
  localStorage.setItem("valora_recent", JSON.stringify(updated));
}

async function populateCurrencySelectors() {
  const sortedCodes = Object.keys(currencies).sort();
  const saved = JSON.parse(localStorage.getItem("valora_config")) || {};
  const recent = JSON.parse(localStorage.getItem("valora_recent")) || [];

  selectors.forEach((id, idx) => {
    const select = document.getElementById(id);
    select.innerHTML = "";

    recent.forEach(code => {
      if (currencies[code]) {
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = `${code} – ${currencies[code].name}`;
        select.appendChild(opt);
      }
    });

    if (recent.length > 0) {
      const separator = document.createElement("option");
      separator.disabled = true;
      separator.textContent = "──────────";
      select.appendChild(separator);
    }

    sortedCodes.forEach(code => {
      if (!recent.includes(code)) {
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = `${code} – ${currencies[code].name}`;
        select.appendChild(opt);
      }
    });

    const value = saved[`slot${idx}`] || ["USD", "EUR", "GBP", "JPY"][idx];
    select.value = value;
    updateFlag(idx, value);
  });

  inputs.forEach((id, idx) => {
    const input = document.getElementById(id);
    if (saved[`value${idx}`]) input.value = saved[`value${idx}`];
  });
}

async function saveSelections() {
  const config = {};
  selectors.forEach((id, i) => config[`slot${i}`] = document.getElementById(id).value);
  inputs.forEach((id, i) => config[`value${i}`] = document.getElementById(id).value);
  localStorage.setItem("valora_config", JSON.stringify(config));
}

function updateTimestamp(timestamp, isStale = false) {
  const el = document.getElementById("timestamp");
  const date = new Date(timestamp);
  const formatted = date.toLocaleString(undefined, {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });

  // Clear existing content
  el.innerHTML = "";

  // Create wrapper div
  const wrapper = document.createElement("div");
  wrapper.className = "timestamp-wrapper";

  // Status icon
  if (hadApiError) {
    const iconImg = document.createElement("img");
    iconImg.src = "warning.png";
    iconImg.className = "status-icon";
    wrapper.appendChild(iconImg);
  } else if (hadSuccess) {
    const iconImg = document.createElement("img");
    iconImg.src = "success.png";
    iconImg.className = "status-icon";
    wrapper.appendChild(iconImg);
  } else {
    const placeholder = document.createElement("span");
    placeholder.className = "status-icon-placeholder";
    wrapper.appendChild(placeholder);
  }

  // Timestamp text
  const textSpan = document.createElement("span");
  textSpan.textContent = `Updated on ${formatted}`;
  wrapper.appendChild(textSpan);

  // Refresh icon
  const refreshImg = document.createElement("img");
  refreshImg.id = "refreshIcon";
  refreshImg.src = "refresh.png";
  refreshImg.title = "Force currency update";
  refreshImg.className = "refresh-icon";
  wrapper.appendChild(refreshImg);

  // Append to DOM
  el.appendChild(wrapper);

  el.style.color = isStale ? "#a33" : "gray";

  const refreshIcon = document.getElementById("refreshIcon");
  if (refreshIcon) {
    refreshIcon.addEventListener("click", async () => {
      if (isRefreshing) return;
      isRefreshing = true;
      refreshIcon.classList.add("spinning");
      hadApiError = false;
      hadSuccess = false;

      if (lastEditedIndex !== null) {
        await convertFrom(lastEditedIndex);
      } else {
        await convertFrom(0);
      }

      isRefreshing = false;
      refreshIcon.classList.remove("spinning");
    });
  }

  const style = document.createElement("style");
  style.textContent = `
    .spinning {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .timestamp-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 18px;
      overflow: hidden;
    }
    .refresh-icon {
      width: 12px;
      height: 12px;
      cursor: pointer;
    }
    .status-icon {
      width: 12px;
      height: 12px;
      flex-shrink: 0;
    }
    .status-icon-placeholder {
      display: inline-block;
      width: 12px;
      height: 12px;
    }
  `;
  document.head.appendChild(style);
}

async function fetchRate(from, to) {
  if (!from || !to) return { rate: null };

  const cacheKey = `valora_rate_${from}_${to}`;
  const now = Date.now();

  try {
    const res = await fetch(`https://hexarate.paikama.co/api/rates/latest/${from}?target=${to}`, { timeout: 8000 });
    const json = await res.json();
    const rate = json?.data?.mid;
    if (!rate) throw new Error("No rate");

    const data = { rate, timestamp: now };
    localStorage.setItem(cacheKey, JSON.stringify(data));
    localStorage.setItem("valora_last_update", JSON.stringify({ timestamp: now }));
    hadApiError = false;
    hadSuccess = true;
    return { ...data, source: "api" };
  } catch {
    hadApiError = true;
    hadSuccess = false;
    const cached = JSON.parse(localStorage.getItem(cacheKey));
    if (cached?.rate) {
      const isStale = now - cached.timestamp > 24 * 60 * 60 * 1000;
      updateTimestamp(cached.timestamp, isStale);
      return { ...cached, source: "cache", isStale };
    }
    return { rate: null };
  }
}

async function convertFrom(index) {
  const base = document.getElementById(selectors[index]).value;
  const baseRaw = document.getElementById(inputs[index]).value;
  const baseValue = parseFloat(baseRaw.replace(/[^0-9.-]/g, ""));
  if (isNaN(baseValue)) return;

  await Promise.all(selectors.map(async (id, i) => {
    if (i !== index) {
      const target = document.getElementById(id).value;
      const result = await fetchRate(base, target);
      if (result.rate) {
        const rawValue = baseValue * result.rate;
        const input = document.getElementById(inputs[i]);
        if (document.activeElement !== input) input.blur();
        input.value = formatNumber(rawValue);
        updateTimestamp(result.timestamp, result.isStale);
      }
    }
  }));

  await saveSelections();
}

function createDragHandles() {
  const containers = document.querySelectorAll(".currency");
  containers.forEach((el, index) => {
    const dragArea = el.querySelector(".drag-area");
    dragArea.setAttribute("draggable", true);
    dragArea.dataset.index = index;

    dragArea.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text/plain", index);
      el.classList.add("dragging");
    });

    dragArea.addEventListener("dragend", () => {
      el.classList.remove("dragging");
    });
  });
}

function saveCurrencyOrder() {
  const order = [...document.querySelectorAll(".currency")].map(el => el.querySelector("select").id);
  localStorage.setItem("valora_order", JSON.stringify(order));
}

function loadCurrencyOrder() {
  const order = JSON.parse(localStorage.getItem("valora_order"));
  if (order?.length === 4) {
    const grid = document.querySelector(".grid");
    const blocks = {};
    order.forEach(id => {
      const block = document.getElementById(id)?.closest(".currency");
      if (block) blocks[id] = block;
    });
    grid.innerHTML = "";
    order.forEach(id => {
      if (blocks[id]) grid.appendChild(blocks[id]);
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await populateCurrencySelectors();
  loadCurrencyOrder();
  createDragHandles();

  const lastUpdate = JSON.parse(localStorage.getItem("valora_last_update"));
  if (lastUpdate?.timestamp) updateTimestamp(lastUpdate.timestamp);

  selectors.forEach((selId, index) => {
    document.getElementById(selId).addEventListener("change", async () => {
      const selected = document.getElementById(selId).value;
      updateRecentCurrencies(selected);

      const currentSelections = selectors.map(id => document.getElementById(id).value);
      await populateCurrencySelectors();

      selectors.forEach((id, idx) => {
        document.getElementById(id).value = currentSelections[idx];
        updateFlag(idx, currentSelections[idx]);
      });

      await saveSelections();
      if (lastEditedIndex !== null) convertFrom(lastEditedIndex);
    });
  });

  const grid = document.querySelector(".grid");

  grid.addEventListener("dragover", e => {
    e.preventDefault();
  });

  grid.addEventListener("drop", e => {
    e.preventDefault();
    const dragging = document.querySelector(".currency.dragging");
    const dropTarget = e.target.closest(".currency");

    if (dragging && dropTarget && dragging !== dropTarget) {
      const children = [...grid.children];
      const fromIndex = children.indexOf(dragging);
      const toIndex = children.indexOf(dropTarget);

      if (fromIndex < toIndex) {
        grid.insertBefore(dragging, dropTarget.nextSibling);
      } else {
        grid.insertBefore(dragging, dropTarget);
      }

      saveCurrencyOrder();
      createDragHandles();
    }
  });

  inputs.forEach((inputId, index) => {
    let typingTimeout;
    const input = document.getElementById(inputId);
    input.addEventListener("input", () => {
      lastEditedIndex = index;
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        convertFrom(index);
      }, 500);
    });

    input.addEventListener("blur", () => {
      const raw = input.value.replace(/[^0-9.-]/g, "");
      input.value = formatNumber(raw);
    });
  });
});