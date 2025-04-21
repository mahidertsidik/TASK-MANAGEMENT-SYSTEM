# Tasky - Your Smart Task Management System

Welcome to **Tasky**!

Tasky is a modern, user-friendly task management platform designed for both teams and individuals. Whether you’re a project manager, a developer, a student, or just someone who wants to stay organized, Tasky helps you manage projects, assign tasks, track deadlines, and collaborate efficiently—all in one place.

---

## Why Tasky?

- **Stay Organized:** Easily create projects and break them down into manageable tasks.
- **Collaborate Seamlessly:** Assign tasks to team members, track progress, and never miss a deadline.
- **Simple for Everyone:** Intuitive design for non-technical users, powerful tools for tech-savvy teams.
- **Notifications:** Get reminders for upcoming deadlines and important updates.

---

## Key Features

- **User Authentication:** Secure login and registration (JWT-based)
- **Project Management:** Create, view, update, and delete projects
- **Task Tracking:** Organize tasks by status (To Do, In Progress, Done)
- **Assignments:** Assign tasks to yourself or teammates
- **Deadline Tracking:** Stay on top of due dates
- **Notifications:** Receive basic notifications in-app or by email
- **Team Management:** Manage your team and projects in one place

---

## Tech Stack (for Developers)

- **Frontend:** React.js (with Material-UI)
- **Backend:** Node.js (Express.js)
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)

---

## Project Structure

```
/tasky
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── utils/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── utils/
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation (for Developers)

1. **Clone the repository:**

   ```sh
   git clone [https://github.com/mahidertsidik/TASK-MANAGEMENT-SYSTEM]
   cd Tasky
   ```

2. **Install backend dependencies:**

   ```sh
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```sh
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**

   - Copy `.env.example` to `.env` in both `backend` and `frontend` folders and update the values as needed.

5. **Start the app:**

   - In one terminal, start the backend:
     ```sh
     cd backend
     npm run dev
     ```
   - In another terminal, start the frontend:
     ```sh
     cd frontend
     npm run dev
     ```

6. **Open your browser:**
   - Visit `http://localhost:3000` to use Tasky!

---

## How to Use Tasky

1. **Sign up or log in** to your account.
2. **Create a new project** and add tasks.
3. **Assign tasks** to yourself or teammates.
4. **Track progress** by updating task statuses.
5. **Get notified** about deadlines and updates.

Tasky is designed to be intuitive—just explore the interface and start organizing your work!

---

## Contributing & Support

We welcome contributions! If you’d like to report a bug, request a feature, or contribute code, please open an issue or submit a pull request on [GitHub](https://github.com/mahidertsidik/Tasky).

For questions or support, feel free to contact the maintainer via GitHub or email.

---

**Let’s get things done, together!**
