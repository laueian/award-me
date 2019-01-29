const express = require('express');
const bodyParser = require('body-parser');
const graphqlHTTP = require('express-graphql')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const schema = require('./schema')
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use('', (req,res) => {
    res.send('Hello')
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));