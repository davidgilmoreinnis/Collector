import { ModificationNote } from "../common/model";

export interface IAlbum {
    _id?: string;
    title: string;
    artist: string;
    label?: string;
    genre?: string;
    year?: string;
    format?: string;
    modification_notes: ModificationNote[]
}