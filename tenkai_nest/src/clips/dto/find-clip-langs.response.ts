import { ApiProperty } from '@nestjs/swagger';
import { BaseFindResponseDto } from 'src/base/dto/base-find.response.dto';
import { ClipLang } from '../schemas/clip-lang.schema';

export class FindClipLangsResponseDto extends BaseFindResponseDto<ClipLang> {
    @ApiProperty({ type: [ClipLang] })
    docs: ClipLang[];
}
