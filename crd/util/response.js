module.exports = (res,data)=>{

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(data)); // Use the data variable here
    res.end();

}