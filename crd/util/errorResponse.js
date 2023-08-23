module.exports = (res) => {
  res.statusCode = 400;
  res.write("no response");
  res.end();
};
