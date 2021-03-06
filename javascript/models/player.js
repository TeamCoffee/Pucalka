//Depends on vector
//Depends on gameObject
//Depends on spritesheet
class player extends gameObject {
    constructor(pos, size, playerSpritesheet, speed) {
        super(pos, size);
        this.spritesheet = playerSpritesheet;
        this.speed = speed;
        this.spriteTimer = 0;
        this.moving = {
            left:false,
            right:false,
            up:false,
            down:false,
        };
        this.health=100;
        this.shootingTimer=0;
        this.shootingSpeed=10;
    }
    
    get spritesheet() {
        return this._spritesheet;
    }

    set spritesheet(value) {
        if (!(value instanceof spritesheet)) {
            throw new Error('Passed argument should be of type spritesheet');
        }

        this._spritesheet = value;
    }

    get speed() {
        return this._speed;
    }

    set speed(value) {
        if (!(value instanceof vector)) {
            throw new Error('Player Speed must be a vector');
        }

        this._speed = value;
    }
    
    get health(){
        return this._health;
    }
    
    set health(value){
        if(!typeof(value)=="number"){
            throw new Error("Passed value should be number");
        }
        
        this._health=value;
    }
    
    playerUpdatePosition(isPressedFunction) {
        if (isPressedFunction(37) === 1 || isPressedFunction("a")) {
            this.pos.x -= this.speed.x;
            this.moving.left=true;
        }
        if (isPressedFunction(39) === 1 || isPressedFunction("d")) {
            this.pos.x += this.speed.x;
            this.moving.right=true;
        }
        if (isPressedFunction(38) === 1 || isPressedFunction("w")) {
            this.pos.y -= this.speed.y;
            this.moving.up=true;
        }
        if (isPressedFunction(40) === 1 || isPressedFunction("s")) {
            this.pos.y += this.speed.y;
            this.moving.down=true;
        }
    }

    update(isPressedFunction,bulletHolder) {
        if(this.health<100){
            this.health+=1;
        }
        
        this.moving = {
            left:false,
            right:false,
            up:false,
            down:false,
        }
        
        this.playerUpdatePosition(isPressedFunction);
        
        if(this.shootingTimer>0){
            this.shootingTimer-=1;
        }
        
        if(isPressedFunction(32) && this.shootingTimer==0){
            this.shootingTimer=this.shootingSpeed;
            
            bulletHolder1.add(bulletMaker.bullet1(
                new vector(this.pos.x+120,this.pos.y+35),
                new vector(4,0)));
        }
    }

    /*calculateSpriteN() {
        var spriteN = Math.floor(this.spriteTimer) %
            this.spritesheet.allSpritesCount();
        return spriteN;
    }*/

    drawPlayerSprite(context){
        var drawn=false;
        //context.fillStyle = "green";
        //context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
        
        if(this.moving.left && !drawn){
            if(this.moving.down){
                this.spritesheet.drawSprite(
                    this.pos,
                    this.size,
                    4,
                    context);
            }else if(this.moving.up){
                this.spritesheet.drawSprite(
                    this.pos,
                    this.size,
                    2,
                    context);
            }else{
                this.spritesheet.drawSprite(
                    this.pos,
                    this.size,
                    0,
                    context);
            }   
            drawn=true;
        }
        
        if(this.moving.right && !drawn){
            if(this.moving.down){
                this.spritesheet.drawSprite(
                    this.pos,
                    this.size,
                    5,
                    context);
            }else if(this.moving.up){
                this.spritesheet.drawSprite(
                    this.pos,
                    this.size,
                    3,
                    context);
            }else{
                this.spritesheet.drawSprite(
                    this.pos,
                    this.size,
                    1,
                    context);
            }
            drawn=true;
        }
        
        if(this.moving.up && !drawn){
            this.spritesheet.drawSprite(
                this.pos,
                this.size,
                2,
                context);
            drawn=true;
        }
        
        if(this.moving.down && !drawn){
            this.spritesheet.drawSprite(
                this.pos,
                this.size,
                4,
                context);
            drawn=true;
        }
        
        
        if(!drawn){
            this.spritesheet.drawSprite(
                this.pos,
                this.size,
                0,
                context);
            drawn=true;
        }
    }
    
    drawPlayerInfo(context){
        context.fillStyle="#2c3e50";
        context.fillRect(0,canvas.height-30,canvas.width,30);
        context.fillStyle="#e74c3c";
        context.fillRect(0,canvas.height-30,this.health/100*canvas.width,15)
        
        context.fillStyle="#f1c40f";
        context.fillRect(
            0,
            canvas.height-15,
            (this.shootingSpeed-this.shootingTimer)/
            this.shootingSpeed*canvas.width,
            15)
    }
    
    draw(context){
        this.drawPlayerSprite(context);
        this.drawPlayerInfo(context);
        //super.draw(context);
    }

    // draw(context) {
    //     context.fillStyle = "red";

    //     context.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    //     super.draw(context);

    //     context.fillStyle = "black";
    // }

}