// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { DrinkConfig } from '@root/entities';

export const drinkConfigSeeder = async (connection: Connection) => {
  const drinkConfigsList = [...Array(5).keys()].map((i) => {
    const dc = new DrinkConfig();
    dc.id = i + 1;
    dc.amountLeft = 0;
    dc.ingredient = null;
    return dc;
  });

  return connection
    .createQueryBuilder()
    .insert()
    .into(DrinkConfig)
    .values(drinkConfigsList)
    .execute();
};
