import { modalTemplate } from '../templates/pauseModal';
import "../../css/modal.styl";
export class Modal {
    constructor() {
        this.dom = this.init();
        Modal.instance = this;
        this.bind();
    }
    init() {
        const div = document.createElement('div');
        div.innerHTML = modalTemplate;
        document.body.appendChild(div);
        return div;
    }
    bind() {
        const [yesButton, NoButton] = Array.prototype.slice.call(this.dom.getElementsByTagName('button'));
        yesButton.addEventListener('click', Modal.hide);
        NoButton.addEventListener('click', Modal.hide);
    }
    show() {
        this.dom.style.display = "block";
        Modal.showing = true;
    }
    hide() {
        this.dom.style.display = "none";
        Modal.showing = false;
    }
    static show(next) {
        if (!Modal.showing) {
            const ins = Modal.instance;
            if (ins) {
                ins.show();
            }
            else {
                Modal.instance = new Modal();
            }
            Modal.showing = true;
            // Modal.onHideFunction();
        }
    }
    static hide() {
        if (Modal.showing) {
            const ins = Modal.instance;
            if (ins) {
                ins.hide();
            }
            else {
                Modal.instance = new Modal();
                Modal.instance.hide();
            }
            Modal.showing = false;
            Modal.onHideFunction();
        }
    }
    static onHide(func) {
        Modal.onHideFunction = func;
    }
}
Modal.showing = false;
Modal.instance = null;
Modal.onShowFunction = () => { };
Modal.onHideFunction = () => { };
