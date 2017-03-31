import {modalTemplate} from '../templates/pauseModal';
import "../../css/modal.styl";

export class Modal {
    private static showing: boolean = false;
    private static instance: Modal = null;
    private dom: HTMLElement;
    private static onShowFunction:Function = ()=>{};
    private static onHideFunction:Function = ()=>{};
    constructor() {
        this.dom = this.init();
        Modal.instance = this;
        this.bind();
    }

    private init(): HTMLElement {
        const div = document.createElement('div');
        div.innerHTML = modalTemplate;
        document.body.appendChild(div);
        return div;
    }

    private bind() {
        const [yesButton, NoButton] = Array.prototype.slice.call(this.dom.getElementsByTagName('button'));
        yesButton.addEventListener('click', Modal.hide);
        NoButton.addEventListener('click', Modal.hide);
    }

    private show() {
        this.dom.style.display = "block";
        Modal.showing = true;
    }

    private hide() {
        this.dom.style.display = "none";
        Modal.showing = false;
    }

    public static show(next?: Function) {
        if (!Modal.showing) {
            const ins = Modal.instance;
            if (ins) {
                ins.show();
            } else {
                Modal.instance = new Modal();
            }
            Modal.showing = true;
            // Modal.onHideFunction();
        }
    }

    public static hide() {
        if (Modal.showing) {
            const ins = Modal.instance;
            if (ins) {
                ins.hide();
            } else {
                Modal.instance = new Modal();
                Modal.instance.hide();
            }
            Modal.showing = false;
            Modal.onHideFunction();
        }
    }

    public static onHide(func:Function) {
        Modal.onHideFunction = func;
    }

}