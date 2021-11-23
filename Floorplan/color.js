var plan = require('fs').readFileSync('./plan4.txt', 'utf-8')
    .split('\r\n')
    .filter(Boolean);

var plan2d = [];
plan.forEach(v=>plan2d.push(v.split('')))
var xl = plan2d.length;
var yl = plan2d[0].length;

function isDoor(x,y){
    if(plan2d[x][y] === '#') return false;
    if(
        (
            (x-1 >= 0 && plan2d[x-1][y] === '#') &&
            (x+1 < xl && plan2d[x+1][y] === '#') 
        )||
        (
            (y+1 < yl && plan2d[x][y+1] === '#') &&
            (y-1 >= 0 && plan2d[x][y-1] === '#') 
        )
    ){ return true; }
    return false;
}
color = 31;
for(i=1;i<xl;i++){
    for(j=1;j<yl;j++){
        if(!isDoor(i,j) && plan2d[i][j] === ' '){
            //check if there are nearby cells with color to up down left right
            // if so, paint it with same color, else get a new color.
            if(i-1 >= 0 && plan2d[i-1][j] !== '#' && plan2d[i-1][j] !== ' '){
                plan2d[i][j] = plan2d[i-1][j];
            }else 
            if(i+1 < xl && plan2d[i+1][j] !== '#' && plan2d[i+1][j] !== ' '){
                plan2d[i][j] = plan2d[i+1][j];
            }else 
            if(j-1 >= 0 && plan2d[i][j-1] !== '#' && plan2d[i][j-1] !== ' '){
                plan2d[i][j] = plan2d[i][j-1];
            }else
            if(j+1 < yl && plan2d[i][j+1] !== '#' && plan2d[i][j+1] !== ' '){
                plan2d[i][j] = plan2d[i][j+1];
            }else{
                plan2d[i][j] = color++;
            }
        }
    }
}

for(i=0;i<xl;i++){
    console.log();
    for(j=0;j<yl;j++){
        if(plan2d[i][j] !== '#' && !isDoor(i,j)){
            process.stdout.write('\x1b['+plan2d[i][j]+'m'+'@'+'\x1b[0m'+' ');
        }else{
            process.stdout.write(plan2d[i][j]+' ');
        }
    }
}