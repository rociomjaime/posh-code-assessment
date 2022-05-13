const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const port = 8080

// get MongoDB driver connection
const dbo = require('./db/conn');


app.use(cors({
    origin: '*' // because this is locally hosted
}));
app.use(bodyParser.json())


//perform a database connection when the server starts
dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
}
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

/**API STUB to get the user's messages */
app.get('/chat/:id/messages', function (request, response) {
    const dbConnect = dbo.getDb();
    dbConnect
    .collection("messages")
    .find({chatid: request.params.id})
    .toArray(function (err, result) {
      if (err) {
        response.status(400).send("Error fetching chats!");
     } else {
        console.log({result})
        //TODO: If result is empty, push an initial response to MongoDB Database
        response.send({"messages": result});
      } 
    });

})


/** Send the user response to database and provide response back to user from bot */
app.post('/chat/:id/send', function (request, response) {

    function chatResponse() {
        // TODO: Make this its own module with more interactive responses
        const potential_responses = [
            "Hmm. Thanks for your inquiry.",
            "That's great to hear!",
            "Did you hear about the Yankees?",
            "I love a good casserole.",
            "You don't say?!"
        ]
        return potential_responses[Math.floor(Math.random() * potential_responses.length)];   
    }


    const dbConnect = dbo.getDb();

    // TODO: Have a designated message class
    const chatRecord = {
      chatid: request.params.id,
      senderType: "USER",
      text: JSON.stringify(
        request.body.message
      )
    };
  
    dbConnect
      .collection("messages")
      .insertOne(chatRecord, function (err, result) {
        if (err) {
          response.status(400).send("Error inserting chat record!");
        } else {
          console.log(`Message saved.`);
        }
      });

    //TODO: Insert multiple records rather than one at a time to MongoDB
    const bot_response = {
        chatid: request.params.id,
        senderType: "BOT",
        text: chatResponse()
    }
    dbConnect
    .collection("messages")
    .insertOne(bot_response, function (err, result) {
      if (err) {
        response.status(400).send("Error inserting chat record!");
      } else {
        console.log(`Message saved.`);
      }
    });

    response.send({"message": bot_response})
    
    

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


