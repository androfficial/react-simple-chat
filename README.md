# Socket Chat

A real-time chat with rooms: enter a room number and a name, see who is online and exchange messages with everyone in the room. Built in October 2021 as a learning project.

## Features

- Join form validated with Formik and Yup: the room ID must be a number and the name 2 to 12 characters long, and the button stays disabled until both are valid.
- Joining loads the room's users and message history from the server. New messages and changes to the user list arrive through Socket.IO.
- Sidebar with the room ID and the online users with their count.
- The current user's messages are labelled "Me", and the list scrolls to the newest message.
- Enter sends a message and Shift+Enter adds a line break; a message can be up to 30 characters long.
- Leave Room returns to the join form, and users who leave or disconnect drop off the list for everyone else.
- Material UI fields and buttons, SimpleBar scrollbars and an animated gradient background.

## Tech stack

- **Framework:** React 17
- **State:** React `useReducer` and context
- **Data:** Axios 0.23, Socket.IO client 4
- **UI:** Material UI 5, SimpleBar
- **Styling:** SCSS with CSS modules (node-sass 6)
- **Forms:** Formik 2, Yup 0.32
- **Backend:** Node.js, Express 4, Socket.IO 4
- **Tooling:** Create React App 4, nodemon 2

## Getting started

You need Node.js 14 or 16 (node-sass 6 does not support newer versions) and Yarn 1.

```bash
git clone https://github.com/androfficial/react-socket-chat.git
cd react-socket-chat
yarn install
yarn server
```

Then start the client in a second terminal:

```bash
yarn start
```

`yarn server` runs the Express and Socket.IO server on port 9999. `yarn start` runs the React dev server at http://localhost:3000, which forwards the `/rooms` requests and the Socket.IO connection to port 9999 through the `proxy` field in `package.json`. To use a single port, run `yarn build`, then `yarn server`, and open http://localhost:9999: the server also serves the built client from `build/`.

| Variable | Purpose |
| --- | --- |
| `PORT` | Port of the Express and Socket.IO server; 9999 when not set, which is also the port the dev proxy targets |

## Scripts

| Command | Description |
| --- | --- |
| `yarn start` | Starts the React dev server on port 3000 |
| `yarn server` | Starts `server.js` with nodemon, which restarts it on file changes |
| `yarn build` | Builds the client into `build/` |

## Project structure

```text
server.js              Express and Socket.IO server: rooms API, socket events, static build/
src/
  api/                 Axios requests that create and load rooms
  components/          JoinForm, Chat, Header, Users, User, Messages, Message and PostingForm
  context/             React context shared by the chat components
  scss/                global styles, reset, mixins and the gradient keyframes
  socket/              Socket.IO client and event names
  state/               chat reducer and action creators
  validationSchemes/   Yup schemas for the join form and the message field
  App.js               join and chat screens, socket listeners
```

## Notes

- The server keeps rooms, users and messages in memory, so they are lost when it restarts.
- The REST part is `POST /rooms` (create a room) and `GET /rooms/:id` (users and messages). Socket.IO carries the `ROOM:JOIN`, `ROOM:LEAVE`, `ROOM:NEW_MESSAGE` and `ROOM:SET_USERS` events, and the server sends each change only to the other users in the room.
- The `Procfile` (`web: node server.js`) is left from a Heroku deployment. There is no live demo.
