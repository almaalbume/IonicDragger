import { Directive, Input, ElementRef, Renderer } from '@angular/core';
import { DomController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@Directive({
    selector: '[absolute-drag]'
})
export class AbsoluteDrag {

    @Input('startLeft') startLeft: any;
    @Input('startTop') startTop: any;
    width: number
    height: number

    constructor(
        public element: ElementRef,
        public renderer: Renderer,
        public domCtrl: DomController,
        platform: Platform
    ) {
        this.width = platform.width()
        this.height = platform.height()
    }

    ngAfterViewInit() {

        this.renderer.setElementStyle(this.element.nativeElement, 'position', 'absolute');
        this.renderer.setElementStyle(this.element.nativeElement, 'left', this.startLeft + 'px');
        this.renderer.setElementStyle(this.element.nativeElement, 'top', this.startTop + 'px');

        let hammer = new window['Hammer'](this.element.nativeElement);
        hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_ALL });

        hammer.on('pan', (ev) => {
            this.handlePan(ev);
        });

    }

    handlePan(ev) {


        let newLeft = ev.center.x - 30;
        let newTop = ev.center.y - 90;


        console.log()


        this.domCtrl.write(() => {

            if (newTop <= 0) {
                this.renderer.setElementStyle(this.element.nativeElement, 'top', 5 + 'px');
            } else {
                this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
            }

            console.log(newLeft + "-" + this.width)

            if (newLeft <= 0) {
                this.renderer.setElementStyle(this.element.nativeElement, 'left', 5 + 'px');
            } else if (newLeft >= this.width) {
                this.renderer.setElementStyle(this.element.nativeElement, 'left', (this.width - 70) + 'px');
            } else {
                this.renderer.setElementStyle(this.element.nativeElement, 'left', newLeft + 'px');
            }






        });

    }

}