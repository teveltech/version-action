const fs = require('fs')
const editJsonFile = require("edit-json-file");


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

const switchVersionInFile = (project_type, new_version) => {
    switch (project_type) {
        case packageTypes.NPM:
            let file = editJsonFile(`./` + packageTypes.NPM, {
                autosave: true
            });
            file.set('version', new_version)
            break;
    
        case packageTypes.PYTHON:
            break;
    
    
        case packageTypes.CONAN:
            break;
    
        default:
            return core.ExitCode.Failure
    }
}

module.exports = {
    packageTypes,
    detectProjectType,
    switchVersionInFile
}