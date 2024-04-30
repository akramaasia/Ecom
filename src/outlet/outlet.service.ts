import { Injectable } from '@nestjs/common';
import { CreateOutletDto } from './dto/create-outlet.dto';
import { UpdateOutletDto } from './dto/update-outlet.dto';
import { OutletRepository } from './outlet.repository';
@Injectable()
export class OutletService {
  constructor(private readonly outletRepository: OutletRepository) {}

  create(createOutletDto: CreateOutletDto) {
    return this.outletRepository.createOutlet(createOutletDto);
  }

  findAll() {
    return this.outletRepository.find();
  }

  findOne(id: number) {
    return this.outletRepository.getOutletById(id);
  }

  update(id: number, updateOutletDto: UpdateOutletDto) {
   return this.outletRepository.updateOutlet(id, updateOutletDto)
  }

  remove(id: number) {
    return this.outletRepository.deleteOutlet(id);
  }
}
