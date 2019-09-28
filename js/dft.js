function calculate_w(N, n,k){
    scope = {
        Nd: N,
        nd: n,
        kd: k
    }
    math.evaluate('w = e^(-i*tau*kd*(nd/Nd))', scope);
    return scope.w;
}

function mainCalculate(x){
    let xArr=[];
    let i, j;
    let sum=math.complex(0,0);
    let temp=0, temp2;
    for(i=0; i < precision; i++){
        temp=0;
        for(j=0; j< x.length-1; j++){
            temp2 = calculate_w(precision, j, i);
            temp = math.add(temp2, temp);
        }
        xArr.push(temp);
    }
    return xArr;
}

function parseFile(file){
    let alex = parse(file);
    let x = [];
    let y=[];
    let i, j;
    for(i=0; i<alex.commands.length; i++){
        for(j=0; j< alex.commands[i].p['x'].length;j++){
            x.push(alex.commands[i].p['x'][j]);
        }
    }
    return mainCalculate(x, y);
}
