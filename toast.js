/*!
 * Toast v1.0.0
 * Super light material dialog
 * by Marco Giannini
 */

/* jshint esversion: 6 */
class Toast{
    constructor(message, type){
        let el = this;
        this.message = message;
        this.type = type;
        this.toast = '';
        this.htmlButtons = document.createElement('div');
        this.debug = false;
        this.defaultTimeout = 12 * 1000;
        this.return = '';
        this.choice = [];
        this.choice.success = {
            label: 'Accetta',
            callback: el.hide,
            arguments: undefined,
            self: el
        };
        this.choice.deny = {
            label: 'Rifiuta',
            callback: el.hide,
            arguments: undefined,
            self: el
        };

        this.createNode = function(){
            let toast = document.createElement('div');
            let text = document.createElement('p');
            text.appendChild(document.createTextNode(this.message));
            toast.appendChild(text);
            toast.classList.add('toast');
            this.toast = toast;
        };

        this.addClassNode = function(){
            switch (this.type) {
                case 'dialog':
                this.toast.classList.add('toast--dialog');
                break;
                default:
                this.toast.classList.add('toast--confirm');
                break;
            }
        };

        this.createNode();
        this.addClassNode();
    }

    get timeout(){
        if(this.debug){
            return 1000 * 1000;
        } else {
            return this.defaultTimeout;
        }
    }

    addChoice(option){
        let choice = document.createElement('a');
        choice.appendChild(document.createTextNode(option.label));
        choice.classList.add('toast_choice');
        choice.addEventListener('click', () => {
            let callback = option.callback;
            if(callback && typeof(callback) === "function") {
                if(this.hide !== callback){
                    if(option.arguments !== undefined){
                        callback(option.arguments);
                    } else {
                        callback();
                    }
                    setTimeout( () => {
                        this.hide();
                    }, 1000);
                } else {
                    this.hide();
                }
            }
        });
        this.htmlButtons.appendChild(choice);
        this.toast.appendChild(this.htmlButtons);
    }

    show(){
        this.addChoice(this.choice.success);
        this.addChoice(this.choice.deny);
        document.body.appendChild(this.toast);
        setTimeout( () => {
            this.hide();
        }, this.timeout);
    }

    hide(self){
        if(self === undefined){
            self = this;
        }
        self.toast.classList.add('toast--hidden');
        setTimeout( self.remove(), 500);
    }

    remove(){
        this.toast.remove();
    }
}
