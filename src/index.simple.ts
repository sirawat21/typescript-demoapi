import express, { Request, Response } from 'express';

/* -------------------- [*] API Config [*] -------------------- */
const api = express();
const port = 3030;
api.use(express.json());

/* -------------------- [*] Model [*] -------------------- */
interface Message {
   id: number,
   user: string,
   text: string,
   created: Date,
   modified: Date
}
let messages: Message[] = [];

/* -------------------- [*] Route [*] -------------------- */
/* [GET] - Get all messages */
api.get('/api/', (req: Request, res: Response) => {
   const resource = messages;
   res.status(200).send(resource);
});

/* [GET] - Get a message by id */
api.get('/api/:id', (req: Request, res: Response) => {
   const id = parseInt(req.params.id);
   const message = messages.filter(message => message.id === id);
   res.status(200).send(message);
});

/* [POST] - Creat a new message */
api.post('/api', (req: Request, res: Response) => {
   let { id, user, text } = req.body;
   const timeNow = new Date();
   // Creating model
   const message: Message = {
      id: (messages.length > 0) ? messages.slice(-1)[0].id + 1 : 1,
      user: user || 'Anonymous',
      text: text || '',
      created: timeNow,
      modified: timeNow
   }
   messages.push(message);
   // Set response
   const responseMessage = { status: 'successed' };
   res.status(201).send(JSON.stringify(responseMessage));
});

/* [PUT] - Modify a message by id */
api.put("/api/:id", (req, res) => {
   const id = parseInt(req.params.id);
   const timeNow = new Date();
   const modifiliedMessage: Message[] = [];
   // Get the union type of keys 
   type MessageKeys = keyof Message;
   // Use the union type to destructure                                   
   let { user, text }: {[Key in MessageKeys]: Message[Key]} = req.body;    
   // Modifly message from matched id 
   messages = messages.map(message => {
       if (message.id === id) {
           message.text = text
           message.user = user
           message.modified = timeNow
           modifiliedMessage.push(message)
       }
       return message
   })
   // Set response
   let responseMessage = { status: 'unsuccessed', modifilied: {} };
   if(modifiliedMessage.length > 0) {
      responseMessage = { status: 'successed', modifilied: modifiliedMessage };
   }
   res.status(200).send(JSON.stringify(responseMessage));
})

/* [DELETE] - Delete a new message by id */
api.delete('/api/:id', (req: Request, res: Response) => {
   const id = parseInt(req.params.id);
   const deletedItem: Message[] = [];
   // Searching a unmatch id message
   messages = messages.filter(message => {
      if (message.id === id) deletedItem.push(message)
      return message.id !== id
   });
   // Set response
   let responseMessage = { status: 'unsuccessed', deletedMessage: {} };
   if(deletedItem.length > 0) {
      responseMessage = { status: 'successed', deletedMessage: deletedItem };
   }
   res.status(200).send(JSON.stringify(responseMessage));
});

/* -------------------- [*] API Listening [*] -------------------- */
api.listen(port, () => {
   console.log(`API listening on port ${port}`);
});