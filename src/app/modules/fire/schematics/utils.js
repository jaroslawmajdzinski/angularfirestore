"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addIgnoreFiles = exports.featureToRules = exports.addFixesToServer = exports.addEnvironmentEntry = exports.getFirebaseProjectNameFromFs = exports.getFirebaseProjectNameFromHost = exports.getProject = exports.getWorkspace = exports.shortAppId = exports.hasPrerenderOption = exports.isUniversalApp = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const schematics_1 = require("@angular-devkit/schematics");
const typescript_1 = __importDefault(require("@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript"));
const utility_1 = require("@schematics/angular/utility");
const ast_utils_1 = require("@schematics/angular/utility/ast-utils");
const change_1 = require("@schematics/angular/utility/change");
const common_1 = require("./common");
const isUniversalApp = (project) => { var _a; return (_a = project.architect) === null || _a === void 0 ? void 0 : _a.server; };
exports.isUniversalApp = isUniversalApp;
const hasPrerenderOption = (project) => { var _a; return (_a = project.architect) === null || _a === void 0 ? void 0 : _a.prerender; };
exports.hasPrerenderOption = hasPrerenderOption;
const shortAppId = (app) => { var _a; return (_a = app === null || app === void 0 ? void 0 : app.appId) === null || _a === void 0 ? void 0 : _a.split('/').pop(); };
exports.shortAppId = shortAppId;
function getWorkspace(host) {
    const path = '/angular.json';
    const configBuffer = path && host.read(path);
    if (!configBuffer) {
        throw new schematics_1.SchematicsException(`Could not find angular.json`);
    }
    const { parse } = require('jsonc-parser');
    const workspace = parse(configBuffer.toString());
    if (!workspace) {
        throw new schematics_1.SchematicsException('Could not parse angular.json');
    }
    return {
        path,
        workspace
    };
}
exports.getWorkspace = getWorkspace;
const getProject = (options, host) => {
    const { workspace } = getWorkspace(host);
    const projectName = options.project || workspace.defaultProject;
    if (!projectName) {
        throw new schematics_1.SchematicsException('No Angular project selected and no default project in the workspace');
    }
    const project = workspace.projects[projectName];
    if (!project) {
        throw new schematics_1.SchematicsException('The specified Angular project is not defined in this workspace');
    }
    if (project.projectType !== 'application') {
        throw new schematics_1.SchematicsException(`Deploy requires an Angular project type of "application" in angular.json`);
    }
    return { project, projectName };
};
exports.getProject = getProject;
function getFirebaseProjectNameFromHost(host, target) {
    const buffer = host.read('/.firebaserc');
    if (!buffer) {
        return [undefined, undefined];
    }
    const rc = JSON.parse(buffer.toString());
    return projectFromRc(rc, target);
}
exports.getFirebaseProjectNameFromHost = getFirebaseProjectNameFromHost;
function getFirebaseProjectNameFromFs(root, target) {
    const path = (0, path_1.join)(root, '.firebaserc');
    try {
        const buffer = (0, fs_1.readFileSync)(path);
        const rc = JSON.parse(buffer.toString());
        return projectFromRc(rc, target);
    }
    catch (e) {
        return [undefined, undefined];
    }
}
exports.getFirebaseProjectNameFromFs = getFirebaseProjectNameFromFs;
const projectFromRc = (rc, target) => {
    var _a, _b, _c, _d, _e;
    const defaultProject = (_a = rc.projects) === null || _a === void 0 ? void 0 : _a.default;
    const project = Object.keys(rc.targets || {}).find(project => { var _a, _b, _c; return !!((_c = (_b = (_a = rc.targets) === null || _a === void 0 ? void 0 : _a[project]) === null || _b === void 0 ? void 0 : _b.hosting) === null || _c === void 0 ? void 0 : _c[target]); });
    const site = project && ((_e = (_d = (_c = (_b = rc.targets) === null || _b === void 0 ? void 0 : _b[project]) === null || _c === void 0 ? void 0 : _c.hosting) === null || _d === void 0 ? void 0 : _d[target]) === null || _e === void 0 ? void 0 : _e[0]);
    return [project || defaultProject, site];
};
function addEnvironmentEntry(host, filePath, data) {
    const fileExists = host.exists(filePath);
    if (fileExists) {
        const buffer = host.read(filePath);
        if (!buffer) {
            throw new schematics_1.SchematicsException(`Cannot read ${filePath}`);
        }
        const sourceFile = typescript_1.default.createSourceFile(filePath, buffer.toString('utf-8'), typescript_1.default.ScriptTarget.Latest, true);
        const envIdentifier = (0, ast_utils_1.findNode)(sourceFile, typescript_1.default.SyntaxKind.Identifier, 'environment');
        if (!(envIdentifier === null || envIdentifier === void 0 ? void 0 : envIdentifier.parent)) {
            throw new schematics_1.SchematicsException(`Cannot find 'environment' identifier in ${filePath}`);
        }
        const envObjectLiteral = envIdentifier.parent.getChildren().find(({ kind }) => kind === typescript_1.default.SyntaxKind.ObjectLiteralExpression);
        if (!envObjectLiteral) {
            throw new schematics_1.SchematicsException(`${filePath} is not in the expected format`);
        }
        const firebaseIdentifier = (0, ast_utils_1.findNode)(envObjectLiteral, typescript_1.default.SyntaxKind.Identifier, 'firebase');
        const recorder = host.beginUpdate(filePath);
        if (firebaseIdentifier === null || firebaseIdentifier === void 0 ? void 0 : firebaseIdentifier.parent) {
            const change = new change_1.ReplaceChange(filePath, firebaseIdentifier.parent.pos, firebaseIdentifier.parent.getFullText(), data);
            (0, change_1.applyToUpdateRecorder)(recorder, [change]);
        }
        else {
            const openBracketToken = envObjectLiteral.getChildren().find(({ kind }) => kind === typescript_1.default.SyntaxKind.OpenBraceToken);
            if (openBracketToken) {
                const change = new change_1.InsertChange(filePath, openBracketToken.end, `${data},`);
                (0, change_1.applyToUpdateRecorder)(recorder, [change]);
            }
            else {
                throw new schematics_1.SchematicsException(`${filePath} is not in the expected format`);
            }
        }
        host.commitUpdate(recorder);
    }
    else {
        host.create(filePath, `export const environment = {${data},
};`);
    }
    return host;
}
exports.addEnvironmentEntry = addEnvironmentEntry;
function addFixesToServer(host) {
    const serverPath = `/server.ts`;
    if (!host.exists(serverPath)) {
        return host;
    }
    const text = host.read(serverPath);
    if (text === null) {
        throw new schematics_1.SchematicsException(`File ${serverPath} does not exist.`);
    }
    const sourceText = text.toString('utf-8');
    const addZonePatch = !sourceText.includes('import \'zone.js/dist/zone-patch-rxjs\';');
    if (addZonePatch) {
        (0, common_1.overwriteIfExists)(host, serverPath, sourceText.replace('import \'zone.js/dist/zone-node\';', `import 'zone.js/dist/zone-node';
${addZonePatch ? 'import \'zone.js/dist/zone-patch-rxjs\';' : ''}`));
    }
    return host;
}
exports.addFixesToServer = addFixesToServer;
function featureToRules(features, projectName) {
    return features.map(feature => {
        switch (feature) {
            case 3:
                return (0, utility_1.addRootImport)(projectName, ({ code, external }) => {
                    external('initializeAppCheck', '@angular/fire/app-check');
                    external('ReCaptchaEnterpriseProvider', '@angular/fire/app-check');
                    return code `${external('provideAppCheck', '@angular/fire/app-check')}(() => {
  // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
  const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key */);
  return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
})`;
                });
            case 2:
                return (0, schematics_1.chain)([
                    (0, utility_1.addRootImport)(projectName, ({ code, external }) => {
                        external('getAnalytics', '@angular/fire/analytics');
                        return code `${external('provideAnalytics', '@angular/fire/analytics')}(() => getAnalytics())`;
                    }),
                    (0, utility_1.addRootProvider)(projectName, ({ code, external }) => {
                        return code `${external('ScreenTrackingService', '@angular/fire/analytics')}`;
                    }),
                    ...(features.includes(1) ? [
                        (0, utility_1.addRootProvider)(projectName, ({ code, external }) => {
                            return code `${external('UserTrackingService', '@angular/fire/analytics')}`;
                        })
                    ] : []),
                ]);
            case 1:
                return (0, utility_1.addRootImport)(projectName, ({ code, external }) => {
                    external('getAuth', '@angular/fire/auth');
                    return code `${external('provideAuth', '@angular/fire/auth')}(() => getAuth())`;
                });
            case 4:
                return (0, utility_1.addRootImport)(projectName, ({ code, external }) => {
                    external('getDatabase', '@angular/fire/database');
                    return code `${external('provideDatabase', '@angular/fire/database')}(() => getDatabase())`;
                });
            case 8:
                return (0, utility_1.addRootImport)(projectName, ({ code, external }) => {
                    external('getFirestore', '@angular/fire/firestore');
                    return code `${external('provideFirestore', '@angular/fire/firestore')}(() => getFirestore())`;
                });
            case 5:
                return (0, utility_1.addRootImport)(projectName, ({ code, external }) => {
                    external('getFunctions', '@angular/fire/functions');
                    return code `${external('provideFunctions', '@angular/fire/functions')}(() => getFunctions())`;
                });
            case 6:
                return (0, utility_1.addRootImport)(projectName, ({ code, external }) => {
                    external('getMessaging', '@angular/fire/messaging');
                    return code `${external('provideMessaging', '@angular/fire/messaging')}(() => getMessaging())`;
                });
            case 7:
                return (0, utility_1.addRootImport)(projectName, ({ code, external }) => {
                    external('getPerformance', '@angular/fire/performance');
                    return code `${external('providePerformance', '@angular/fire/performance')}(() => getPerformance())`;
                });
            case 9:
                return (0, utility_1.addRootImport)(projectName, ({ code, external }) => {
                    external('getStorage', '@angular/fire/storage');
                    return code `${external('provideStorage', '@angular/fire/storage')}(() => getStorage())`;
                });
            case 10:
                return (0, utility_1.addRootImport)(projectName, ({ code, external }) => {
                    external('getRemoteConfig', '@angular/fire/remote-config');
                    return code `${external('provideRemoteConfig', '@angular/fire/remote-config')}(() => getRemoteConfig())`;
                });
            default:
                return undefined;
        }
    }).filter((it) => !!it);
}
exports.featureToRules = featureToRules;
const addIgnoreFiles = (host) => {
    const path = '/.gitignore';
    if (!host.exists(path)) {
        return host;
    }
    const buffer = host.read(path);
    if (!buffer) {
        return host;
    }
    const content = buffer.toString();
    if (!content.includes('# Firebase')) {
        (0, common_1.overwriteIfExists)(host, path, content.concat(`
# Firebase
.firebase
*-debug.log
.runtimeconfig.json
`));
    }
    return host;
};
exports.addIgnoreFiles = addIgnoreFiles;
