let rules = {
    "111": 0,
    "110": 1,
    "101": 1,
    "100": 0,
    "011": 1, // switch back to 0
    "010": 1,
    "001": 1,
    "000": 0,
}

let currentLine = []
let currentLineNumber = 0;
let isRunning = false;
let timer = null;

function setRules(rule) {
    const binaryRule = Number(rule).toString(2).padStart(8, "0");
    console.log(binaryRule);
    rules = {
        "111": Number(binaryRule[0]),
        "110": Number(binaryRule[1]),
        "101": Number(binaryRule[2]),
        "100": Number(binaryRule[3]),
        "011": Number(binaryRule[4]),
        "010": Number(binaryRule[5]),
        "001": Number(binaryRule[6]),
        "000": Number(binaryRule[7]),
    }
    console.log(rules);
}

function handleRuleChange() {
    let rule = document.getElementById("rule").value;

    if (rule == null || parseInt(rule) < 1 || parseInt(rule) > 255) {
        alert("Submit a number between 1 and 255.")
        return;
    }
 
    setRules(rule);
    stop();
    reset();
}

function run() {
    if (currentLineNumber > 100 || timer) {
        stop();
        return;
    }

    if (currentLineNumber === 0) {
        reset();
    }

    timer = window.setInterval(nextGeneration, 10);
}
function reset() {
    document.getElementById("content").innerHTML = "";

    const maximumBlocks = Math.floor(window.innerWidth / getBlockHeight())

    currentLine = Array(maximumBlocks).fill(0);
    currentLine[Math.floor(currentLine.length / 2)] = 1;
    currentLineNumber = 0;
    isRunning = false;
}

function stop() {
    clearInterval(timer);
    timer = null;
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

function getBlockHeight() {
    const tempBlock = createBlock(1);
    document.body.appendChild(tempBlock);
    const height = tempBlock.offsetHeight;
    document.body.removeChild(tempBlock);
    return height;
}

function setCurrentLine(newLine) {
    currentLine = newLine;
}

function getCurrentLine() {
    return currentLine;
}

function nextGeneration(){
    const content = document.getElementById("content");

    if (currentLineNumber > 200 ) {
        stop()
    }

    let paddedLine = [0, ...currentLine, 0];

    if (currentLineNumber > 0) {
        let nextLine = []

        for (let index = 0; index < currentLine.length; index++) {
            nextLine[index] = rules[paddedLine.slice(index, index + 3).join("")];
        }
        
        currentLine = nextLine;
    }
    currentLineNumber += 1;
    displayLine(currentLine);
}

function displayLine(line) {
    const content = document.getElementById("content");
    const lineDiv = document.createElement("div");
    lineDiv.className = "line";

    line.slice().forEach(block => lineDiv.appendChild(createBlock(block)));

    content.appendChild(lineDiv);

    content.scrollTop = content.scrollHeight;
}

addEventListener('keydown', e => {
    if (e.key == " ") nextGeneration();
})

// module.exports = {nextGeneration, setCurrentLine, getCurrentLine};