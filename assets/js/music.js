export default class Music {
    constructor(source) {
        this.sound = document.createElement("audio");
        document.body.appendChild(this.sound);
        this.sound.src = source
    }
    setMusic(src) {
        this.sound.src = src;
    }
    play() {
        this.sound.play()
    }
    stop() {
        this.sound.pause()
    }
}