
import express  from 'express'
import exphbs from 'express-handlebars'
import methodOverride from "method-override";
import { connectDB } from './db'
import * as alias from './Controllers/aliasController'
import favicon from 'serve-favicon'
import path from 'path'


connectDB()

const app: any = express()

// Our Express APP config
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.set("port", process.env.PORT || 5500);
app.use(favicon(path.join(__dirname, '../public','images', 'favicon.ico')))


//  Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  }))

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

app.get('/', (req : any, res: any) => res.redirect('/home'))

app.get('/home', alias.GetHome)
app.get('/urls', alias.GetUrl);
app.post('/', alias.PostUrl);
app.get('/:alias', alias.GetUrlALias)
// app.put('/:alias', alias.PutUrlAlias)
// app.delete('/:alias', alias.DeleteUrlAlias)


 const PORT : any = app.get('port');
 app.listen( PORT, () => {
     console.log(`App is running on port %d`, PORT)
 })

