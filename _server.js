const express = require('express');
const serveStatic = require('serve-static');
const port = process.env.PORT || 5000;

app = express();
app.use(serveStatic(__dirname));

app.listen(process.env.PORT || port, () => {
  console.log("Express server listening on port", port);
});
