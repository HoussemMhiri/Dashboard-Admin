# MPLS/IP Backbone Admin Dashboard

This project is an admin dashboard that automates the deployment and configuration of network services related to MPLS/IP backbone. The frontend and user interface aspects of this project were developed using Vue.js, with Firebase providing the backend services.

## Features

- **User-Friendly Interface:** Built with Vue.js and Bootstrap for intuitive navigation and control of network services.
- **Firebase Integration:** Utilized Firebase for authentication, database management, and real-time updates.
- **Real-Time Data Visualization:** Display network statistics using Chart.js.
- **State Management:** Efficient state management across the application using Pinia.

## Tech Stack

- **Vue.js:** For building the user interface.
- **Firebase:** For backend services, including authentication and database management.
- **Bootstrap:** For responsive UI design.
- **Pinia:** For state management within Vue.js.
- **Chart.js:** For data visualization.

## Installation

### Prerequisites

- Node.js & npm

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/HoussemMhiri/Dashboard-Admin.git
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    - Create a `.env` file in the root directory.
    - Add your Firebase configuration details.

    ```env
    VUE_APP_FIREBASE_API_KEY=your_firebase_api_key
    VUE_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VUE_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
    VUE_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VUE_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VUE_APP_FIREBASE_APP_ID=your_firebase_app_id
    ```

4. **Run the development server:**

    ```bash
    npm run dev
    ```

5. **Access the app:** Open your browser and go to `http://localhost:5173`.

## Usage

- **Dashboard:** Manage and visualize network services related to the MPLS/IP backbone.
- **Authentication:** Secure login using Firebase authentication.
- **Statistics:** View real-time network data with interactive charts.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any ideas.

## Contact

For any inquiries, feel free to reach out to me at houssemmhiri95@gmail.com.
