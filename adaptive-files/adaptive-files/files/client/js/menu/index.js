import CLOSURES from "../lib/closures";

export class Menu {
    
    static className = "anchor";

    constructor(root) {
        this.root = root;
        this.startOffset = this.root.getBoundingClientRect().top + document.documentElement.scrollTop;
        if(document.documentElement.clientWidth > 600) {
            window.addEventListener('scroll', CLOSURES.delayedFunc(this.collapse.bind(this), 500));
        }
    }

    collapse() {
        const offset = this.startOffset + this.root.offsetHeight;
        if(window.scrollY - offset >= 0) {
            this.root.classList.add(Menu.className);
        }    
        else {
            this.root.classList.remove(Menu.className);
        }
    }
}

export class Expander {
    static expand = "expand";
    static overflowHidden = "overflow-hidden";

    constructor(toggler, expandable) {
        this.expandable = expandable;
        this.toggler = toggler;

        this.toggler.onclick = this.switchState.bind(this);
    }

    switchState() {
        this.expandable.classList.toggle(Expander.expand);
        this.toggler.classList.toggle(Expander.expand);
        document.documentElement.classList.toggle(Expander.overflowHidden);
    }
}