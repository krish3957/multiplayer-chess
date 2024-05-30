
# Multiplayer Chess Game
This project is a multiplayer chess game where two random users can play against each other. It consists of a server and a client, each in its own folder.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (project version : v20.11.0)
- npm (project version: 10.2.4)

### Cloning the Repository

1. **Clone the repository:**

   ```bash
   git clone https://github.com/krish3957/multiplayer-chess.git
   ```bash

2. **Navigate to the project directory:**

   ```bash
   cd multiplayer-chess
   ```bash

### Server Setup

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Build the TypeScript files:**

   ```bash
   tsc -b
   ```

4. **Run the server:**

   ```bash
   node dist/index.js
   ```

   This will start the WebSocket server on `ws://localhost:8080/`.
   

### Client Setup

1. **Navigate to the client directory:**

   ```bash
   cd client```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the client:**

   ```bash
   npm run dev
   ```

   This will start the client side of the application.

## How to Play

1. Open `http://localhost:5173/game` in two different browser windows or tabs.
2. Enter your name in both windows.
3. Click the "Play" button in both windows.
4. Start playing the game.

## Note

This project is still under development and is not yet production-ready. Contributions and feedback are welcome!

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.
