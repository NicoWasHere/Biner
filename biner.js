//biner.js -> the control unit of the biner window with a function that will traverse the file system and give the data to the html page
const fs = require('fs');
const os = require('os')
const isValidUTF8 = require('utf-8-validate');

window.onload = () => {
    initFolder()
    traverseDirectory((window.location.search).split('?')[1])
    path = files[index]
    displayFile()
}

let index = 0
let files = []
let path

const traverseDirectory = (dir) => {
        fs.readdirSync(dir).forEach( file=> {
            if(fs.statSync(dir+'/'+file).isDirectory()&&file.substring(file.length-3)!='app'){
                traverseDirectory(dir+'/'+file)
            }
            else if(file == '.DS_Store'||file.substring(file.length-3)=='app'){}
            else{
            files.push(dir+'/'+file)
        }
        })
        
}

const displayFile = () => {
    document.getElementById('file').innerText = path.split('/')[path.split('/').length-1]
    document.getElementById('preview').innerHTML = `<img id = 'displayImage' width = '500px'  src = '${path}'/>`
    document.getElementById('displayImage').addEventListener('error',()=>{
       dispalyNonImage()
    })
    
}

const dispalyNonImage = () => {
    fs.readFile(path,(err,data)=>{
    if(isValidUTF8(data)){
    document.getElementById('preview').innerHTML = `<p id = displayText><p>`
    document.getElementById('displayText').innerText = data.toString()
    }
    else{
        document.getElementById('preview').innerHTML = "<img src = './static/_ionicons_svg_md-document.svg' width = '200px' height = 'auto'/>"
    }
  
})
}

const initFolder = () => {
    if (!fs.existsSync(`${os.homedir()}/Library/Biner`)) {
        fs.mkdirSync(`${os.homedir()}/Library/Biner`);
    }
    if (!fs.existsSync(`${os.homedir()}/Library/Biner/trash`)) {
        fs.mkdirSync(`${os.homedir()}/Library/Biner/trash`);
    }
}

const trueClear = async () =>{
    path = ""
    let dir = fs.readdirSync(`${os.homedir()}/Library/Biner/trash`)
    document.getElementById('file').innerHTML = `<label id = 'permaDelete'>Permanently delete all ${dir.length} files</label>`
    document.getElementById('file').style.marginBottom = '30px' 
    document.getElementById('preview').style.maxHeight = '470px'
    document.getElementById('preview').innerHTML = `<p id = "displayText"></p>`
   dir.forEach(file => { document.getElementById('displayText').innerHTML += file+='<br>'})
    document.getElementById('file').onclick = () => {
        dir.forEach( file=> {
                fs.unlinkSync(`${os.homedir()}/Library/Biner/trash/${file}`)
            })
        document.getElementById('file').innerHTML = '<p>Deleted!</p>'
        document.getElementById('preview').innerHTML = ''
    }
    fs.closeSync()
}


document.addEventListener('keydown',(key) =>{
    if(!key.repeat){
    if(key.code == 'ArrowLeft'){
    // fs.unlinkSync(path)
    let name = path
    name = name.split('/')
    name = name[name.length-1]
    // console.log(name)
    fs.renameSync(path,`${os.homedir()}/Library/Biner/trash/${name}`)
    console.log("Deleted")
    if (index<files.length-1){
        index++
        path = files[index]
        displayFile()
    }
    else { trueClear()}
    }
    else if(key.code == 'ArrowRight'){
    console.log("Not Deleted")
    if (index<files.length-1){
        index++
        path = files[index]
        displayFile()
    }
    else{
        trueClear()
    }
    }
}
})


