# Synagogue Website

This is a website for a synagogue built using [Create React App](https://github.com/facebook/create-react-app) and [Firebase](https://firebase.google.com/).

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/synagogue-website.git
   ```

2. Navigate to the project directory:

   ```bash
   cd synagogue-website
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

### Firebase Configuration

You will need to initialize Firebase for this project. Follow these steps:

1. Set up your own Firebase project by visiting the [Firebase Console](https://console.firebase.google.com/).
   
2. Check the GitHub Wiki for detailed instructions on what to configure in Firebase, including the specific services needed (e.g., Authentication, Firestore, Hosting). 

3. Ensure your Firebase configuration is stored in environment variables. Add a `.env` file in the root of your project with the following content:

   ```bash
   REACT_APP_API_KEY=your-firebase-api-key
   REACT_APP_AUTH_DOMAIN=your-firebase-auth-domain
   REACT_APP_PROJECT_ID=your-firebase-project-id
   REACT_APP_STORAGE_BUCKET=your-firebase-storage-bucket
   REACT_APP_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   REACT_APP_APP_ID=your-firebase-app-id
   ```

   The Firebase API keys and other sensitive information are stored as GitHub Secrets for security purposes.

### Running the App

To run the development server:

```bash
npm start
```

The app will be available at `http://localhost:3000`.

### Building the App

To create an optimized production build:

```bash
npm run build
```

The build will be stored in the `build` folder.

### Deployment

The website is deployed using Firebase Hosting. To deploy the app:

1. Ensure you have initialized Firebase Hosting for your project by running:

   ```bash
   firebase init hosting
   ```

2. Log in to Firebase:

   ```bash
   firebase login
   ```

3. Deploy to Firebase:

   ```bash
   firebase deploy
   ```

## License

This project is licensed under the MIT License.
