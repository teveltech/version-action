const core = require('@actions/core');
const {detectProjectType, switchVersionInFile} = require('./src/utils')
const semver = require('semver')


let newVersion = core.getInput('new_version');
let filePath = core.getInput('file_path');

const projectType = detectProjectType(filePath)

if (projectType){
    const cleanVersion = semver.valid(newVersion)
    if(cleanVersion){
        switchVersionInFile(projectType, cleanVersion, filePath)
    }
}



