export class BaseFindParamsDto {
    limit?: number;

    skip?: number;

    sort?: object;

    [key: string]: any;
}
