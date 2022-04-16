import { Menu, Expander } from './js/menu/index.js';
import DOM from './js/lib/dom.js';
import CLOSURES from './js/lib/closures.js';
import Slider from './js/slider/index.js';

let menuList = DOM.findElements(".header-menu").map(item => new Menu(item));
let expanderList = DOM.findElements(".expander-wrapper").map(item => new Expander(item, DOM.nextNeighbor(item)));
let sliderList = DOM.findElements(".slider-container").map(item => new Slider(item));