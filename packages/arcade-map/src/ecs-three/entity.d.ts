import { Object3D } from 'three'
import { _Entity, Entity } from '@arcadecity/arcade-map/ecs'

export interface ECSYThreeObject3D {
  entity: ECSYThreeEntity
}

export class ECSYThreeEntity extends _Entity {
  addObject3DComponent(obj: Object3D, parentEntity?: Entity): this
  removeObject3DComponent(unparent?: boolean): void
  remove(forceImmediate?: boolean): void
  getObject3D<T extends Object3D>(): (T & ECSYThreeObject3D) | undefined
}
