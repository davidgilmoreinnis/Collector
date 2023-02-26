import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse } from '../modules/common/service';
import { IAlbum } from '../modules/albums/model';
import AlbumService from '../modules/albums/service';
import e = require('express');
import album from 'models/album';

export class AlbumController {

    private album_service: AlbumService = new AlbumService();

    public create_album(req: Request, res: Response) {
        // this check whether all the filds were send through the erquest or not
        if (req.body.title && req.body.artist && req.body.label && req.body.genre &&
            req.body.year &&
            req.body.format) {
            const album_params: IAlbum = {
                title: req.body.title,
                artist: req.body.artist,
                label: req.body.label,
                genre: req.body.genre,
                year: req.body.year,
                format: req.body.format,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New album created'
                }]
            };
            this.album_service.createAlbum(album_params, (err: any, album_params: IAlbum) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('create album successfull', album_params, res);
                }
            });
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public get_album(req: Request, res: Response) {
        if (req.params.id) {
            const album_filter = { _id: req.params.id };
            this.album_service.filterAlbum(album_filter, (err: any, album_data: IAlbum) => {
                if (err) {
                    mongoError(err, res);
                } else {
                    successResponse('get album successfull', album_data, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public update_album(req: Request, res: Response) {
        if (req.params.title &&
            req.body.artist || req.body.label|| req.body.genre || req.body.year ||
            req.body.format) {
            const album_filter = { _id: req.params.id };
            this.album_service.filterAlbum(album_filter, (err: any, album_data: IAlbum) => {
                if (err) {
                    mongoError(err, res);
                } else if (album_data) {
                    album_data.modification_notes.push({
                        modified_on: new Date(Date.now()),
                        modified_by: null,
                        modification_note: 'Album data updated'
                    });
                    const album_params: IAlbum = {
                        _id: req.params.id,
                        title: req.params.title,
                        artist: req.params.artist,
                        label: req.params.label,
                        genre: req.params.genre,
                        year: req.params.year,
                        format: req.params.format,
                        modification_notes: album_data.modification_notes
                    };
                    this.album_service.updateAlbum(album_params, (err: any) => {
                        if (err) {
                            mongoError(err, res);
                        } else {
                            successResponse('update album successfull', null, res);
                        }
                    });
                } else {
                    failureResponse('invalid album', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }

    public delete_user(req: Request, res: Response) {
        if (req.params.id) {
            this.album_service.deleteAlbum(req.params.id, (err: any, delete_details) => {
                if (err) {
                    mongoError(err, res);
                } else if (delete_details.deletedCount !== 0) {
                    successResponse('delete album successfull', null, res);
                } else {
                    failureResponse('invalid album', null, res);
                }
            });
        } else {
            insufficientParameters(res);
        }
    }
}