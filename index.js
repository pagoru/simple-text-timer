/**
 * Created by Pablo on 06 Jun 17.
 */

module.exports = class SimpleTextTimer {

    constructor(obj = {}){
        if(obj.tag !== undefined) this._tag = obj.tag;

        this._paused = (obj.paused === undefined) ? false : obj.paused;
        this._currentValue = ((obj.currentValue === undefined) ? 0 : obj.currentValue);
        this._lastValue = ((obj.lastValue === undefined) ? 60 : obj.lastValue);

        this._increment = this._currentValue < this._lastValue;

        this._loop();
    }

    _loop() {
        if(this._paused) return;

        if(this._tag !== undefined) {
            let elements = document.getElementsByTagName(this._tag);
            if(this._tag.startsWith('.')) elements = document.getElementsByClassName(this._tag.substr(1, this._tag.length - 1));
            if(this._tag.startsWith('#')) elements = document.getElementById(this._tag.substr(1, this._tag.length - 1));
            for (let i = 0; i < elements.length; i++) {
                elements[i].innerHTML = this.getParsedTime();
            }
        }
        if(this._currentValue === this._lastValue) return;
        this._currentValue = this._increment ? this._currentValue + 1 : this._currentValue - 1;
        setTimeout(this._loop.bind(this), 1000);
    }

    play(){
        if(this._paused) {
            this._paused = false;
            this._loop();
        }
    }
    pause(){
        this._paused = true;
    }

    getCurrentValue(){
        return this._currentValue;
    }

    getParsedTime(){
        let sec_num = parseInt(this.getCurrentValue(), 10); // don't forget the second param
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if(hours === 0 && minutes === 0 && seconds === 0) return '0s';
        return (hours === 0 ? "" : `${hours}h `) + (minutes === 0 ? "" : `${minutes}m `) + (seconds === 0 ? "" : `${seconds}s`);
    }

};