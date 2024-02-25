export class ActiveRout {
    static get path() {
        return window.location.hash.slice(1); // current url
    };

    static get param() {
        return ActiveRout.path.split('/')[1];
    };
};