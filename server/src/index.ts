import express, {Application} from 'express';

import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';

class Server{

    public app: Application;

    //se ejecuta al instanciar la clase, y devolvera objeto tipo express
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    //encargado de configurar la variable app
    config(): void {
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({extended:false})); // para enviar desde un formulario html
    }
    
    //para definir de app las rutas de nuestro servidor
    routes(): void {
        this.app.use('/',indexRoutes);
    }

    //para poder inicializar el servidor
    start(): void {
        const serverWeb=this.app.listen(this.app.get('port'), "0.0.0.0", () => {
            console.log("Ejecutando Server en port",this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();