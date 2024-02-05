const PORT = process.env.PORT || 3001
const app = require('./index')

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});