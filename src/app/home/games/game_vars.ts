export class GameVariable{

    constructor() {}
//global
    public standardScreenWidth = 1400;
    public standardscale = 0.4;
    public timeLeft = 120;
    public timeLeftString = "02:00";

//first
    public formaPos = 2;
    public numPos = 3;      
    public pos = [{
        "x": 0.33,
        "y":0.07
    }, {
        "x": 0.4,
        "y": 0.07
    }, {
        "x": 0.47,
        "y": 0.07
    }, {
        "x": 0.54,
        "y": 0.07
    }, {
        "x": 0.61,
        "y": 0.07
    }, {
        "x": 0.68,
        "y": 0.07
    }]
//second
    public s_keyPos = 3.5;
    public s_formaPos = 2.5;
    public s_scale = 0.5;
}