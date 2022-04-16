import DOM from "../lib/dom.js";
import { debounce } from "debounce";
import CLOSURES from "../lib/closures.js";

export default class Slider {

    static SLIDE_DELAY = 10000;
    static RESIZE_DELAY = 500;

    constructor(root, delay) {

        this.root = root;
        this.delay = delay ?? Slider.SLIDE_DELAY;
        this.items = Array.prototype.slice.call(root.querySelectorAll(".slider-item"));
        this.currentItem = 0;

        this.bindScrollButtons();
            
        window.addEventListener("resize", debounce(DOM.SM.bind(this, 
            () => (this.currentPosition = this.halfRoundPosition).call(this), 
            () => (this.currentPosition = this.roundPosition).call(this)), Slider.RESIZE_DELAY));
        window.dispatchEvent(new Event("resize"));

        this.activeItemDelayed = CLOSURES.awaitFunc(this.changeActiveItem.bind(this), 500);
    }

    changeActiveItem(index) {
        this.restartInterval();
        if (this.currentItem === index) return;
        this.currentItem = index;
        this.currentPosition();
    }

    nextActiveItem() {
        this.activeItemDelayed((this.currentItem + 1) % this.items.length);
    }

    previousActiveItem() {
        this.activeItemDelayed((this.currentItem - 1 + this.items.length) % this.items.length);
    }

    startInterval() {
        this.interval = setTimeout(this.nextActiveItem.bind(this), this.delay);
    }

    restartInterval() {
        this.stopInterval();
        this.startInterval();
    }

    stopInterval() {
        clearTimeout(this.interval);
    }

    createSwitchButtons() {
        this.buttonContainer = this.root.querySelector('.slider-buttons-container');

        this.buttons = this.items.map((item, index) => {
            const button = document.createElement('button');
            button.className = "btn slider-button";
            button.onclick = this.changeActiveItem.bind(this, index);
            this.buttonContainer.appendChild(button);
            return button;
        });
    }

    bindScrollButtons() {
        this.nextButton = this.root.querySelector("[data-scroll='next']");
        this.nextButton.onclick = this.nextActiveItem.bind(this);

        this.previousButton = this.root.querySelector("[data-scroll='previous']");
        this.previousButton.onclick = this.previousActiveItem.bind(this);
    }

    roundPosition() {

        this.root.classList.toggle("half-round", false);

        const step = Math.PI * 2.0 / this.items.length;
        const halfWidth = this.root.clientWidth * 0.5;
        const halfHeight = this.root.clientHeight * 0.5;
        this.items.forEach((item, index) => {
            const offsetX = halfWidth - item.offsetWidth * 0.5;
            const offsetY = halfHeight - item.offsetHeight * 0.5;
            const indexWithOffset = (index + this.currentItem) % this.items.length;
            let x = -Math.sin(indexWithOffset * step) * offsetX + offsetX;
            let y = offsetY;
            let z = -Math.cos(indexWithOffset * step) * offsetX + offsetX;

            item.style.transform = `translate3d(${x}px, ${y}px, ${-z}px)`;
        });
    }

    halfRoundPosition() {

        this.root.classList.toggle("half-round", true);

        const width = this.root.clientWidth;
        const halfWidth = width * 0.5;
        const height = this.root.clientHeight;
        const halfHeight = height * 0.5;
        const fullWidth = this.items.reduce((s, t) => s + t.offsetWidth, 0);
        const halfFullWidth = fullWidth * 0.5;
        this.items
            .map((t, i) => (i + this.currentItem) % this.items.length)
            .reduce((sum, i) => {
                const offsetX = halfWidth - this.items[this.currentItem].offsetWidth * 0.5;
                const itemWidth = this.items[i].offsetWidth;
                const offsetY = halfHeight - this.items[i].offsetHeight * 0.5;
                let x = (sum + halfFullWidth) % fullWidth - halfFullWidth + offsetX;
                let y = offsetY;
                let z = 0;

                this.items[i].classList.toggle("without-transition", false);
                if(x <= -itemWidth || x >= width) {
                    this.items[i].classList.toggle("without-transition", true); 
                }

                this.items[i].style.transform = `translate3d(${x}px, ${y}px, ${-z}px)`;
                
                return sum + this.items[i].offsetWidth;
            }, 0);
    }
}