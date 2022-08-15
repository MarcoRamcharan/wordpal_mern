const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const wordRoutes = require('./routes/wordRoutes')
const authRoutes = require('./routes/authRoutes')



const app = express()
app.use(express.json())
app.use('/api/word', wordRoutes)
app.use('/api/user', authRoutes)
app.use(cors())

mongoose.connect('mongodb+srv://marcomongo:mongomarco@marcosclusterno1.kzoqh.mongodb.net/Wordpal?retryWrites=true&w=majority')
.then(()=>{
    console.log('db connected')
})
.catch((error) => {console.log(error)})

app.use(express.static(path.join(__dirname, './client/build')))

app.get('*', function(_, res){
    res.sendFile(
        path.join(__dirname, './client/src/index.html'),
        function(err){
            if(err){
                res.status(500).send(err)
            }
        }
    )
})

app.listen(process.env.PORT || 5000, ()=>{
    console.log('server running')
})

