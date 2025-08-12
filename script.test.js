const {nextGeneration, setCurrentLine, getCurrentLine} = require('./script');

test('1 becomes 11', () => {
    document.body.innerHTML = '<div id="content"></div>';

    setCurrentLine([1]);
    nextGeneration();
    expect(getCurrentLine()).toEqual([1, 1]);
}) 

test('')