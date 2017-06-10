import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { AcNotification } from '../../../../src/models/ac-notification';
import { AcLayerComponent } from '../../../../src/components/ac-layer/ac-layer.component';
import { ActionType } from '../../../../src/models/action-type.enum';

@Component({
	selector: 'ellipse-performance-layer',
	templateUrl: 'ellipse-performance-layer.html',
	providers: []
})
export class EllipsePerformanceLayerComponent implements OnInit {
	@ViewChild(AcLayerComponent) layer: AcLayerComponent;

	ellipses$: Observable<AcNotification>;
	Cesium = Cesium;
	show = true;

	semiMajorAxis: number;
	semiMinorAxis: number;
	center: any;

	constructor() {
	}

	ngOnInit() {
		//let ellipses = this._generateEllipses(1000);
		this.center = Cesium.Cartesian3.fromRadians(Math.random(), Math.random())

		this.semiMajorAxis =  100000;
		this.semiMinorAxis = 160000;

		this.ellipses$ = Observable.create((observer) => {
			setInterval(() => {
				let ellipses =  this._generateEllipses(1);
				ellipses.forEach(
					(ellipseData) => {
						observer.next(ellipseData);
				});
			}, 500);
			
		});
	}

	removeAll() {
		this.layer.removeAll();
	}

	setShow($event) {
		this.show = $event
	}

	private _generateEllipses(ammount: number) {
		let ellipses = [];
		let id = 0;

		for (let i = 0; i < ammount; i++) {
			id++;

			ellipses.push({
				id: id,
				actionType: ActionType.ADD_UPDATE,
				entity: {
					id: id,
					ellipse: {
						center: this.center,
						semiMajorAxis: this.semiMajorAxis+=100,
						semiMinorAxis: this.semiMinorAxis+=100,
						rotation: 0,
						granularity: 0.03,
						width: 1,
						show: true
					}
				}
			});
		}

		return ellipses;
	}
}
