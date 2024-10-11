# Kanji Teacher Frontend

Welcome to the **Kanji Teacher Frontend**! This application is a **React** and **Vite** project, designed to provide a seamless user experience for learning Japanese Kanji. The frontend utilizes **React Router** for navigation, **Firebase** for authentication, and manages state using context providers. This README provides an overview of how the application is set up, its core components, and how to get started.

This frontend requires a running version of the backend, which can be found at [Kanji Teacher Backend](https://github.com/JohnB08/Kanji-Teacher-Backend).

## Table of Contents

1. [Getting Started](#getting-started)
2. [Environment Variables](#environment-variables)
3. [Project Structure](#project-structure)
4. [Core Components](#core-components)
5. [Running the Application](#running-the-application)
6. [Deployment](#deployment)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v16 or later recommended)
- [Vite](https://vitejs.dev/guide/) (bundler)
- [Firebase Project](https://firebase.google.com/)

### Installation

1. Clone the repository.
   ```sh
   git clone <repo-url>
   cd kanji-teacher-frontend
   ```
2. Install dependencies.
   ```sh
   npm install
   ```
3. Configure environment variables as per the **Environment Variables** section below.

## Environment Variables

It is recommended to set up two `.env` files: one for development and one for production. In development, you can use an external backend server (e.g., `https://kanji-teacher-backend.onrender.com`), while in production, the frontend can be hosted in the `wwwroot` of the backend, resulting in different API call endpoints.

Create a `.env` file in the root directory with the following variables:

- **VITE_SERVER_ENDPOINT**: URL of your backend server (e.g., `https://kanji-teacher-backend.onrender.com`).

These environment variables are used to connect to the backend for data and authentication.

## Project Structure

The main project structure looks as follows:

```
kanji-teacher-frontend/
├── public/
│   └── index.html
├── src/
│   ├── Components/
│   │   ├── AnswerButtons/
│   │   │   └── AnswerButtons.tsx
│   │   ├── KanjiDisplayer/
│   │   │   └── KanjiDisplayer.tsx
│   │   ├── Navbar/
│   │   │   └── Navbar.tsx
│   │   └── SignoutButton/
│       └── SignoutButton.tsx
│   ├── pages/
│   │   ├── home/
│   │   │   └── Home.tsx
│   │   ├── Login/
│   │   │   └── Login.tsx
│   │   ├── FlashCard/
│   │   │   └── FlashCard.tsx
│   │   ├── Profile/
│   │   │   └── Profile.tsx
│   │   └── KanjiTest/
│       └── KanjiTest.tsx
│   ├── Router/
│   │   └── Router.tsx
│   ├── Wrappers/
│   │   ├── FirebaseWrapper/
│   │   │   ├── FirebaseWrapper.tsx
│   │   │   └── FirebaseContext.tsx
│   │   └── KanjiDataWrapper/
│       ├── KanjiDataWrapper.tsx
│       └── KanjiContextProvider.tsx
│   ├── index.css
│   └── main.tsx
└── package.json
```

## Core Components

### 1. **Firebase Authentication Wrapper**

The **FirebaseWrapper** (`FirebaseWrapper.tsx`) manages authentication with Firebase. The `AuthProvider` provides the following context to components:

- **user**: Current logged-in user or `null`.
- **loadingUser**: Boolean indicating whether user data is loading.
- **login, logout, signup, signInWithGoogle**: Functions for user authentication.

```tsx
const { user, login, logout, signup, signInWithGoogle } = useAuth();
```

This allows components to manage login state, perform actions, and display UI accordingly.

### 2. **Kanji Data Context**

The **KanjiDataWrapper** (`KanjiDataWrapper.tsx`) is responsible for fetching and managing Kanji data. It provides methods to:

- **getFlashCardData**: Fetch new flashcard data.
- **validateAnswer**: Validate user input against the correct Kanji.
- **fetchUserStats**: Fetch user progress and stats.

The `KanjiContext` also provides data to render flashcards, including:

- **displayData**: FlashCard currently being displayed.
- **resultData**: Result of user interaction with a flashcard.
- **userStats**: User statistics on learning progress.

```tsx
const { displayData, getFlashCardData, validateAnswer } = useKanji();
```

### 3. **Router Setup**

The **Router** (`Router.tsx`) is set up using **React Router**. The main routes include:

- **Home** (`/`): The landing page with a choice to start or log in.
- **Login** (`/login`): User login and signup form.
- **FlashCard** (`/FlashCard`): Displays a flashcard and related answers.
- **Profile** (`/Profile`): Displays user stats.
- **KanjiTest** (`/KanjiTest`): Allows users to take a trial test without authentication.

### 4. **Home Component**

The **Home** component provides options to log in, start lessons, or try out Kanji without an account. It is the starting point of the application.

### 5. **Other Components**

- **AnswerButtons**: Displays multiple answer options for flashcards.
- **KanjiDisplayer**: Displays the current Kanji character, On-readings, and Kun-readings.
- **SignoutButton**: Allows users to sign out of their account.
- **Navbar**: Provides navigation links for the application.

## Running the Application

To start the development server, run:

```sh
npm run dev
```

Vite will start the application at `http://localhost:5173` by default.

### Building for Production

To build the project for production, run:

```sh
npm run build
```

This will create a `dist` folder containing the optimized production build.

### Previewing Production Build

To preview the built app locally:

```sh
npm run preview
```

## Deployment

For deployment, the production build can be served using any static file server or web hosting service. You may also use cloud hosting platforms such as **Netlify**, **Vercel**, or **Render** to deploy your frontend.

Ensure your `.env` variables are correctly configured before deploying the production build.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Feel free to fork the repository and submit pull requests for any improvements. Contributions are always welcome!

## Contact

For questions or support, please reach out to the project maintainer.

