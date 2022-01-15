export default class Music {
    constructor(source) {
        this.sound = document.createElement("audio");
        this.sound.src = source
        document.body.appendChild(this.sound);
    }
    setMusic(src) {
        this.sound.src = src;
    }
    play() {
        this.sound.play()
    }
    stop() {
        this.sound.stop()
    }
}