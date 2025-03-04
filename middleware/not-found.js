const notFound = (req, res) =>
  res
    .status(404)
    .send(
      '<h1>Route does not exist</h1><a href="http://localhost:3000">Go back to Home</a>'
    );

module.exports = notFound;
