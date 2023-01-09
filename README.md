# Chat App

Welcome to Chat App, a simple chat application built using React, Redux, and Django Channels. This application is designed for organizations to create channels and invite users to communicate in those channels. It is a personal project to learn about websockets and Django Channels.

## Features

- Chat with other users in real-time using websockets.
- View message history.
- User authentication with Django Rest Framework.
- Organize channels and invite users to communicate in those channels.
- PostgreSQL database to hold user, channel, and organization information.
- Redis server to hold chat logs and user connections detail.

## Technologies

Chat App is built using the following technologies:

- React
- Redux
- Django
- Django Channels
- Django Rest Framework
- PostgreSQL
- Redis

## General Overview

Django Channels, Redis, and websockets to facilitate real-time communication in a chat application:

1. The client (e.g., a web browser) sends an HTTP request to the Django server to load the chat application page.
2. The Django server returns the HTML, JavaScript, and other assets needed to render the chat application page in the client's web browser.
3. The client's web browser renders the chat application page and executes the JavaScript code.
4. The JavaScript code establishes a websocket connection to the Django server by sending a websocket upgrade request over the same HTTP connection used to load the chat application page.
5. The Django server accepts the websocket upgrade request and establishes a websocket connection with the client.
6. Django Channels stores the connection details (e.g., the connection identifier and the connection object) for the client in Redis.
7. The client and the Django server can now communicate with each other through the websocket connection in real-time.
8. When the client sends a message to the server (e.g., by typing in a chat input field and clicking "send"), the message is sent to the Django server through the websocket connection.
9. Django Channels receives the message and sends it to Redis.
10. Redis broadcasts the message to all connected clients, including the original client and any other clients that are connected through websockets.
11. The clients' React components update in real-time to display the new message.

## Installation

To install Chat App on your own machine, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install` or `yarn install`.
3. Set up the backend by following the instructions in the `backend` section.
4. Set up the frontend by following the instructions in the `frontend` section.
5. Run the development server using `npm start` or `yarn start`.

## Backend Installation

- COMING SOON

## Frontend Installation

- COMING SOON

## Deployment

- COMING SOON

## Future Features

- Encrypt messages for added security.
- Allow user-to-user direct communication.
- Add a thread section for organized conversations.
- Allow organizations to make announcements to chats.
- Allow more flexibility for organizations to display information.

## Further Help

If you have any questions or need further assistance, feel free to contact me at Samuel.Daehan@gmail.com.
