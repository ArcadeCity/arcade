/*
 * Copyright (C) 2019-2021 HERE Europe B.V.
 * Licensed under Apache 2.0, see full license in LICENSE
 * SPDX-License-Identifier: Apache-2.0
 */

import { Theme } from '@here/harp-datasource-protocol'
import { MapControls } from '@here/harp-map-controls'
import { MapView } from '@here/harp-mapview'
import { VectorTileDataSource } from '@here/harp-vectortile-datasource'

const defaultTheme = 'resources/arcade.json'

export interface ViewParameters {
  theme?: string | Theme
  canvas: HTMLCanvasElement
}

export class View {
  readonly canvas: HTMLCanvasElement
  readonly theme: string | Theme

  readonly mapView: MapView

  constructor(args: ViewParameters) {
    this.canvas = args.canvas
    this.theme = args.theme === undefined ? defaultTheme : args.theme
    this.mapView = this.initialize()
  }

  protected initialize(): MapView {
    const mapView = new MapView({
      canvas: this.canvas,
      theme: this.theme,
      decoderUrl: 'decoder.bundle.js',
    })

    const dataSource = new VectorTileDataSource({
      authenticationCode: '_ZQeCfAB3nJFJ4E7JJ7W-CwSSW3vvUh6032RY85_OVs',
    })
    mapView.addDataSource(dataSource)

    MapControls.create(mapView)

    return mapView
  }
}
