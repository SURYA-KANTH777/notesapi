import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateNoteDto {
  @ApiProperty({ example: 'My updated note title', description: 'The updated title of the note', required: false })
  @IsOptional()
  title?: string;

  @ApiProperty({ example: 'This is the updated content of my note.', description: 'The updated content of the note', required: false })
  @IsOptional()
  content?: string;
}
