const core = require('@actions/core');
const {detectProjectType, switchVersionInFile, packageTypes} = require('./src/utils')
const semver = require('semver')


let newVersion = core.getInput('new_version');
let filePath = core.getInput('file_path');

const projectType = detectProjectType(filePath)

core.info(`Detected project type: ${packageTypes[projectType]}`)

if (projectType){
    const cleanVersion = semver.valid(newVersion)
    if(cleanVersion){
        switchVersionInFile(projectType, cleanVersion, filePath)
    }
}



