class MediaManager {
    constructor(config) {
        this.scene = config.scene;
    }
    playSound(key) {
        if (mt.model.sfxOn == true) {
            var sound = this.scene.sound.add(key);
            sound.play();
        }
    }
    setBackground(key)
    {
    	if (mt.model.musicOn==true)
    	{
    		this.background=this.scene.sound.add(key,{volume:.5,loop:true});
    		this.background.play();
    	}
    }
    stopMusic()
    {
        if(!this.background) return
    	this.background.stop();
    	this.background.destroy();
    }
}