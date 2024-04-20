// eslint-disable-next-line import/no-extraneous-dependencies
import { Connection } from 'typeorm';
import { User } from '@entities/user';

const buildUsers = async (amount: number) => {
  const usersList = [...Array(amount)].map(async (_, index) => {
    const user = new User(`user+${index}@user.com`);
    user.firstName = `first_${index}`;
    user.lastName = `last_${index}`;

    await user.setPassword('password');
    return user;
  });
  return Promise.all(usersList);
};

export const userSeeder = async (connection: Connection) => {
  const usersList = await buildUsers(10);

  return connection
    .createQueryBuilder()
    .insert()
    .into(User)
    .values(usersList)
    .execute();
};
