
import express  from 'express'
import { connectDB } from './db'
import { GetUrl, PostUrl, GetUrlALias } from './Controllers/aliasController'

connectDB()

const app: any = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

// Our Express APP config
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

//Routes
app.get('/', GetUrl);
app.post('/', PostUrl);
app.get('/:alias', GetUrlALias)

// app.put('/:alias', PutUrlAlias)
// app.delete('/:alias', DeleteUrlAlias)



 const PORT : any = process.env.PORT || 5500 ;
 app.listen( PORT, () => {
     console.log(`App is running on port %d`, PORT)
 })

