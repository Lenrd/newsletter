// imports
const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")

//instance
const app = express()

//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

//routes
app.get('/', (req, res) => {
     res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res) => {
     const firstName = req.body.firstName
     const lastName = req.body.lastName
     const email = req.body.email

     const data = {
          members: [{
               email_address: email,
               status: "subscribed",
               merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName 
               }
          }]
     }

     const jsonData = JSON.stringify(data)

     options = {
          url: 'https://us4.api.mailchimp.com/3.0/lists/870179a28f',
          method: "POST",
          headers: {
               "Authorization": "lenrd13 0a7c541ce13e5a479382c02a3830627d-us4"
          },
          body: jsonData
     }
     request(options, (error, response, body) => {
          if (!error && response.statusCode == 200) {
               console.log(response.statusCode)
               res.sendFile(__dirname + "/success.html")
          } else {
               res.sendFile(__dirname + "/failure.html")
          }
     })

})
// api key
// 0a7c541ce13e5a479382c02a3830627d-us4

// list id
// 870179a28f

//server
const port = 8080
app.listen(process.env.PORT || port, () => {
     console.log(`server running on port ${port}!`)
})