import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMovieDto {
  @ApiProperty({ example: 'The Dark Knight' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 2008, minimum: 1900, maximum: 2030 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1900)
  @Max(2030)
  publishingYear: number;

  @ApiProperty({ example: 'https://example.com/poster.jpg', required: false })
  @IsOptional()
  @IsString()
  poster?: string;
}

