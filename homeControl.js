//homeControl.js -> the backend for the home hub. Lets the user open up the file tinder for the folder
const shell = require('electron').shell
const os = require('os')

let path

let button = document.getElementById('getButton')
button.webkitdirectory = true
button.onchange = () => handleFileSelection()

const handleFileSelection = () =>{
    let tempPath = button.files[0].path
    tempPath = tempPath.split('/')
    path = ""
    for(let a = 1; a<tempPath.length-1; a++){
        path = path +'/'+ tempPath[a]
    }
    window.location.replace(`biner.html?${path}`)
}

