import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from './entities/sale.entity';
import { TopSales } from './dto/top-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private readonly salesModel: Model<Sale>,
  ) {}
  async create(saleDto: TopSales) {
    const data = await this.salesModel
      .aggregate([
        {
          $addFields: {
            orderDate: {
              $toDate: '$orderDate',
            },
            month: {
              $month: {
                $toDate: '$orderDate',
              },
            },
            year: {
              $year: {
                $toDate: '$orderDate',
              },
            },
            day: {
              $dayOfMonth: {
                $toDate: '$orderDate',
              },
            },
          },
        },
        {
          $match: {
            productId: {
              $ne: null,
            },
            _id: {
              $ne: null,
            },
            orderDate: {
              $lte: saleDto.endDate,
              $gt: saleDto.startDate,
            },
          },
        },
        {
          $group: {
            _id: '$productId',
            prdouctId: {
              $first: '$productId',
              // $first: '$productId',
            },
            totalProductSold: {
              $sum: 1,
            },
            totalAmount: {
              $sum: '$price',
            },
          },
        },
        {
          $sort: {
            totalProductSold: -1,
          },
        },
        {
          $limit: saleDto.count,
        },
      ])
      .exec();
    console.log(data);

    return data;
  }

  findAll() {
    return `This action returns all sales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
