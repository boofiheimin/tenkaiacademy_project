export class BaseFindResponseDto<T> {
    docs: T[];
    totalCount: number;
}
