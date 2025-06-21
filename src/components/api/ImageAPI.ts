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
export async function createImage(productId: number, iconUrl: string, name: string): Promise<void> {
  const response = await fetch('http://localhost:8080/images', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      icon: iconUrl,
      name: name,
      product: `/products/${productId}`,
    }),
  });

  if (!response.ok) {
    throw new Error('Không thể thêm ảnh');
  }
}
export async function updateImage(imageId: number, iconUrl: string, name: string, productId: number): Promise<void> {
  const response = await fetch(`http://localhost:8080/images/${imageId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      icon: iconUrl,
      name: name,
      product: `/products/${productId}`
    }),
  });

  if (!response.ok) {
    throw new Error('Không thể cập nhật ảnh');
  }
}
