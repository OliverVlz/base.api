import dataSource from 'src/db/data-source';

import { User } from 'src/identity/infrastructure/entity/user.entity';
import { Customer } from 'src/customer/infrastructure/entity/customer.entity';

import { CustomerSeeder } from '../seed/customer.seeder';

async function bootstrap() {
  try {
    await dataSource.initialize();

    const userRepository = dataSource.getRepository(User);  
    const customerRepository = dataSource.getRepository(Customer);

    const customerSeeder = new CustomerSeeder();

    await customerSeeder.seed(customerRepository);
  } catch (error) {
    console.error('Error ejecutando seeders:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

bootstrap();
