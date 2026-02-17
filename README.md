# Productivity Dashboard

A feature-rich productivity dashboard built with Vanilla JavaScript (ES6+). This application integrates RESTful APIs and LocalStorage to combine task management, time tracking, and environmental data into a single interface.

## 🌟 Key Features

### ✅ Task Management
* **Persistent To-Do List:** Add tasks with an "Important" flag.
* **State Preservation:** Uses `localStorage` to save your pending tasks even after the browser is closed.
* **Task Controls:** Ability to mark items as completed and remove them from the list.

### ⏱️ Time & Focus
* **Pomodoro Timer:** A built-in focus timer alternating between **25-minute Work Sessions** and **5-minute Breaks**. Includes Start, Pause, and Reset controls.
* **Daily Planner:** An interactive hourly schedule (06:00 – 23:00) that saves your inputs locally, allowing you to plan your entire day.

### 🌤️ Data & Inspiration
* **Live Weather Widget:** Displays real-time temperature, humidity, wind speed, and heat index (powered by WeatherAPI).
* **Dynamic Backgrounds:** Changes the header background image based on the time of day (Day/Night).
* **Daily Motivation:** Fetches a unique motivational quote and author dynamically upon loading (powered by API Ninjas).
* **Real-Time Clock:** Displays the current day, date, and time down to the second.

## 🛠️ Technologies Used

* **Core:** HTML5, CSS3, Vanilla JavaScript (ES6+).
* **Data Persistence:** Browser `localStorage` API for the To-Do list and Planner.
* **Asynchronous Operations:** `async/await` and `Fetch API` for handling network requests.
* **External APIs:**
    * WeatherAPI (Current weather conditions).
    * API Ninjas (Quotes).
    * Unsplash Source (Dynamic images).
