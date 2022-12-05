- outline

Backend

- Create Users model
- Authentication
- Login/Logout
- Register
- Websocket (Channels)
  - xx - Configure a websocket route to individual websockets(using xx - channels to handle websockets)
  - xx - Configure the TCP route
- Create websocket view
  - xx - Create a http route to the chat room
  - xx - Create a http view for the chat room
- Have the back
  - xx - Handle receiver
  - xx - Handle send
  - xx - Handle connect
  - xx - Handle disconnect
  - xx - Handle rejection
  - xx - Adjust the settings
  - xx - Point backend to the channel layer pointing to a port (6379)

Frontnend

- Create a proxy to avoid CORS/CSRF
- Allow for front and back end to communicate on a single port
- Login
  - Send a post request to backend `/api/log_in`
- Register
  - Send a post request to backend `/api/register`
- Logout
  - Send a post request to backend `/api/log_out`

Client

- Be able to see chat history
- Have Redis store chat history and send it to the client

State Management

- xx - User
- Authenticated/Logged-in?
- xx - Registration
- xx - First Name
- xx - Last Name
- xx - Email
- xx - Password

use redux for these or just pull from redis...

- Chat Input Text
- Chat Log
- User text input
- Room Name

Things to Fix!

- Rerendering is causing user to connect to the websocket on every input change

Move all the login/signup/logout functionality out of the pages - call it using redux
