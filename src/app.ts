
import express  from 'express'
import exphbs from 'express-handlebars'
import { connectDB } from './db'
import * as alias from './Controllers/aliasController'
import favicon from 'serve-favicon'
import path from 'path'


connectDB()

const app: any = express()

// Our Express APP config
app.use(express.json());
app.use(express.urlencoded({ extended: false}))


app.get('/', (req : any, res: any) => res.redirect('/home'))

const gh : any = app.get('/home', alias.GetHome)
app.get('/urls', alias.GetUrl);
app.post('/create', alias.PostUrl);
app.get('/:alias', alias.GetUrlALias)
// app.put('/:alias', alias.PutUrlAlias)
// app.delete('/:alias', alias.DeleteUrlAlias)

app.set("port", process.env.PORT || 5500);
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



 const PORT : any = app.get('port');
 app.listen( PORT, () => {
     console.log(`App is running on port %d`, PORT)
 })

