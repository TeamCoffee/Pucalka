class spritesheetMaker{
    static background1(){
        return new spritesheet(
            "../images/background2.png",
            new vector(1125,700),
            new vector(1,1));
    }
    static background2(){
        return new spritesheet(
            "../images/background3.png",
            new vector(2250,700),
            new vector(1,1));
    }
    static background3(){
        return new spritesheet(
            "../images/background4.png",
            new vector(4500,700),
            new vector(1,1));
    }
    static player1(){
        return new spritesheet(
            "../images/mainPlayer.png",
            new vector(992,614),
            new vector(6,1));
    }
}