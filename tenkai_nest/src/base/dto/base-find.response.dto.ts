import { ApiProperty } from "@nestjs/swagger";

export class BaseFindResponseDto<T> {
    @ApiProperty() // * Override this in Response Dto for accurate Swagger
    docs: T[];

    @ApiProperty()
    totalCount: number;
}
