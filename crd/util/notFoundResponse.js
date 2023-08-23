module.exports = (res) => {
    res.statusCode = 404;
    res.write("Not Found");
    res.end();
  };