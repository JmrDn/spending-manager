Expense Tracker

A sleek, mobile-first financial management application built with Vue 3, Vant UI, and Supabase. This app provides real-time tracking of daily expenses with powerful visual analytics.🚀 Key Features1. Intelligent Expense TrackingQuick Entry: Log your purchases with price and quantity in seconds.Secure Storage: All data is synced in real-time to a secure Supabase PostgreSQL database.2. Advanced Visual AnalyticsInteractive Charts: Dynamic bar charts powered by Chart.js visualize your spending habits.No-Data States: Clean, user-friendly placeholders that guide you when no records are available for a selected period.Hourly Breakdown: View exactly when you spend during the day with the hourly daily report.3. Flexible Reporting TiersDaily Reports: Select any specific date to see an hourly breakdown of costs.Weekly Reports: Analyze spending across a fixed 7-day window.Monthly Reports: Review your entire month's performance at a glance using a custom-built Month-Picker UI.4. Smart Date SelectionVant UI Integration: Premium mobile date pickers and wheel pickers for intuitive navigation.Future-Proofing: Disabled future dates to prevent empty reporting for dates that haven't occurred yet.Past History: Fully accessible historical data with customizable minimum date boundaries.5. User ManagementAuthentication: Robust login and signup flows powered by Supabase Auth.Profile Control: Personal dashboard displaying full name, username, and email with a secure logout mechanism.🛠️ Tech StackTechnologyPurposeVue 3 (Composition API)Frontend FrameworkSupabaseBackend, Auth, and DatabaseVant UIMobile-optimized Component LibraryChart.jsData VisualizationJavaScript (ES6+)Logic & Data Processing📦 InstallationClone the repositoryInstall dependencies:Bashnpm install

3.  **Configure Environment:**
    Create a .env file and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_url_here
    VITE_SUPABASE_ANON_KEY=your_key_here
    
Launch the app:Bashnpm run dev

---
