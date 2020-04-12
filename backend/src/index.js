const express = require('express')
const cors = require('cors')
const fetch = require('node-fetch')
const redis = require('redis')

const app = express()
const port = 3001

app.use(cors())


const SIMULATION_DATA_QUEUE_LABEL = "queue:simulation-data"
const SIMULATION_RESULT_QUEUE_LABEL = "queue:simulation-result"

const redisClient = redis.createClient()
redisClient.on("error", err => console.log(err))


app.get("/api/simulationQueueConnected", (req, res) =>
  res.json(redisClient.connected)
)

app.get("/api/simulationsQueue", (req, res) =>
  redisClient.lrange(SIMULATION_DATA_QUEUE_LABEL, 0, -1, (err, queue) => res.json(queue))
)

app.get("/api/simulationsResultsQueue", (req, res) =>
  redisClient.lrange(SIMULATION_RESULT_QUEUE_LABEL, 0, -1, (err, queue) => res.json(queue))
)

app.listen(port, () => console.log(`Server listening on port ${port}!`))