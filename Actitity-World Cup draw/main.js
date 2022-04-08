
//JQuery
$(document).ready(function(){
        $("#simulate-games").attr('disabled','disabled');
        $("#sort-groups").click(function(){
            $("#sort-groups").attr('disabled','disabled');
            $("#simulate-games").removeAttr('disabled','disabled');
            sortTeams();
        });
        $("#simulate-games").click(function(){
            $("#simulate-games").attr('disabled','disabled');
            games();
        });
});
    
const pot = 
        [[["Qatar","Asia"],["Brazil","Sudamerica"],["Belgium","Europa"],["France","Europa"],["Argentina","Sudamerica"],["England","Europa"],["Spain","Europa"],["Portugal","Europa"]],
        [["Mexico","Norteamerica"],["Netherlands","Europa"],["Denmark","Europa"],["Germany","Europa"],["Uruguay","Sudamerica"],["Switzerland","Europa"],["USA","Norteamerica"],["Croatia","Europa"]],
        [["Senegal","Africa"],["Iran","Asia"],["Japan","Asia"],["Morocco","Africa"],["Serbia","Europa"],["Poland","Europa"],["South Korea","Asia"],["Tunisia","Africa"]],
        [["Cameroon","Africa"],["Canada","Norteamerica"],["Ecuador","Sudamerica"],["Saudi Arabia","Asia"],["Ghana","Africa"],["TBD1","Sudamerica"],["TBD2","Oceania"],["TBD3","Europa"]]];

//Place the teams in the pot in the correct order
for (let i=0;i<4;i++){
    for(let j=0;j<8;j++){
    li = document.createElement("li");
    img = document.createElement("img");
    //Flags
    img.src = ("./img/"+pot[i][j][0]+".png").toLowerCase();
    li.appendChild(img);
    //Name
    li.appendChild(document.createTextNode(" " + pot[i][j][0]));
    list = 'pot' + (i+1);
    li.className = "list-group-item";
    document.getElementById(list).appendChild(li);
    }
}
//Shuffe
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
      // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

pot[0].shift();
let team1 = shuffle(pot[0]);
let team2 = shuffle(pot[1]);
let team3 = shuffle(pot[2]);
let team4 = shuffle(pot[3]);
team1.unshift(["Qatar","Asia"]);

let equipos = [[],[],[],[],[],[],[],[]];

//Sort the teams
function sortTeams(){
    let reshuf = false;
    let asia            = 0;
    let norteamerica    = 0;
    let sudamerica      = 0;
    let europa          = 0;
    let africa          = 0;
    let oceania         = 0;
    while(reshuf == false){
        reshuf = true;
        for(let i = 0;i<8;i++){
            equipos[i][0] = team1[i];
            equipos[i][1] = team2[i];
            equipos[i][2] = team3[i];
            equipos[i][3] = team4[i];
        }
        //empezamos a revisar si hay faltas entre  los equipos
        for(let  i = 0; i<8; i++){
            asia            = 0;
            norteamerica    = 0;
            sudamerica      = 0;
            europa          = 0;
            africa          = 0;
            oceania         = 0;
            for(let j = 0; j<4; j++){
                if(equipos[i][j][1] == "Sudamerica"){
                    sudamerica += 1;
                }
                else if(equipos[i][j][1] == "Norteamerica"){
                    norteamerica += 1;
                }
                else if(equipos[i][j][1] == "Europa"){
                    europa += 1;
                }
                else if(equipos[i][j][1] == "Asia"){
                    asia += 1;
                }
                else if(equipos[i][j][1] == "Africa"){
                    africa += 1;
                }
                else if(equipos[i][j][1] == "Oceania"){
                    oceania += 1;
                }
                if(sudamerica >=2 || norteamerica >= 2 || africa >= 2 || asia >= 2 || europa >= 3 || oceania >= 2){
                    reshuf = false;
                }
            }
        }
        if(reshuf == false){
            pot[0].shift();
            team1 = shuffle(pot[0]);
            team2 = shuffle(pot[1]);
            team3 = shuffle(pot[2]);
            team4 = shuffle(pot[3]);
            team1.unshift(["Qatar","Asia"]);
        }
    }
    for(let i = 0;i<8;i++){
        for(let j=0;j<4;j++){
            li = document.createElement("li");
            li.className = "list-group-item";
            img = document.createElement("img");
            group = 'group' + (i+1);
            img.src = ("./img/"+equipos[i][j][0]+".png")
            li.appendChild(img);       
            li.appendChild(document.createTextNode(" " + equipos[i][j][0]));
            document.getElementById(group).appendChild(li);
        }
    }	
}


function score0(){
    return (Math.random()*4.5).toFixed(0);
}

function score1(){
    return (Math.random()*4.2).toFixed(0);
}

let puntos =[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

function tablaPuntos(goals1, goals2, group,equipo1,equipo2){
    //Empate
    if(goals1 == goals2){
        puntos[group][equipo1] += 1;
        puntos[group][equipo2] += 1;
    }
    //Gana equipo 
    if(goals1 > goals2){
        puntos[group][equipo1] += 3;
    }
    else{
        puntos[group][equipo2] += 3;
    }
}

function games(){
    let quaterFinals = [];
    let semiFinals = [];
    let thirdPlace = [];
    let finals = [];

    //Group Fase
        for(let i=0;i<6;i++){
            li = document.createElement("li");
            li.className = "list-group-item";
            for(let j = 0;j < 8;j++){
            if(i == 0){
                let goals1 = score0();
                let goals2 = score1();
                li.appendChild(document.createTextNode(" " + equipos[j][0][0] + " vs " + equipos[j][1][0] + " - " + goals1 + " - " + goals2));
                tablaPuntos(goals1,goals2,j,0,1);
                li.appendChild(document.createElement("br"));
                document.getElementById("game"+(i+1)).appendChild(li);
            }
            if(i == 1){
                let goals1 = score0();
                let goals2 = score1();
                li.appendChild(document.createTextNode(" " + equipos[j][2][0] + " vs " + equipos[j][3][0] + " - " + goals1 + " - " + goals2));
                tablaPuntos(goals1,goals2,j,2,3);
                li.appendChild(document.createElement("br"));
                document.getElementById("game"+(i+1)).appendChild(li);
            }
            if(i == 2){
                let goals1 = score0();
                let goals2 = score1();
                li.appendChild(document.createTextNode(" " + equipos[j][0][0] + " vs " + equipos[j][2][0] + " - " + goals1 + " - " + goals2));
                tablaPuntos(goals1,goals2,j,0,2);
                li.appendChild(document.createElement("br"));
                document.getElementById("game"+(i+1)).appendChild(li);
            }
            if(i == 3){
                let goals1 = score0();
                let goals2 = score1();
                li.appendChild(document.createTextNode(" " + equipos[j][1][0] + " vs " + equipos[j][3][0] + " - " + goals1 + " - " + goals2));
                tablaPuntos(goals1,goals2,j,1,3);
                li.appendChild(document.createElement("br"));
                document.getElementById("game"+(i+1)).appendChild(li);
            }
            if(i == 4){
                let goals1 = score0();
                let goals2 = score1();
                li.appendChild(document.createTextNode(" " + equipos[j][0][0] + " vs " + equipos[j][3][0] + " - " + goals1 + " - " + goals2));
                tablaPuntos(goals1,goals2,j,0,3);
                li.appendChild(document.createElement("br"));
                document.getElementById("game"+(i+1)).appendChild(li);
            }
            if(i == 5){
                let goals1 = score0();
                let goals2 = score1();
                li.appendChild(document.createTextNode(" " + equipos[j][1][0] + " vs " + equipos[j][2][0]+ " - " + goals1 + " - " + goals2));
                tablaPuntos(goals1,goals2,j,1,2);
                li.appendChild(document.createElement("br"));
                document.getElementById("game"+(i+1)).appendChild(li);
            }
        }
    }
    //Define the winner for each group 
    let groupLiders = [];
    let groupSecondPlace = [];
    for (let i = 0; i < 8; i++) {
        groupLiders.push(puntos[i].indexOf(Math.max(...puntos[i])));
        puntos[i][groupLiders[i]] = 0;
        groupSecondPlace.push(puntos[i].indexOf(Math.max(...puntos[i])));
    }
    //CORREGIR PARA FIFA
    //Best 16
    for(let i = 0;i < 8;i++){
        let goals1 = score0();
        let goals2 = score1();
        li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(" " + equipos[i][groupLiders[i]][0] + " vs " + equipos[i][groupSecondPlace[i]][0] + " - " + goals1 + " - " + goals2));
        if(goals1 >= goals2){
            quaterFinals.push(equipos[i][groupLiders[i]][0]);
        }
        else{
            quaterFinals.push(equipos[i][groupSecondPlace[i]][0]);
        }
        li.appendChild(document.createElement("br"));
        document.getElementById("game7").appendChild(li);
    }
    //Quarter Finals
    for(let i=0;i<8;i+=2){
        li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(" " + quaterFinals[i] + " vs " + quaterFinals[i+1] + " - " + score0() + " - " + score1()));
        li.appendChild(document.createElement("br"));
        document.getElementById("game8").appendChild(li);
    }    
    //Semi Finals
    for(let i=0;i<4;i+=2){
        let goals1 = score0();
        let goals2 = score1();
        li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(" " + quaterFinals[i] + " vs " + quaterFinals[i+1] + " - " + goals1 + " - " + goals2));
        if(goals1 >= goals2){
            finals.push(quaterFinals[i]);
            thirdPlace.push(quaterFinals[i+1]);
        }
        else{
            finals.push(quaterFinals[i+1]);
            thirdPlace.push(quaterFinals[i]);
        }
        li.appendChild(document.createElement("br"));
        document.getElementById("game9").appendChild(li);
    }
    //Third Place
    for (let i = 0; i < 2; i+=2) {
        li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(" " + thirdPlace[i] + " vs " + thirdPlace[i+1] + " - " + score0() + " - " + score1()));
        li.appendChild(document.createElement("br"));
        document.getElementById("game10").appendChild(li);
    }
    //Final
    for (let i = 0; i < 2; i+=2) {
        li = document.createElement("li");
        li.className = "list-group-item";
        li.appendChild(document.createTextNode(" " + finals[i] + " vs " + finals[i+1] + " - " + score0() + " - " + score1()));
        li.appendChild(document.createElement("br"));
        document.getElementById("game11").appendChild(li);
    }
}