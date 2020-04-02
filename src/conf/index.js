const conf = {
    'facesTotal': 80,
    'points': {
        'success': 20,
        'fail': 10,
        'clue': 5
    },
    'wording': {
        'credits': {
            'photo': "Photo credits : Martin Schoeller",
            'dev': "Concept and dev : GLWN",
            'disclaimer': "Site created for developpement demo purposes only", 
            'stack': "Stack : JS, React, Redux, Sass" 
        },
        'rules': {
            'good': "Bonne réponse",
            'bad': "Mauvaise réponse",
            'indice': "Indice"
        },
        'slice': {
            'myNameIs': "Mon nom est",
            'showHint': "Voir l'indice"
        },
        'status': {
            'gameover': "Le jeu est terminé, bravo !",
            'oneLeft': "Il ne reste plus qu'une personne à trouver",
            'twoLeft': "Il ne reste plus que deux personnes à trouver",
            'statusDefault': ["Il reste ", " personnes à trouver"]
        }
    }
}

export default conf;