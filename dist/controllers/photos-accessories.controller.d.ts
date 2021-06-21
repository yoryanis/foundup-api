import { PhotosAccessoriesService } from '../services/photos-accessories.service';
import { CreatePhotosAccessoryDto } from '../photos-accessories/dto/create-photos-accessory.dto';
import { UpdatePhotosAccessoryDto } from '../photos-accessories/dto/update-photos-accessory.dto';
export declare class PhotosAccessoriesController {
    private readonly photosAccessoriesService;
    constructor(photosAccessoriesService: PhotosAccessoriesService);
    create(createPhotosAccessoryDto: CreatePhotosAccessoryDto): any;
    findAll(): any;
    findOne(id: string): any;
    update(id: string, updatePhotosAccessoryDto: UpdatePhotosAccessoryDto): any;
    remove(id: string): any;
}
