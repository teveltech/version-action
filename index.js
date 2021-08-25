const core = require('@actions/core');
const {detectProjectType, switchVersionInFile, packageTypes} = require('./src/utils')
const semver = require('semver')


let newVersion = core.getInput('new_version');
let filePath = core.getInput('file_path');

const projectTypes = detectProjectType(filePath)

if (projectTypes.length === 0){
    core.setFailed("Cannot detect project type")    
}

core.info(`Detected project type: ${projectTypes}`)

if (projectTypes){
    projectTypes.forEach(projectType => {
        core.info(`New version: ${newVersion}`)
        if(newVersion.includes("_")){
            core.info(`Found underscores in ${newVersion}`)
            newVersion = newVersion.replace(/_/g, '-')
            core.info(`Corrected version: ${newVersion}`)
        }
        const cleanVersion = semver.clean(newVersion, { loose: true })
        core.info(`Clean version: ${cleanVersion}`)
        if(cleanVersion){
            switchVersionInFile(projectType, cleanVersion, filePath)
        }
    })
}
