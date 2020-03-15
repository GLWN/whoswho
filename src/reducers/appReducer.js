import facesJson from '../faces.json';

const sliceCount = 3;
const maxFaceDisplay = 2;
const availableFaces = [];
const initialState = {};
let nextCounter = 0;

for(let i = 0; i < facesJson.length; i++) {
    availableFaces.push(i);
}
initialState.availableFaces = availableFaces;

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

// v1.0 // show in order
// initialState.faces = facesJson.flatMap((face) => {
//     const faceSliced = [];

//     for(let i = 0; i < sliceCount; i++) {
//         faceSliced.push({
//             ...face,
//             id: face.id + "-" + i,
//             sliceIndex: i,
//             success: false,
//             try: 0
//         });
//     }
//     return faceSliced;
// });

const randomizeFaces = (faceList) => {
    const data = faceList.flatMap((face) => {
        const faceSliced = [];
        const shuffledFaces = shuffle(availableFaces);
    
        for(let i = 0; i < sliceCount; i++) { // construct each face : HI - MID - LOW pattern
            // const randomId = "face_" + Math.floor(Math.random() * Math.floor(facesJson.length));
    
            faceSliced.push({
                ...face,
                id: "face_" + shuffledFaces[i] + "-" + i,
                sliceIndex: i,
                success: false,
                try: 0
            });
        }
        return faceSliced;
    });

    return data;
}

initialState.faces = facesJson.flatMap((face) => {
    const faceSliced = [];
    const shuffledFaces = shuffle(availableFaces);

    for(let i = 0; i < sliceCount; i++) { // construct each face : HI - MID - LOW pattern
        // const randomId = "face_" + Math.floor(Math.random() * Math.floor(facesJson.length));

        faceSliced.push({
            ...face,
            id: "face_" + shuffledFaces[i] + "-" + i,
            sliceIndex: i,
            success: false,
            try: 0
        });
    }
    return faceSliced;
});
// }).slice(0,18); // we display two faces only, i.e. 6 slices
console.log("#####");
console.log(initialState.faces);

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_NEW_FACES':
            console.log('ADD');
            console.log(state);
            nextCounter++;
            if(nextCounter > 4) {
                nextCounter = 0;
                return {
                    ...state,
                    'faces' : [
                        ...state.faces,
                        randomizeFaces(facesJson)[0]
                    ]
                }
            // } else if (state.faces.length > 19) {
            //                     return {
            //         ...state,
            //         'faces' : [
            //             ...initialState.faces
            //         ]
            //     }
            } else {
                return state;
            }
        case 'REMOVE_OLD_FACES':
            return {
                ...state,
                'faces': state.faces.slice(3)
            }
        default:
            return state;
    }
}

export default appReducer;