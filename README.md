# 💱 Valora – Simple Currency Converter (Browser Extension)

**Valora** is a lightweight, privacy-focused browser extension that lets you convert between currencies using live exchange rates from **HexaRate**. Designed for simplicity, speed, and clarity.

## ✨ Features

- Convert between **4 currencies simultaneously**
- Supports **all available currencies** via HexaRate API (170+)
- Real-time exchange rates with **timestamp display**
- **Drag and drop** support to reorder currency blocks
- Saves your **recent selections** and **input values**
- **Quick access** to the 6 most recently used currencies in each dropdown
- Dropdown lists **sorted alphabetically by currency code**
- **Offline fallback**: uses last fetched rate if API is down
- Highlights outdated rates (24h+) in **dark red**
- Fully compatible with **Chrome** and **Firefox**
- No tracking, no analytics, no external libraries

## 🖼 Interface

The extension opens as a popup with 4 blocks:
- Each block lets you select a currency, input a value, and see automatic conversions.
- A refresh button manually updates exchange rates.
- Icons indicate **success**, **warning (stale)** or **error** states visually.

## 📁 File Structure

| File            | Description                                 |
|------------------|---------------------------------------------|
| `popup.html`     | The extension UI layout                     |
| `popup.js`       | All interactivity and logic                 |
| `manifest.json`  | Extension manifest for Chrome/Firefox       |
| `logo.png`       | Logo used in store and popup header         |
| `icon-16.png`    | 16px icon for browser toolbar               |
| `icon-32.png`    | 32px icon                                   |
| `icon-48.png`    | 48px icon                                   |
| `icon-96.png`    | 96px icon for installation screens          |
| `refresh.png`    | Refresh icon for manual update              |
| `success.png`    | Success state icon (fresh rate)             |
| `warning.png`    | Warning icon (rate older than 24h)          |
| `kofi_button.png`| A kofi button :)                            |
| `README.md`      | This readme file                            |

> ℹ️ The extension **does not require a backend server**, and all currency logic is client-side.

## 🧪 How to install locally

### Chrome

1. Open `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **"Load unpacked"**
4. Select this project’s folder

### Firefox

1. Open `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on"**
3. Select the `manifest.json` file

## 🔐 Privacy

Valora stores only local preferences and never sends or stores personal data. No analytics, no cookies, no tracking.

## 📝 License

This project is licensed under the [GNU GPL v3](./LICENSE). You are free to use, study, modify, and redistribute it under the same license.

---

Crafted with ❤️ for clarity and control.
