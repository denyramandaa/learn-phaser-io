class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
    	//load our images or sounds 
        this.load.spritesheet("blocks", "images/blocks.png", {frameWidth:64,frameHeight:84})
        this.load.image("btnPlayAgain","images/btnPlayAgain.png")

        this.load.audio("right", "audio/right.wav")
        this.load.audio("wrong", "audio/wrong.wav")
        this.load.audio("levelUp", "audio/levelUp.wav")
      
    }
    create() {
        mt.mediaManager.playMusicBackground("backsound")
        this.blockGroup=this.add.group()
        this.clickLock=false
        this.colorArray=[]
        this.centerBlock=null

        for(var i=0;i<25;i++) {
            var color = Phaser.Math.Between(0,mt.model.numberOfColors)
            this.colorArray.push(color)
        }
        console.log(this.colorArray)
       //define our objects
       var xx=0;
       var yy=0;
       var k=0;
       for(var i=0;i<5;i++) {
           for(var j=0;j<5;j++) {
                var block = this.add.image(0,0,"blocks");
                this.blockGroup.add(block)
                block.displayWidth = game.config.width/5
                block.displayHeight = game.config.height/5
                block.setFrame(this.colorArray[k])
                // block.setOrigin(0,0)
                block.x=xx+block.displayWidth/2;
                block.y=yy+block.displayHeight/2;
                if(i==2 && j==2) {
                    this.centerBlock=block
                }
                else {
                    block.setInteractive()
                }
                xx+=block.displayWidth;
                k++;
           }
           xx=0;
           yy+=block.displayHeight;
       }
       this.colorArray[12]=-1
       this.pickColor()

       this.input.on("gameobjectdown", this.selectBlock, this)

       this.timer=new CircleTimer({scene:this})
       this.timer.x=this.centerBlock.x
       this.timer.y=this.centerBlock.y
       this.timer.setCallback(this.timeUp,this)
       this.timer.start()

       this.scoreText=this.add.text(0,0, "0", {fontSize:game.config.width/10, color:'#000'})
       this.scoreText.setOrigin(0.5,0.5)
       Align.center(this.scoreText)
    }
    timeUp() {
        this.doGameOver()
    }
    selectBlock(pointer, block) {
        if(this.clickLock) return
        if(this.centerBlock.frame.name === block.frame.name) {
            block.removeInteractive();
            this.fall(block)
            this.pickColor()
            const effect = new Effect({scene:this,effectNumber:17})
            effect.x=block.x;
            effect.y=block.y;
            mt.mediaManager.playSound("right")
            mt.model.score++;
            this.scoreText.setText(mt.model.score)
        } else {
            mt.mediaManager.playSound("wrong")
            this.doGameOver()
            return
        }
        this.timer.reset()
    }
    fall(block) {
        this.tweens.add({targets: block, duration:1000, scaleX:0, scaleY:0})
    }
    pickColor() {
        if(this.colorArray.length==0) {
            mt.mediaManager.playSound("levelUp")
            console.log('next level')
            mt.model.numberOfColors++
            if(mt.model.numberOfColors>7) mt.model.numberOfColors=7
            mt.mediaManager.stopMusicBackground()
            this.scene.restart()
            return
        }
        // var color=this.colorArray.shift()
        var index = Phaser.Math.Between(0, this.colorArray.length-1)
        var color = this.colorArray.splice(index,1)[0]
        if(color==-1) {
            this.pickColor()
            return
        }
        this.centerBlock.setFrame(color)
    }
    doGameOver() {
        mt.mediaManager.stopMusicBackground()
        this.clickLock = true
        this.timer.stop()
        this.timer.visible = false
        this.blockGroup.children.iterate(function(child) {
            this.fall(child);
        }.bind(this))
        this.time.addEvent({ delay: 1200, callback: this.doGameOverScene, callbackScope: this, loop: false });
    }
    doGameOverScene() {
        this.scene.start("SceneOver")
    }
    update() {
        //constant running loop
    }

}