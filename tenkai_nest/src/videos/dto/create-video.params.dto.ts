import { IsString } from 'class-validator';

export class CreateVideoParamsDto {
    @IsString()
    videoId: string;
}
