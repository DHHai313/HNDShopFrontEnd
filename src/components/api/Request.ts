
export async function my_request(url:string) {
    //truy van den duong dan
    const respone = await fetch(url);
    //neu tra ve loi
    if(!respone.ok){
        throw new Error(`Cannot access ${url}`)
    }
    //neu tra ve ok
    return respone.json();
}