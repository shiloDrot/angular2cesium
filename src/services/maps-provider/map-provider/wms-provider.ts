import { MapProvider } from './map-provider';
export class WmsProvider extends MapProvider {
	constructor(options) {
		super();
		this._mapProvider =  new Cesium.WebMapServiceImageryProvider(options);
	}
}