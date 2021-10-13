
import express  from 'express'
import { connectDB } from './db';
import * as alias from './Controllers/aliasController'

connectDB()

const app: any = express()
 
// Our Express APP config
app.use(express.json());
app.set("port", process.env.PORT || 5500);

app.get('/url', alias.GetUrl);
app.post('/url', alias.PostUrl);

app.get('/test', (req : any, res: any) => res.send('Hello World'))

 const PORT : any = app.get('port');
 app.listen( PORT, () => {
     console.log(`App is running on port %d`, PORT)
 })

