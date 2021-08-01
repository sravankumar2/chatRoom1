
const express=require("express")
const path=require("path")

const app= express()
const http=require("http").createServer(app)

app.use(express.static(path.join(__dirname,"public")))

const io= require("socket.io")(http)
io.on("connection", socket=>{
    console.log("connection Ready")
    socket.on("sendMessage", msg=>{
        socket.broadcast.emit("sendToAll", msg)
    })
    socket.on("disconnect", (msg)=>{
        console.log("disconneted")
        // io.emit("sendToAll", msg)
    })
   
})

const PORT= process.env.PORT || 3000
http.listen(PORT, ()=>{
    console.log("server Started at Port :", PORT)
})