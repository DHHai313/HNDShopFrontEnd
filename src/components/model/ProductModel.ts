class ProductModel {
    private _id: number;
    private _brand?: string;
    private _description?: string;
    private _name?: string;
    private _price?: number;
    private _stock?: number;

    constructor(
        id: number,
        brand?: string,
        description?: string,
        name?: string,
        price?: number,
        stock?: number,
    ) {
        this._id = id;
        this._brand = brand;
        this._description = description;
        this._name = name;
        this._price = price;
        this._stock = stock;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get brand(): string | undefined {
        return this._brand;
    }

    set brand(value: string | undefined) {
        this._brand = value;
    }

    get description(): string | undefined {
        return this._description;
    }

    set description(value: string | undefined) {
        this._description = value;
    }

    get name(): string | undefined {
        return this._name;
    }

    set name(value: string | undefined) {
        this._name = value;
    }

    get price(): number | undefined {
        return this._price;
    }

    set price(value: number | undefined) {
        this._price = value;
    }

    get stock(): number | undefined {
        return this._stock;
    }

    set stock(value: number | undefined) {
        this._stock = value;
    }
}

export default ProductModel;
