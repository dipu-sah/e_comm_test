import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private readonly salesModel: Model<Sale>,
  ) {}
  async create(createSaleDto: CreateSaleDto) {
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
            // productId: {
            //   $ne: null,
            // },
            // _id: {
            //   $ne: null,
            // },
            orderDate: {
              $lte: new Date('25 april 2023'),
              $gt: new Date('25 march 2021'),
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
          $limit: 10,
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
