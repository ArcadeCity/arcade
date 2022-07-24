import { Object3D } from 'three'
import { Component, RefPropType } from '@arcadecity/arcade-map/ecs'

export class Object3DComponent extends Component<Object3DComponent> {
  value?: Object3D

  static schema: {
    value: { type: RefPropType<Object3D> }
  }
}
