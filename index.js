const core = require('@actions/core');
const {detectProjectType, switchVersionInFile, packageTypes} = require('./src/utils')
const semver = require('semver')


let newVersion = core.getInput('new_version');
let filePath = core.getInput('file_path');

const projectType = detectProjectType(filePath)

if (projectType === undefined){
    core.error("Cannot detect project type")
}

core.info(`Detected project type: ${projectType}`)

if (projectType){
    core.info(`New version: ${newVersion}`)
    if(newVersion.includes("-")){
        core.info(`Found underscores in ${newVersion}`)
        newVersion = newVersion.replaceAll('_', '-')
        core.info(`Corrected version: ${newVersion}`)
    }
    const cleanVersion = semver.clean(newVersion, { loose: true })
    core.info(`Clean version: ${cleanVersion}`)
    if(cleanVersion){
        switchVersionInFile(projectType, cleanVersion, filePath)
    }
}