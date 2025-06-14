class ImageModel {
    private _id: number;
    private _icon_url?: string;
    private _name?: string;

    constructor(id: number, icon_url?: string, name?: string) {
        this._id = id;
        this._icon_url = icon_url;
        this._name = name;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get icon_url(): string | undefined {
        return this._icon_url;
    }

    set icon_url(value: string | undefined) {
        this._icon_url = value;
    }

    get name(): string | undefined {
        return this._name;
    }

    set name(value: string | undefined) {
        this._name = value;
    }
}

export default ImageModel;
