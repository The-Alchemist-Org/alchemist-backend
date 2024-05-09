import { IQueueRepository, QueueRepository } from '@root/repositories/queue.repository';
import { DrinkConfigRepository, IDrinkConfigRepository } from '@root/repositories/drinkConfig.repository';
import StatusError from '@root/utils/statusError';
import { PutBody } from '@root/routes/drinkconfig/types';
import { IIngredientRepository, IngredientRepository } from '@root/repositories/ingredient.repository';
import { DrinkConfig } from '@root/entities';
import { DrinkConfigDTO } from './types';
import { toDrinkConfigDTO } from './drinkconfig.dto';

export interface IDrinkConfigService {
  put(putBody: PutBody): Promise<DrinkConfigDTO>;
}
export class DrinkConfigService implements IDrinkConfigService {
  constructor(
    private queueRepository: IQueueRepository = new QueueRepository(),
    private drinkConfigRepository: IDrinkConfigRepository = new DrinkConfigRepository(),
    private ingredientRepository: IIngredientRepository = new IngredientRepository(),
  ) { }

  async put(putBody: PutBody) {
    if (putBody.dispenserId > 5 || putBody.dispenserId <= 0) {
      throw new StatusError(422, 'invalid dispenserID');
    }

    let dk = await this.drinkConfigRepository.getDrinkConfigById(putBody.dispenserId);
    if (dk === null) {
      dk = new DrinkConfig();
      dk.id = putBody.dispenserId;
    }

    if (putBody.ingredientId != null) {
      dk.ingredient = await this.ingredientRepository.getIngredientById(putBody.ingredientId);
    } else {
      dk.ingredient = null;
    }
    dk.amountLeft = putBody.amountLeft;

    return toDrinkConfigDTO(await this.drinkConfigRepository.save(dk));
  }
}
