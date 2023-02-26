import { Application, Request, Response } from 'express';
import { AlbumController } from '../controllers/AlbumController';

export class AlbumRoutes {

    private album_controller: AlbumController = new AlbumController();

    public route(app: Application) {
        
        app.post('/api/album', (req: Request, res: Response) => {
            this.album_controller.create_album(req, res);
        });

        app.get('/api/album/:id', (req: Request, res: Response) => {
            this.album_controller.get_album(req, res);
        });

        app.put('/api/album/:id', (req: Request, res: Response) => {
            this.album_controller.update_album(req, res);
        });

        app.delete('/api/album/:id', (req: Request, res: Response) => {
            this.album_controller.delete_user(req, res);
        });

    }
}