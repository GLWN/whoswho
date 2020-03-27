const shuffle = (array) => { // Fisher-Yates Modern Shuffle
    let i = array.length, rdm, temp;
    
    while(--i > 0) {
        rdm = Math.floor(Math.random() * (i + 1));
        temp = array[rdm];
        array[rdm] = array[i];
        array[i] = temp;
    }
    return array;
}

export default shuffle;