import facesJson from '../faces.json';

let sliceCount = 3;
const maxFaceDisplay = 2;
const availableFaces = [];
let nextCounter = 0;

for(let i = 0; i < facesJson.length; i++) {
    availableFaces.push(i);
}
console.log(availableFaces);

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
// TODO case 2 faces restantes !!!
const buildNewFace = (avFaces) => {
    const faceList = facesJson.flatMap((face) => {
        const faceSliced = [];
        let shuffledFaces = [];
        if(avFaces.length < 3) {
            shuffledFaces = avFaces.sort(() => Math.random() - 0.5);
            sliceCount--;
        }else{
            shuffledFaces = shuffle(avFaces);
        }
        // console.log(shuffledFaces);
        for(let i = 0; i < sliceCount; i++) { // construct each face : HI - MID - LOW pattern
            const {id, firstname, lastname, quote} = facesJson[shuffledFaces[i]];
            faceSliced.push({
                ...face,
                id: id + "-" + i,
                firstname: firstname,
                lastname: lastname,
                quote: quote,
                faceId: parseInt(id),
                sliceId: i,
                try: 0
            });
        }
        return faceSliced;
    }).slice(0, 3);
    return faceList;
}

const initialState = {
    'availableFaces': availableFaces,
    'faces': facesJson,
    'currentFaces': buildNewFace(availableFaces),
    'success': false,
    'points': 0
} 

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case "NEXT_SLICE":
            return {
                ...state,
                'currentFaces': state.currentFaces.map((face) => {
                    if(face.faceId === action.faceId 
                        && face.sliceId === action.sliceId) {
                            return {
                                ...face,
                                faceId: action.faceId < state.availableFaces.length - 1
                                        ?  action.faceId + 1
                                        : 0
                            }
                    }
                    return face;
                })
            }
        case "NEXT_FACE":
            console.log(state);
            return {
                ...state,
                'currentFaces': buildNewFace(state.availableFaces),
                'success': false
            }
        case "SHOW_SUCCESS":
            const successFace = state.currentFaces.flatMap((face) => {
                return {
                    ...face,
                    faceId: action.id
                }
            }) 

            return {
                ...state,
                'points': state.points + 20,
                'success': action.success,
                'currentFaces': successFace,
                'availableFaces': state.availableFaces.filter(faceId => faceId !== action.id)
            }
        case "COUNT_FAIL":
            return {
                ...state,
                'points': state.points - action.points
            }
        case "RESET_APP":
            return {
                ...initialState,
                'currentFaces': buildNewFace(availableFaces)
            }
        default:
            return state;
    }
}

export default appReducer;