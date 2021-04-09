const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({
    "code": 0,
    "message": "success",
    "resources": {
      "account_url": `http://localhost:${port}/accounts`
    }
  })
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})

app.delete('/user', (req, res) => {
  res.send('Got a DELETE request at /user')
})

app.listen(port, () => {
  console.log(`Transactions App listening at http://localhost:${port}`)
})
