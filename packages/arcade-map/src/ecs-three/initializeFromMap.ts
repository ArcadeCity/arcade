import * as THREE from 'three'

import { WebGLRendererComponent } from './components'
import { WebGLRendererSystem } from './systems'
import { ECSYThreeWorld } from './world'

export const initializeFromMap = (
    camera: THREE.Camera,
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene
) => {
    const world = new ECSYThreeWorld()

    world
        .registerComponent(WebGLRendererComponent)
        .registerSystem(WebGLRendererSystem, { priority: 999 })

    const clock = new THREE.Clock()
    const animationLoop = () => {
        world.execute(clock.getDelta(), clock.elapsedTime)
    }
    renderer.setAnimationLoop(animationLoop)

    const sceneEntity = world.createEntity().addObject3DComponent(scene)
    const cameraEntity = world
        .createEntity()
        .addObject3DComponent(camera, sceneEntity)
    return { cameraEntity, sceneEntity, world }
}
