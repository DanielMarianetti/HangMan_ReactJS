let words: string[] = [
    "ACCENTURE",
    "REACTJS",
    "CURSO",
    "DEVELOPER",
    "AUTO",
    "CAMIONETA",
    "SERVICENOW",
    "MYTE",
    "QUICKCALL"
]

export function getRandomWord(){
    return words[(Math.floor(Math.random() * words.length))];
}