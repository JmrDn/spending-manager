# Expense Tracker

A sleek, mobile-first financial management application built with Vue 3, Vant UI, and Supabase.  
This app provides real-time tracking of daily expenses with powerful visual analytics.

---

# 🚀 Key Features

## 1. Intelligent Expense Tracking

- **Quick Entry** — Log your purchases with price and quantity in seconds.
- **Secure Storage** — All data is synced in real-time to a secure Supabase PostgreSQL database.

---

## 2. Advanced Visual Analytics

- **Interactive Charts** — Dynamic bar charts powered by Chart.js visualize your spending habits.
- **No-Data States** — Clean, user-friendly placeholders that guide you when no records are available for a selected period.
- **Hourly Breakdown** — View exactly when you spend during the day with the hourly daily report.

---

## 3. Flexible Reporting Tiers

### Daily Reports
Select any specific date to see an hourly breakdown of costs.

### Weekly Reports
Analyze spending across a fixed 7-day window.

### Monthly Reports
Review your entire month's performance at a glance using a custom-built Month-Picker UI.

---

## 4. Smart Date Selection

- **Vant UI Integration** — Premium mobile date pickers and wheel pickers for intuitive navigation.
- **Future-Proofing** — Disabled future dates to prevent empty reporting for dates that haven't occurred yet.
- **Past History** — Fully accessible historical data with customizable minimum date boundaries.

---

## 5. User Management

- **Authentication** — Robust login and signup flows powered by Supabase Auth.
- **Profile Control** — Personal dashboard displaying full name, username, and email with a secure logout mechanism.

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Vue 3 (Composition API) | Frontend Framework |
| Supabase | Backend, Auth, and Database |
| Vant UI | Mobile-optimized Component Library |
| Chart.js | Data Visualization |
| JavaScript (ES6+) | Logic & Data Processing |

---

# 📦 Installation

## 1. Clone the repository

```bash
git clone https://github.com/JmrDn/spending-manager.git
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
```

---

## 4. Launch the application

```bash
npm run dev
```

---

# 📱 Built With

- Vue 3
- Vant UI
- Supabase
- Chart.js

---

# 📄 License

This project is licensed under the MIT License.