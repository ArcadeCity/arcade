import { Component, Types } from '@arcadecity/arcade-map/ecs'

export class Rotating extends Component<Rotating> {
  speed: number = 1
}

Rotating.schema = {
  speed: { default: 1, type: Types.Number },
}
