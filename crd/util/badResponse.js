module.exports = (res) => {
    res.statusCode = 500;
    res.write("Internal Server Error");
    res.end();
  };
  