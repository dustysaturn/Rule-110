const rules = {
    "111": 0,
    "110": 1,
    "101": 1,
    "100": 0,
    "011": 1,
    "010": 1,
    "001": 1,
    "000": 0,
}

let currentState = [[1],]
let currentLine = 0;
let isRunning = false;

function run(){
    timer = setInterval(nextGeneration, 10);

    // console.log("run")
    // isRunning = true;
    // while(isRunning) {
    //     nextGeneration();
        
    // }
    if (currentLine > 100) {
        stop()
        return;
    }
}

function stop() {
    clearInterval(timer);
}

function createBlock(alive) {
    const block = document.createElement("div");

    if (alive == 1) {
        block.className = "blackSquare";
    }
    else{
        block.className = "whiteSquare";
    }

    return block;
}

function nextGeneration(){
    console.log("nextGeneration")
    const blocks = document.getElementById("content");
    const line = document.createElement("div");
    line.className = "line";

    if(currentLine == 0) {
        line.append(createBlock(1), createBlock(1));
        currentState.push([1, 1]);
    }
    else if(currentLine == 1) {
        line.append(createBlock(1), createBlock(1), createBlock(1));
        currentState.push([1, 1, 1]);
    }
    else {
        let nextLine = []
        const paddedCurrentLine = [0, 0, ...currentState[currentLine], 0];
        for (let index = 0; index < paddedCurrentLine.length - 2; index++) {
            const numString = paddedCurrentLine.slice(index, (index + 3)).join("");
            const outputBlock = rules[numString];

            line.append(createBlock(outputBlock));
            nextLine.push(outputBlock);
        }
        currentState.push(nextLine);
    }

    currentLine += 1;
    blocks.append(line)
}