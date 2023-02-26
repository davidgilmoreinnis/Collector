import { IAlbum } from './model';
import albums from './schema';

export default class AlbumService {
    
    public createAlbum(album_params: IAlbum, callback: any) {
        const _session = new albums(album_params);
        _session.save(callback);
    }

    public filterAlbum(query: any, callback: any) {
        albums.findOne(query, callback);
    }

    public updateAlbum(album_params: IAlbum, callback: any) {
        const query = { _id: album_params._id };
        albums.findOneAndUpdate(query, album_params, callback);
    }
    
    public deleteAlbum(_id: String, callback: any) {
        const query = { _id: _id };
        albums.deleteOne(query, callback);
    }

}