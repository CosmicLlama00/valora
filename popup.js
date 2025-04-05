// popup.js - Valora Currency Converter (com proteção contra target vazio)

const selectors = ["currency1", "currency2", "currency3", "currency4"];
const inputs = ["value1", "value2", "value3", "value4"];
const flags = ["flag1", "flag2", "flag3", "flag4"];
let lastEditedIndex = null;

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

// Adicionar bandeiras com base no código da moeda
Object.keys(currencies).forEach(code => {
  if (!currencies[code].flag) {
    if (code === "EUR") currencies[code].flag = "eu";
    else if (code === "XCD") currencies[code].flag = "ag";
    else if (code === "XAF") currencies[code].flag = "cm";
    else if (code === "XOF") currencies[code].flag = "sn";
    else if (code === "XPF") currencies[code].flag = "pf";
    else if (["XDR", "SLE", "UYW", "VED", "ZWG"].includes(code)) {
      delete currencies[code].flag;
    } else {
      currencies[code].flag = code.substring(0, 2).toLowerCase();
    }
  }
});

function getRecentCodes() {
  try {
    return JSON.parse(localStorage.getItem("valora_recent_codes")) || [];
  } catch {
    return [];
  }
}

function updateRecentCodes(code) {
  let recent = getRecentCodes().filter(c => c !== code);
  recent.unshift(code);
  if (recent.length > 8) recent = recent.slice(0, 8);
  localStorage.setItem("valora_recent_codes", JSON.stringify(recent));
}

async function saveCurrencySelections() {
  const config = {};
  selectors.forEach((id, idx) => {
    config[`slot${idx}`] = document.getElementById(id).value;
  });
  inputs.forEach((id, idx) => {
    config[`value${idx}`] = document.getElementById(id).value;
  });
  localStorage.setItem("valora_fallback_selected", JSON.stringify(config));
  if (storage) await storage.local.set({ valora_selected: config });
}

async function loadCurrencySelections() {
  let result = {};
  if (storage) {
    result = await new Promise(resolve => {
      storage.local.get("valora_selected", resolve);
    });
    if (result.valora_selected) return result.valora_selected;
  }
  try {
    return JSON.parse(localStorage.getItem("valora_fallback_selected")) || {};
  } catch {
    return {};
  }
}

async function populateCurrencySelectors() {
  const sortedCodes = Object.keys(currencies).sort();
  const recent = getRecentCodes();
  const savedConfig = await loadCurrencySelections();

  selectors.forEach((id, idx) => {
    const select = document.getElementById(id);
    select.innerHTML = "";

    recent.forEach(code => {
      if (currencies[code]) {
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = `${code} – ${currencies[code].name}`;
        opt.dataset.recent = "true";
        select.appendChild(opt);
      }
    });

    if (recent.length) {
      const sep = document.createElement("option");
      sep.disabled = true;
      sep.textContent = "──────────";
      select.appendChild(sep);
    }

    sortedCodes.forEach(code => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = `${code} – ${currencies[code].name}`;
      select.appendChild(opt);
    });

    const defaultCodes = ["USD", "EUR", "GBP", "JPY"];
    const fallback = defaultCodes[idx] || sortedCodes[0];

    const currentValue = savedConfig[`slot${idx}`];
    select.value = currentValue && [...select.options].some(o => o.value === currentValue)
      ? currentValue : fallback;

    updateFlag(idx, select.value);
  });

  inputs.forEach((id, idx) => {
    const input = document.getElementById(id);
    const savedVal = savedConfig[`value${idx}`];
    if (savedVal !== undefined) input.value = savedVal;
  });
}

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

function updateTimestamp(date, isStale = false) {
  const formatted = new Date(date).toLocaleString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  const el = document.getElementById("timestamp");
  el.textContent = `Updated on ${formatted}`;
  el.style.color = isStale ? "#a33" : "gray";
}

async function fetchRate(base, target) {
  if (!base || !target) return { rate: null };
  const key = `${base}_${target}`;
  try {
    const res = await fetch(`https://hexarate.paikama.co/api/rates/latest/${base}?target=${target}`);
    const data = await res.json();
    if (!data || data.status_code !== 200) throw new Error("API error");
    const rate = data.data.mid;
    if (storage) await storage.local.set({ [key]: { rate, timestamp: Date.now() } });
    return { rate, source: "api", timestamp: Date.now() };
  } catch (err) {
    if (!storage) return { rate: null };
    const cached = await new Promise(resolve => {
      storage.local.get(key, resolve);
    });
    if (cached && cached[key]) {
      return { rate: cached[key].rate, source: "cache", timestamp: cached[key].timestamp };
    } else {
      return { rate: null };
    }
  }
}

async function convertFrom(index) {
  const fromCurrency = document.getElementById(selectors[index]).value;
  const fromValue = parseFloat(document.getElementById(inputs[index]).value);
  if (isNaN(fromValue)) return;

  const promises = selectors.map(async (selId, i) => {
    if (i !== index) {
      const toCurrency = document.getElementById(selId).value;
      const result = await fetchRate(fromCurrency, toCurrency);
      if (result.rate !== null) {
        const converted = (fromValue * result.rate).toFixed(toCurrency === "JPY" ? 0 : 2);
        document.getElementById(inputs[i]).value = converted;

        const isStale = result.source === "cache" &&
          (Date.now() - result.timestamp > 86400000);

        updateTimestamp(result.timestamp, isStale);

        // salva a data da última conversão
        localStorage.setItem("valora_last_update", JSON.stringify({
          timestamp: result.timestamp
        }));
      }
    }
  });

  await Promise.all(promises);
  await saveCurrencySelections();
}

document.addEventListener("DOMContentLoaded", async () => {
  await populateCurrencySelectors();

  // restaura timestamp salvo
  try {
    const savedUpdate = JSON.parse(localStorage.getItem("valora_last_update"));
    if (savedUpdate?.timestamp) {
      const isStale = (Date.now() - savedUpdate.timestamp > 86400000);
      updateTimestamp(savedUpdate.timestamp, isStale);
    }
  } catch (e) {
    console.warn("Failed to load last update timestamp");
  }

  selectors.forEach((selId, index) => {
    const select = document.getElementById(selId);
    select.addEventListener("change", async () => {
      const selected = select.value;
      updateFlag(index, selected);
      updateRecentCodes(selected);
      await saveCurrencySelections();
      if (lastEditedIndex !== null) convertFrom(lastEditedIndex);
    });
  });

  inputs.forEach((inputId, index) => {
    document.getElementById(inputId).addEventListener("input", async () => {
      lastEditedIndex = index;
      await saveCurrencySelections();
      convertFrom(index);
    });
  });

  // ⚠️ Don't convert automatically on popup open.
// Conversion will happen only when user interacts again (input or dropdown).
// This prevents flickering and overwriting the last entered value.
// lastEditedIndex remains null until user types or changes dropdown.
});