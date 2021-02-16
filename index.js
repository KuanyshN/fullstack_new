const app = require('./app')
const port = process.env.PORT || 5000

//"Первый урок по созданию и проверки сервера
// app.get('/', (req, res)=>{
//     res.status(200).json({
//         message: 'Working'
//     })
// })

app.listen(port, ()=> console.log(`Server has been started on ${port} port`))