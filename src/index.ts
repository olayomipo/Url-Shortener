
import express  from 'express'
import { connectDB } from './db'
import { GetUrl, PostUrl, GetUrlALias } from './Controllers/aliasController'
import { asyncMiddleware } from "./middleware/async";

connectDB()

const app: any = express()

// Our Express APP config
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

//Routes

app.get('/:alias', asyncMiddleware(GetUrlALias))
app.get('/', asyncMiddleware(GetUrl));
app.post('/', asyncMiddleware(PostUrl));
// app.put('/:alias', PutUrlAlias)
// app.delete('/:alias', DeleteUrlAlias)



 const PORT : any = process.env.PORT || 5500 ;
 app.listen( PORT, () => {
     console.log(`App is running on port %d`, PORT)
 })

