import express, {Application} from 'express';
import userRoutes from '../routes/usuario';
import cors from 'cors'
import dotenv from 'dotenv'
import db from '../db/conecction';


dotenv.config()

class Server {

    private app  : Application;
    private port : string;
    private apiPaths = {
        usuarios: '/api/usuarios'
    }


    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';       


        // Metodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {
        
        try {
            
            await db.authenticate();
            console.log('db esta online');
        
        } catch ( error ) {
            throw new Error ( 'Error en la conexion a la BD' );
            
        }
    }

    middlewares () {

        // CORS
        this.app.use ( cors());

        // Lectura del body
        this.app.use (express.json());

        //Carpeta publica
        this.app.use (express.static('public'));

    }

    routes (){

        this.app.use( this.apiPaths.usuarios, userRoutes );

    }

    listen () {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto' +this.port);
        });
    }

}

export default Server;