import { IsDate, IsDefined, IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class TopSales {
  @IsDefined()
  @Type(() => Date)
  @IsDate()
  @ApiProperty()
  startDate: Date;

  @IsDefined()
  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  endDate: Date;

  @IsOptional()
  @ApiProperty()
  @Min(1)
  @Max(1500)
  count: number;
}
