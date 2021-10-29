
import express  from 'express'
import exphbs from 'express-handlebars'
import { connectDB } from './db'
import { GetHome, GetUrl, PostUrl, GetUrlALias } from './Controllers/aliasController'
import favicon from 'serve-favicon'
import path from 'path'
import { asyncMiddleware } from "./middleware/async";

connectDB()

const app: any = express()

// Our Express APP config
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

//Routes
app.get('/', asyncMiddleware(GetHome));
app.get('/urls', asyncMiddleware(GetUrl));
app.post('/', asyncMiddleware(PostUrl));
app.get('/:alias', asyncMiddleware(GetUrlALias))
// app.put('/:alias', PutUrlAlias)
// app.delete('/:alias', DeleteUrlAlias)

app.use(favicon(path.join(__dirname, '../public','images', 'favicon.ico')))


  // Hamdlebars helpers
import {
  formatDate,
  truncate,
  stripTags

} from './helpers/hbs'

//Handlebars 
app.engine('.hbs', exphbs({ 
  helpers: {
    formatDate,
    truncate,
    stripTags
  },defaultLayout : 'main', extname: '.hbs' }));

app.set('view engine', '.hbs');



 const PORT : any = process.env.PORT || 5500 ;
 app.listen( PORT, () => {
     console.log(`App is running on port %d`, PORT)
 })

