const fs = require('fs')
const editJsonFile = require("edit-json-file");
const YAML = require('yaml')

const conanRegex = /(?<=__version__.=.")(.*)(?="\n)/g
const pythonRegex = /(?<=__version__.=.")(.*)(?="\n)/g


const packageTypes = {
    NPM: 'package.json',
    PYTHON: 'setup.py',
    CONAN: 'conanfile.py',
    HELM: 'Chart.yaml'
};

const detectProjectType = (path) => {
    var files = fs.readdirSync(path);
    project_types = []
    if(files.includes(packageTypes.NPM)){
        project_types.push(packageTypes.NPM)
    }
    if(files.includes(packageTypes.PYTHON)){
        project_types.push(packageTypes.PYTHON)
    }
    if(files.includes(packageTypes.CONAN)){
        project_types.push(packageTypes.CONAN)
    }
    if(files.includes(packageTypes.HELM)){
        project_types.push(packageTypes.HELM)
    }
    return project_types
}

const switchVersionInFile = (project_type, new_version, file_path='./') => {
    switch (project_type) {
        case packageTypes.NPM:
            let packageJson = editJsonFile(file_path + project_type);
            packageJson.set('version', new_version)
            packageJson.save()
            break;
    
        case packageTypes.PYTHON:
            let setupPy = fs.readFileSync(file_path + project_type, 'utf8')
            setupPy = setupPy.replace(pythonRegex, `${new_version}`)
            fs.writeFileSync(file_path + project_type, setupPy)
            break;
    
    
        case packageTypes.CONAN:
            let conanFile = fs.readFileSync(file_path + project_type, 'utf8')
            conanFile = conanFile.replace(conanRegex, `${new_version}`)
            fs.writeFileSync(file_path + project_type, conanFile)
            break;

        case packageTypes.HELM:
            let helmFile = fs.readFileSync(file_path + project_type, 'utf8')
            let chartYaml = YAML.parse(helmFile)
            chartYaml['version'] = new_version
            const fileString = YAML.stringify(chartYaml)
            fs.writeFileSync(file_path + project_type, fileString, {
                encoding: 'utf8'
            })
            break;

        default:
            return core.ExitCode.Failure
    }
}

module.exports = {
    packageTypes,
    detectProjectType,
    switchVersionInFile,
    conanRegex,
    pythonRegex
}