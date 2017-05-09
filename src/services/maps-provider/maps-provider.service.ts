import { Injectable } from '@angular/core';
import { MapProvider } from './map-provider/map-provider';

@Injectable()
export class MapsProvider {
	imageryLayers: any;

	constructor() {
		this.imageryLayers = new Cesium.ImageryLayerCollection();
	}

	public getImageryLayers(): any {
		return this.imageryLayers;
	}

	public addImageryLayer(mapProvider: MapProvider, index): any {
		return this.getImageryLayers().addImageryProvider(mapProvider.getMapProvider(), index);
	}

	public removeImageryLayer(mapProvider: MapProvider, destroy: boolean = true): any {
		return this.getImageryLayers().remove(mapProvider.getMapProvider(), destroy);
	}
}

