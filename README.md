# REACT HOOK

## Instructions

*Make sure MongoDB service is running.*

The *config* folder contains a file named *db.js*. Before running locally, change the value of db as seen in the code below.
```js
module.exports = {
  db: 'mongodb://localhost/react-hook'
};
```

For the **back-end**, install the dependencies once via the terminal.
```bash
npm install
```

Run the *main server*. It listens on port 3000.
```bash
CORS=1 node server
```

<br>

If you want to configure the **front-end**, go to *react-src* folder via the terminal.

```bash
cd react-src
```

Install the dependencies required by React once.
```bash
npm install
```

Run the *development server* for React. It listens on port 4200.
```bash
npm start
```

## License
* [MIT](LICENSE)
