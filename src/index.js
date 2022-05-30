import app from "./app"
app.listen(process.env.PORT || app.get("port"));
console.log("server on port ", process.env.PORT || app.get("port"));
