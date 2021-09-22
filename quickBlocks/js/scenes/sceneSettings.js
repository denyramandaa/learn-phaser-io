class SceneSettings extends Phaser.Scene {
    constructor() {
        super('SceneSettings');
    }
    preload() {
        
    }
    create() {
        this.back=this.add.image(0,0,"titleBack")
        this.back.setOrigin(0,0)
        this.back.displayWidth=game.config.width
        this.back.displayHeight=game.config.height

        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        })
        this.aGrid.showNumbers()

        this.btnSound = new TextButton({
            scene:this,
            eventEmit:mt.constants.TOGGLE_SOUND,
            params:this.scene,
            key:"btnGreen",
            text:"",
            scale:0.35,
            textScale:25,
            textColor:'#fff'})
        this.aGrid.placeAtIndex(27, this.btnSound)

        this.btnMusic = new TextButton({
            scene:this,
            eventEmit:mt.constants.TOGGLE_MUSIC,
            params:this.scene,
            key:"btnGreen",
            text:"",
            scale:0.35,
            textScale:25,
            textColor:'#fff'})
        this.aGrid.placeAtIndex(60, this.btnMusic)

        this.btnBackToHome = new TextButton({
            scene:this,
            eventEmit:mt.constants.GO_HOME,
            params:this.scene,
            key:"btnGreen",
            text:"Back to Home",
            scale:0.35,
            textScale:25,
            textColor:'#fff'})
        this.aGrid.placeAtIndex(93, this.btnBackToHome)

        mt.emitter.on(mt.constants.MUSIC_CHANGED, this.updateButtons, this)
        mt.emitter.on(mt.constants.SOUND_CHANGED, this.updateButtons, this)

        this.updateButtons()
    }
    updateButtons() {
        var soundText = mt.model.sfxOn ? 'Sound On' : 'Sound Off'
        var soundMusic = mt.model.musicOn ? 'Music On' : 'Music Off'

        this.btnSound.textField.setText(soundText)
        this.btnMusic.textField.setText(soundMusic)
    }
    update() {}
}