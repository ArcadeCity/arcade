import { Component, Types } from '@arcadecity/arcade-map/ecs'

export class Object3DComponent extends Component {}

Object3DComponent.schema = {
  value: { type: Types.Ref },
}
