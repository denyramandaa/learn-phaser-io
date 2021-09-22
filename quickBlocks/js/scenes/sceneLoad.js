class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }
    preload() {
        this.textProgress=this.add.text(0,0,"0%",{color: "#fff", fontSize:game.config.width/10})
        this.textProgress.setOrigin(0.5,0.5)
        Align.center(this.textProgress)

        Effect.preload(this,17)

        this.load.on("progress", this.showProgress, this)
        this.load.image("btnStart", "images/btnStart.png")
        this.load.image("titleBack", "images/titleBack.jpg")

        this.load.image("btnBlue","images/buttons/blue.png")
        this.load.image("btnRed","images/buttons/red.png")
        this.load.image("btnOrange","images/buttons/orange.png")
        this.load.image("btnGreen","images/buttons/green.png")

        this.load.audio('backsound', "audio/background.mp3")
    }
    create() {
        mt.mediaManager=new MediaManager({scene:this})
        mt.emitter=new Phaser.Events.EventEmitter()
        mt.controller=new Controller()
        
        this.scene.start("SceneTitle")
    }
    showProgress(counter) {
        const per = Math.floor((counter/1)*100)
        this.textProgress.setText(per+"%")
    }
    update() {}
}