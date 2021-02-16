const utils = require('./utils');
const fs = require('fs');
const YAML = require('yaml')



describe("Identify project type", () => {
    test('Identify node project', () => {
        expect(utils.detectProjectType('./test/mocks/npm')).toBe(utils.packageTypes.NPM);
    });
    test('Identify python project', () => {
        expect(utils.detectProjectType('./test/mocks/python')).toBe(utils.packageTypes.PYTHON);
    });
    test('Identify conan project', () => {
        expect(utils.detectProjectType('./test/mocks/conan')).toBe(utils.packageTypes.CONAN);
    });
    test('Identify undefined project', () => {
        expect(utils.detectProjectType('./test/mocks/')).toBe(undefined);
    });
})

describe("Replace version in file", () => {
    const newVersion = "1.0.1-test-13"
    test('Replace node project version', () => {
        fs.copyFileSync('./test/mocks/npm/package.orig', './test/mocks/npm/package.json')

        utils.switchVersionInFile(utils.packageTypes.NPM, newVersion, './test/mocks/npm/')

        packageJson = JSON.parse(fs.readFileSync('./test/mocks/npm/package.json', 'utf8'))
        expect(packageJson.version).toBe(newVersion);
    });
    test('Replace python project version', () => {
        fs.copyFileSync('./test/mocks/python/setup.orig', './test/mocks/python/setup.py')
        utils.switchVersionInFile(utils.packageTypes.PYTHON, newVersion, './test/mocks/python/')

        const file = fs.readFileSync('./test/mocks/python/setup.py', 'utf-8')
        const res = file.match(utils.pythonRegex)[0]

        expect(res).toBe(`${newVersion}`);
    });
    test('Replace conan project version', () => {
        fs.copyFileSync('./test/mocks/conan/conanfile.orig', './test/mocks/conan/conanfile.py')

        utils.switchVersionInFile(utils.packageTypes.CONAN, newVersion, './test/mocks/conan/')

        const file = fs.readFileSync('./test/mocks/conan/conanfile.py', 'utf-8')
        const res = file.match(utils.conanRegex)[0]

        expect(res).toBe(`${newVersion}`);
    });
    test('Replace helm project version', () => {
        fs.copyFileSync('./test/mocks/helm/Chart.orig', './test/mocks/helm/Chart.yaml')

        utils.switchVersionInFile(utils.packageTypes.HELM, newVersion, './test/mocks/helm/')

        const file = fs.readFileSync('./test/mocks/helm/Chart.yaml', 'utf-8')
        let chartYaml = YAML.parse(file)
        const res = chartYaml['version']

        expect(res).toBe(`${newVersion}`);
    });
})