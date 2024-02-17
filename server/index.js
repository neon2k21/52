const express = require('express')
const userRouter = require('./routes/user.routes')
const objectRouter = require('./routes/object.routes')
const reviewRouter = require('./routes/review.routes')
const routeRouter = require('./routes/route.routes')

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080

const app = express()

app.use(bodyParser.json())
app.use('/api',userRouter)
app.use('/api',objectRouter)
app.use('/api',reviewRouter)
app.use('/api',routeRouter)


app.listen(PORT, () => console.log(`Сервер запущен с портом: ${PORT}`))


