import { Attributes, System } from '@arcadecity/arcade-map/ecs'
import { ECSYThreeEntity } from './entity'
import { ECSYThreeWorld } from './world'

export abstract class ECSYThreeSystem extends System {
  constructor(world: ECSYThreeWorld, attributes?: Attributes)

  queries: {
    [queryName: string]: {
      results: ECSYThreeEntity[]
      added?: ECSYThreeEntity[]
      removed?: ECSYThreeEntity[]
      changed?: ECSYThreeEntity[]
    }
  }

  world: ECSYThreeWorld
}
