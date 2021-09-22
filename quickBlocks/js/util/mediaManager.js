class MediaManager {
    constructor(config) {
        this.scene = config.scene
    }
    playSound(key) {
        if(!mt.model.sfxOn) return
        var sound = this.scene.sound.add(key)
        sound.play()
    }
    playMusicBackground(key) {
        if(!mt.model.musicOn) return
        this.background=this.scene.sound.add(key,{volume:5,loop:true});
        this.background.play()
    }
    stopMusicBackground () {
        this.background.stop()
        this.background.destroy()
    }

}