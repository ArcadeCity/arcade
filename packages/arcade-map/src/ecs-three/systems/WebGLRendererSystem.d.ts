import { System } from '@arcadecity/arcade-map/ecs'
import { WebGLRendererComponent } from '../components/WebGLRendererComponent'

export class WebGLRendererSystem extends System {
  static queries: {
    renderers: { components: [typeof WebGLRendererComponent] }
  }

  needsResize: boolean

  onResize(): void

  dispose(): void

  execute(): void
}
