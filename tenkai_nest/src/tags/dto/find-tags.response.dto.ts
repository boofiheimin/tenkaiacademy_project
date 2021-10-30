import { ApiProperty } from '@nestjs/swagger';
import { BaseFindResponseDto } from 'src/base/dto/base-find.response.dto';
import { Tag } from '../tag.schema';

export class FindTagsResponseDto extends BaseFindResponseDto<Tag> {
    @ApiProperty({ type: [Tag] })
    docs: Tag[];
}
