import facesJson from '../conf/faces.json'
import shuffle from '../utils/shuffle'

const availableFaces = [];
const winPoints = 20;

for(let i = 0; i < facesJson.length; i++) {
    availableFaces.push(i);
}

const buildNewFace = (avFaces) => {
    const shuffledFaces = shuffle(avFaces);
    const faceSliced = [];
    const pushSlice = () => shuffledFaces.push(shuffledFaces[0]);

    if(avFaces.length === 2) pushSlice();
    if(avFaces.length === 1) {
        pushSlice();
        pushSlice();
    }

    for(let i = 0; i < 3; i++) {
        const {id, firstname, lastname, nickname, quote} = facesJson[shuffledFaces[i]];
        
        faceSliced.push({
            id: id + "-" + i,
            firstname: firstname,
            lastname: lastname,
            nickname: nickname,
            quote: quote,
            faceId: parseInt(id),
            sliceId: i
        })
    }
    return faceSliced;
}

const initialState = {
    'availableFaces': availableFaces,
    'faces': facesJson,
    'currentFaces': buildNewFace(availableFaces),
    'success': false,
    'rulesAreShown': false,
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
            return {
                ...state,
                'availableFaces': state.availableFaces.slice(0, state.availableFaces.length),
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
                'points': state.points + winPoints,
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
        case "HANDLE_RULES":
            return {
                ...state,
                'rulesAreShown': !state.rulesAreShown
            }
        default:
            return state;
    }
}

export default appReducer;