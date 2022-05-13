# posh-code-assessment
Hello, this is my repository for the posh code challenge assessment!

In order to launch the application please run:

`npm install`
`npm run dev`

This ensures that the API and UI are both running concurrently.


Here are some of the resources I referenced in order to build this application:
- https://www.mongodb.com/languages/express-mongodb-rest-api-tutorial
- https://expressjs.com/
- https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
- stackoverflow

This application meets the following minimum requirements:
1. The api must be web accessible and a user should be able to communicate with it
through the chatbot frontend (provided).
- If you send a message to the chatbot with the UI you will get a response back
2. The api can be built in the framework of your choosing but must be done in Typescript.
- This api is made using express.
3. The api must allow for sending of messages and getting a response from the bot. The
logic for the bot does not need to be sophisticated. Feel free to pick a random response
from a list of potential responses.
- The response is currently random, but the bot will respond to you.
4. The api must allow for retrieving history (messages) for a chat.
- If you refresh the page, your chats will still be there. 
5. The api must allow for multiple clients sending requests.
- The API accounts for different chat IDs. If your launches the application, they will have their own unique chats and chat history.
6. A database is not required - if you would like to keep track of entities in memory that is
okay, though a database may be just as easy.
- This app uses a Mongodb database.


These are things I would like to implement if I have more time:
- An initial response from the chat bot, so the user does not need to initiate the conversation.
- A delay in message, so the conversation can feel more organic. Right now the user gets a response from the bot immediately when their message is sent. (Maybe a loading state in the UI)
- Dynamic chat responses. All chat responses are currently random.
- Refactor code
