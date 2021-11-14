
import express  from 'express'
import { connectDB } from './db'
import { GetUrl, PostUrl, GetUrlALias, error404, error500 } from './Controllers/aliasController'
import { asyncMiddleware } from "./middleware/async";

connectDB()

const app: any = express()

// Our Express APP config

app.use(express.json());
app.use(express.urlencoded({ extended: false}))

//Routes

app.get('/urls', asyncMiddleware(GetUrl));
app.post('/url', asyncMiddleware(PostUrl));
app.get('/:alias', asyncMiddleware(GetUrlALias))

//Error redirect routes

app.get('/404', asyncMiddleware(error404))
app.get('/500', asyncMiddleware(error500))

// app.put('/:alias', PutUrlAlias)
// app.delete('/:alias', DeleteUrlAlias)



 const PORT : any = process.env.PORT || 5500 ;
 app.listen( PORT, () => {
     console.log(`App is running on port %d`, PORT)
 })

