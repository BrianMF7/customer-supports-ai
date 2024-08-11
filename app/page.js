"use client"
import {Box, Stack, TextField, Button} from "@mui/material"
import Image from "next/image";
import { useState } from "react";
import styles from './globals.css';



export default function Home() {
 const [messages, setMessages] = useState([
  {
  role: "assistant",
  content: "Hi, I'm the Headstarter Support Agent, how can i assist you today?"
},
]);
const [message, setMessage] = useState("");

const sendMessage = async()=>{
  setMessage("")
  setMessages((messages) => [
    ...messages,
    {role: "user", content: message},
    {role: "assistant", content: ""},
  ])
  const response = fetch("/api/chat", {
  method: "POST",
  headers:{
    "Content-Type": "application/json"
  },
  body: JSON.stringify([...messages,{role: "user", content: message}]),
  }).then(async (res)=>{
    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    let result = ""
    return reader.read().then(function processText({done, value}){
    if (done){
      return result
    }
    const text = decoder.decode(value || new Int8Array(), {stream:true})
    setMessages((messages)=>{
    let lastMessage = messages[messages.length -1]
    let otherMessages = messages.slice(0, messages.length - 1)
    console.log([...otherMessages,
      {
        ...lastMessage,
        content: lastMessage.content + text,
      },
    ])

    
    return[
      ...otherMessages,
      {
        ...lastMessage,
        content: lastMessage.content + text,
      },
    ]
    })
    return reader.read().then(processText)
    })
  })

}


return ( 
  
<Box width="100vw" height="100vh" display="flex" 
flexDirection="column" justifyContent="center" alignItems="center"
>
  <hr></hr>

<div>
<h1 class="main">Ai Assistant</h1>
</div>

<Stack direction="column" width="600px" height="700px" 
border="1px solid black" p={2} spacing={3}>

<Stack direction="column" spacing={2} flexGrow={1} overflow="auto" maxHeight="100%">

  {messages.map((message, index)=>(
    <Box key={index} display = "flex" justifyContent={
      message.role== "assistant" ? "flex-start" : "flex-end"
    }
    >
    <Box
     bgcolor={  
    message.role === "assistant"
    ? "primary.main"
    : "secondary.main" 

    }
    color="white"
    borderRadius={16}
    p={3}
    >
      {message.content}

    </Box>
    </Box>
  ))}

</Stack>
<Stack direction = "row" spacing={2}>

  <TextField 
  label = "message" 
  fullWidth
  value={message}
  onChange={(e) => setMessage(e.target.value)}
 />
 <Button variant="contained" onClick={sendMessage}>Send
 </Button>
</Stack>
</Stack>
<div style={{height: "100px" }}>





<hr></hr>
<div>

<div class="first">
<div class="card">
      <div class="card__content">
        <div class="card__front">
          <h3 class="card__title">Our AI</h3>
          <p class="card__subtitle">We're here to help you, 24/7</p>
        </div>

        <div class="card__back">
          <p class="card__body">Scroll down to see the exclusivity that our AI brings</p>
          </div>
        </div>
       </div>
       </div>

       
    <h1 class="community">Our AI Assistant</h1>
    <p class="middle">Our AI assistant helps with navigating new skills, advice or any resource you need in life. With homework, research or looking up information in seconds, there are numerous tasks that our ai can help you with. </p>
  <img class="call" src="https://builtin.com/sites/www.builtin.com/files/styles/og/public/2024-04/what-is-artificial-intelligence-ai.jpg"></img>
    </div>







    <div class="earth">
          <div></div>
        </div>
<hr></hr>
    <footer class="footer">
  <p class="good">AI Assistant by Brian, Bi, and Faizan </p>
  
</footer>

    </div>
</Box>

)
}
