import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'My first note', description: 'The title of the note' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is the content of my first note.', description: 'The content of the note' })
  @IsNotEmpty()
  content: string;
}
