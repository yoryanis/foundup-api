import { PhotoService } from '../services/photo.service';
export declare class PhotoController {
    private readonly photoService;
    constructor(photoService: PhotoService);
    findAll(): Promise<string>;
    findOne(id: string): Promise<string>;
    remove(id: string): Promise<import("../responses").ApiResponse<any>>;
}
