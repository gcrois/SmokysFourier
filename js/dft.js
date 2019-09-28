function calculate_w(N, n,k){
    scope = {
        Nd: N,
        nd: n,
        kd: k
    }
    math.evaluate('w = e^(-i*tau*kd*(nd/Nd))', scope);
    return scope.w;
}

function mainCalculate(x,y){
    let xArr=[], yArr =[];
    let i,j;
    let sum=math.complex(0,0);
    let temp=0, temp2;
    console.log(x);
    for(i=0; i<y.length-1; i++){
        temp=0;
        for(j=0; j<y.length-1; j++){
            temp2 = math.multiply(calculate_w(20, j, i),y[j]);
            temp = math.add(temp2, temp);
        }
        yArr.push(temp);
        sum = math.add(temp, sum);
    }
    for(i =0; i< x.length-1; i++){
        temp=0;
        for(j=0; j<y.length-1; j++){
            temp2 = math.multiply(calculate_w(20, j, i),x[j],sum);
            temp = math.add(temp2, temp);
        }
        xArr.push(temp);
    }
    val = {xarr: xArr, yarr:yArr};
    return val;
}

function parseFile(file){
    let alex = parse(file);
    let x = [];
    let y=[];
    let i, j, z;
    for(i=0; i<alex.commands.length; i++){
        for(j=0; j< alex.commands[i].p['x'].length;j++){
            x.push(alex.commands[i].p['x'][j]);
            y.push(alex.commands[i].p['y'][j]);
        }
    }
    return mainCalculate(x, y);
}
