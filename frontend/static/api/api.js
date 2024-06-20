const app = require('express')();
const PORT = 8080;

app.get('/hello', (req, res) => {
    res.status(200).send({
        hello: "hello",
        world: "world"
    })
});

app.listen(
    PORT,
    () => console.log(`its alive on http://localhost:${PORT}`)
)

