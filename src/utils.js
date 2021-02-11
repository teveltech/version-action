const fs = require('fs')
const editJsonFile = require("edit-json-file");

const conanRegex = /(?<=__version__.=.")(.*)(?="\n)/g
const pythonRegex = /(?<=__version__.=.")(.*)(?="\n)/g


const packageTypes = {
    NPM: 'package.json',
    PYTHON: 'setup.py',
    CONAN: 'conanfile.py'
};

const detectProjectType = (path) => {
    var files = fs.readdirSync(path);
    if(files.includes(packageTypes.NPM)){
        return packageTypes.NPM
    }
    else if(files.includes(packageTypes.PYTHON)){
        return packageTypes.PYTHON
    }
    else if(files.includes(packageTypes.CONAN)){
        return packageTypes.CONAN
    }
    else{
        return undefined
    }
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