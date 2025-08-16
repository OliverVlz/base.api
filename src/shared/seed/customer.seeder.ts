import { Repository } from 'typeorm';
import { Customer } from '../../customer/infrastructure/entity/customer.entity';

export class CustomerSeeder {
  async seed(customerRepository: Repository<Customer>) {
    const customersData = [
      {
        fullName: 'Juan Carlos Pérez',
        documentNumber: '12345678',
        phone: '+1234567890',
        address: 'Calle Principal #123, Ciudad A',
      },
      {
        fullName: 'María Elena García',
        documentNumber: '87654321',
        phone: '+0987654321',
        address: 'Avenida Central #456, Ciudad B',
      },
      {
        fullName: 'Carlos Alberto López',
        documentNumber: '11223344',
        phone: '+1122334455',
        address: 'Carrera 10 #789, Ciudad C',
      },
      {
        fullName: 'Ana Sofía Martínez',
        documentNumber: '55667788',
        phone: '+5566778899',
        address: 'Diagonal 20 #321, Ciudad D',
      },
      {
        fullName: 'Roberto Luis Hernández',
        documentNumber: '99887766',
        phone: null,
        address: null,
      },
    ];

    const customers = await Promise.all(
      customersData.map(async data => {
        let customer = await customerRepository.findOne({ 
          where: { documentNumber: data.documentNumber } 
        });
        if (!customer) {
          customer = await customerRepository.save(customerRepository.create(data));
        }
        return customer;
      }),
    );

    console.log('✅ Seeders de customers ejecutados con éxito');
    return customers;
  }
} 