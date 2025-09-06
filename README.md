
# LoginForm React App

A simple, responsive Login and Signup React application with **custom logos** and basic local storage authentication. Built using React, React Router, and modular components.

---

## Features

- **Login Page**  
  - Custom login logo instead of text header  
  - Username and password authentication  
  - Error messages for invalid username or password  
  - "Forgot Password?" functionality  

- **Signup Page**  
  - Custom signup logo instead of text header  
  - Form fields: First Name, Last Name, Email, Password, Confirm Password  
  - Password match validation  
  - Stores user data in local storage  

- **Forgot Password**  
  - Reset password flow with username or email verification  
  - Two-step process: verify account → reset password  

- **Home Page**  
  - Welcome user with personalized message  
  - Logout functionality  

- **Responsive and clean UI**  
  - Uses modular `InputField` component  
  - Supports logo images for a more graphical interface  

---

## Screenshots

**Login Page**  
![Login](public/login.png)

**Signup Page**  
![Signup](public/signup.png)

**Home Page**  
![Home](public/bg.jpg)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/shrinivashunnur08/LoginForm.git
cd LoginForm
```

2. Install dependencies:

```bash
npm install
```

3. Run the app:

```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder Structure

```
LoginForm/
├─ public/
│  ├─ login-logo.png
│  ├─ signup-logo.png
│  └─ bg.jpg
├─ src/
│  ├─ components/
│  │  ├─ InputField.jsx
│  │  └─ SocialLogin.jsx
│  ├─ App.jsx
│  └─ index.css
├─ package.json
└─ README.md
```

---

## Technologies Used

- React 18+  
- React Router DOM  
- JavaScript (ES6+)  
- CSS for styling  
- Local Storage for basic authentication  

---

## Usage

1. **Sign Up**: Create an account using first name, last name, email, and password.  
2. **Login**: Log in with the generated username and password.  
3. **Forgot Password**: Reset your password if you forget it.  
4. **Home**: See a personalized welcome message and logout.  

---

## License

This project is open source and available under the **MIT License**.
