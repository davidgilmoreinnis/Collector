import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import environment from "../environment";
import { TestRoutes } from "../routes/test_routes";
import { AlbumRoutes } from "../routes/album_routes"


class App {
   public mongoUrl: string = `mongodb+srv://developer:<passwords>@serverlessinstance0.vtpsf.mongodb.net/Collector?retryWrites=true&w=majority";`
   public app: express.Application;
   private test_routes: TestRoutes = new TestRoutes();
   private album_routes: AlbumRoutes = new AlbumRoutes();
   
   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.test_routes.route(this.app);
      this.album_routes.route(this.app);
   }
   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      mongoose.connect(this.mongoUrl)
      .then(()=>{
         console.log("Connected to MongoDB");
     })
     .catch((e)=>{
         console.log(e);
     })
   }
}
export default new App().app;