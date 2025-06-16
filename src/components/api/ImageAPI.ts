import ImageModel from "../model/ImageModel";
import { my_request } from "./Request";
export async function getImageUrl(id: number): Promise<ImageModel[]> {
    const result: ImageModel[] = [];
    const url: string = `http://localhost:8080/products/${id}/images`;
    //goi phuong thuc request
    const response = await my_request(url);
    //lay ra json hinh anh
    const responseData = response._embedded.images;

   for (const item of responseData) {
    const image = new ImageModel(
        item.id,
        item.icon,
        item.name
    );
    
    result.push(image);
  }

    return result;
}