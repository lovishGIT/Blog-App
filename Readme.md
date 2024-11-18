# Blog App

## Description
The Blog App is a web application that allows users to create, edit, and delete blog posts. Users can also view posts created by others and leave comments.

## Features
- User authentication and authorization
- Create, edit, and delete blog posts
- View all blog posts
- Comment on blog posts
- Responsive design

## Technologies Used
- Frontend: HTML, CSS, JavaScript, React
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/blog-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd blog-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables:
    - Create a `.env` file in the root directory
    - Add the following variables:
        ```
        PORT=5000
        JWT_SECRET=your_jwt_secret
        ```
5. Set up firebase:
    - Create a new project on Firebase
    - Add a web app to the project
    - Copy the Firebase configuration object
    - Create a `firebase.js` file in the `src` directory
    - Add the following code to the src/config/firebaseConfig.json file:
        ```javascript
        {
            "apiKey": 'your_api_key',
            "authDomain": 'your_auth_domain',
            "projectId": 'your_project_id',
            "storageBucket": 'your_storage_bucket',
            "messagingSenderId": 'your_messaging_sender_id',
            "appId": 'your_app_id'
        };
        ```
    - Add the following Code to src/config/serviceAccount.json file:
        ```javascript
        {
            "type": "service_account",
            "project_id": "your_project_id",
            "private_key_id": "your_private_key_id",
            "private_key": "your_private_key",
            "client_email": "your_client_email",
            "client_id": "your_client_id",
            "auth_uri": "your_auth_uri",
            "token_uri": "your_token_uri",
            "auth_provider_x509_cert_url": "your_auth_provider_x509_cert_url",
            "client_x509_cert_url": "your_client_x509_cert_url"
        }
        ```

## Usage
1. Start the development server:
    ```bash
    npm start
    ```
2. Open your Postman and hit `http://localhost:5000`

## Contributing
Contributions are welcome! Please fork the repository and create a pull request.

## License
This project is licensed under the MIT License.