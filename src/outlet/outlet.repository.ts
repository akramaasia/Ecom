import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { OutletEntity } from './entities/outlet.entity';
import { CreateOutletDto } from './dto/create-outlet.dto';
import { UpdateOutletDto } from './dto/update-outlet.dto';

@Injectable()
export class OutletRepository extends Repository<OutletEntity> {
  constructor(private dataSource: DataSource) {
    super(OutletEntity, dataSource.createEntityManager());
  }
  async createOutlet(createOutletDto: CreateOutletDto) {
    return this.save(createOutletDto);
  }

  async deleteOutlet(id: number) {
    const outlet = await this.findOne({ where: { id } });
    return this.remove(outlet);
  }

  async getOutlet() {
    return this.find();
  }

  async getOutletById(id: number) {
    return this.findOne({
      where: { id },
    });
  }

  async updateOutlet(id: number, updateOutletDto: UpdateOutletDto) {
    const outlet = await this.findOne({ where: { id } });
    return this.save({ ...outlet, ...updateOutletDto });
  }
}
