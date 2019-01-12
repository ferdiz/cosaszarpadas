const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const port = process.env.PORT || 4001
const index = require("./index")
const app = express()
app.use(index)
const server = http.createServer(app)
const io = socketIo(server)

function distancia(casilla1, casilla2){
  let c1x = casilla1.x;
  let c1y = casilla1.y;
  let c2x = casilla2.x;
  let c2y = casilla2.y;
  if ((c1y+c2y) % 2 == 1){
    if (c1y % 2 == 0 && c2x < c1x){
      c2x++
    } else if (c1y % 2 == 1 && c2x > c1x){
      C2x--
    }
  }
  return Math.max(Math.abs(c1x-c2x)+parseInt((Math.abs(c1y-c2y)+1)/2), Math.abs(c1y-c2y))
}

console.log(distancia({x:1, y:1}, {x:1, y:1}))
console.log(distancia({x:1, y:1}, {x:2, y:3}))
console.log(distancia({x:2, y:3}, {x:1, y:1}))
console.log(distancia({x:1, y:3}, {x:4, y:5}))

io.on("connection", socket => {
  console.log("New client connected")
  socket.on('chat',mensaje=>{socket.broadcast.emit('chat',mensaje)})
  socket.on('distancia',casillas=>{socket.emit('distancia',distancia(...casillas))})
  socket.on("disconnect", () => console.log("Client disconnected"))
})

server.listen(port, () => console.log(`Listening on port ${port}`))