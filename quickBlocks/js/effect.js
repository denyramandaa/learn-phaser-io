class Effect extends UIBlock{
    constructor(config) {
        super();
        this.scene = config.scene
        const key="effect"+config.effectNumber
        const frameNames = this.scene.anims.generateFrameNumbers(key)
        const animeKey = 'animeKey'+config.effectNumber

        if(!this.scene.anims.anims.has(animeKey)) {
            this.scene.anims.create({
                key: animeKey,
                frames: frameNames,
                frameRate: 32,
                repeat: -1,
                repeat: false
            });
        }

        this.effectImage=this.scene.add.sprite(0,0,key)
        this.add(this.effectImage)
        this.effectImage.on('animationcomplete',this.destroyAnim)
        this.effectImage.play(animeKey)
    }
    destroyAnim() {
        this.destroy()
    }
    static preload(scene, effectNumber) {
        const key = "effect"+effectNumber
        const path = "images/effects/"+effectNumber+".png"
        scene.load.spritesheet(key,path,{frameWidth:100, frameHeight:100})
    }
}