
import express  from 'express'
import { connectDB } from './db'
import * as alias from './Controllers/aliasController'
import favicon from 'serve-favicon'
import path from 'path'

connectDB()

const app: any = express()

// Our Express APP config
app.use(express.json());
app.set("port", process.env.PORT || 5500);
app.use(favicon(path.join(__dirname, '../public','images', 'favicon.ico')))


app.get('/', alias.GetUrl);
app.post('/', alias.PostUrl);
app.get('/:alias', alias.GetUrlALias)
app.put('/:alias', alias.PutUrlAlias)
app.delete('/:alias', alias.DeleteUrlAlias)

app.get('/test', (req : any, res: any) => res.send('Hello World'))

 const PORT : any = app.get('port');
 app.listen( PORT, () => {
     console.log(`App is running on port %d`, PORT)
 })

