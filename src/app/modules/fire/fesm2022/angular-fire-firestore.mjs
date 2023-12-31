import { ɵgetAllInstancesOf, ɵgetDefaultInstanceOf, VERSION, ɵAngularFireSchedulers, ɵAppCheckInstances, ɵzoneWrap } from '@angular/fire';
import { timer, from } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
import * as i0 from '@angular/core';
import { InjectionToken, Optional, NgModule, NgZone, Injector } from '@angular/core';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { AuthInstances } from '@angular/fire/auth';
import { registerVersion } from 'firebase/app';
import { collectionChanges as collectionChanges$1, collection as collection$1, sortedChanges as sortedChanges$1, auditTrail as auditTrail$1, collectionData as collectionData$1, collectionCountSnap as collectionCountSnap$1, collectionCount as collectionCount$1, doc as doc$1, docData as docData$1, snapToData as snapToData$1, fromRef as fromRef$1 } from 'rxfire/firestore';
import { addDoc as addDoc$1, aggregateFieldEqual as aggregateFieldEqual$1, aggregateQuerySnapshotEqual as aggregateQuerySnapshotEqual$1, and as and$1, arrayRemove as arrayRemove$1, arrayUnion as arrayUnion$1, average as average$1, clearIndexedDbPersistence as clearIndexedDbPersistence$1, collection as collection$2, collectionGroup as collectionGroup$1, connectFirestoreEmulator as connectFirestoreEmulator$1, count as count$1, deleteAllPersistentCacheIndexes as deleteAllPersistentCacheIndexes$1, deleteDoc as deleteDoc$1, deleteField as deleteField$1, disableNetwork as disableNetwork$1, disablePersistentCacheIndexAutoCreation as disablePersistentCacheIndexAutoCreation$1, doc as doc$2, documentId as documentId$1, enableIndexedDbPersistence as enableIndexedDbPersistence$1, enableMultiTabIndexedDbPersistence as enableMultiTabIndexedDbPersistence$1, enableNetwork as enableNetwork$1, enablePersistentCacheIndexAutoCreation as enablePersistentCacheIndexAutoCreation$1, endAt as endAt$1, endBefore as endBefore$1, getAggregateFromServer as getAggregateFromServer$1, getCountFromServer as getCountFromServer$1, getDoc as getDoc$1, getDocFromCache as getDocFromCache$1, getDocFromServer as getDocFromServer$1, getDocs as getDocs$1, getDocsFromCache as getDocsFromCache$1, getDocsFromServer as getDocsFromServer$1, getFirestore as getFirestore$1, getPersistentCacheIndexManager as getPersistentCacheIndexManager$1, increment as increment$1, initializeFirestore as initializeFirestore$1, limit as limit$1, limitToLast as limitToLast$1, loadBundle as loadBundle$1, memoryEagerGarbageCollector as memoryEagerGarbageCollector$1, memoryLocalCache as memoryLocalCache$1, memoryLruGarbageCollector as memoryLruGarbageCollector$1, namedQuery as namedQuery$1, onSnapshot as onSnapshot$1, onSnapshotsInSync as onSnapshotsInSync$1, or as or$1, orderBy as orderBy$1, persistentLocalCache as persistentLocalCache$1, persistentMultipleTabManager as persistentMultipleTabManager$1, persistentSingleTabManager as persistentSingleTabManager$1, query as query$1, queryEqual as queryEqual$1, refEqual as refEqual$1, runTransaction as runTransaction$1, serverTimestamp as serverTimestamp$1, setDoc as setDoc$1, setIndexConfiguration as setIndexConfiguration$1, setLogLevel as setLogLevel$1, snapshotEqual as snapshotEqual$1, startAfter as startAfter$1, startAt as startAt$1, sum as sum$1, terminate as terminate$1, updateDoc as updateDoc$1, waitForPendingWrites as waitForPendingWrites$1, where as where$1, writeBatch as writeBatch$1 } from 'firebase/firestore';
export * from 'firebase/firestore';

class Firestore {
    constructor(firestore) {
        return firestore;
    }
}
const FIRESTORE_PROVIDER_NAME = 'firestore';
class FirestoreInstances {
    constructor() {
        return ɵgetAllInstancesOf(FIRESTORE_PROVIDER_NAME);
    }
}
const firestoreInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(FIRESTORE_PROVIDER_NAME))), distinct());

const PROVIDED_FIRESTORE_INSTANCES = new InjectionToken('angularfire2.firestore-instances');
function defaultFirestoreInstanceFactory(provided, defaultApp) {
    const defaultFirestore = ɵgetDefaultInstanceOf(FIRESTORE_PROVIDER_NAME, provided, defaultApp);
    return defaultFirestore && new Firestore(defaultFirestore);
}
function firestoreInstanceFactory(fn) {
    return (zone, injector) => {
        const firestore = zone.runOutsideAngular(() => fn(injector));
        return new Firestore(firestore);
    };
}
const FIRESTORE_INSTANCES_PROVIDER = {
    provide: FirestoreInstances,
    deps: [
        [new Optional(), PROVIDED_FIRESTORE_INSTANCES],
    ]
};
const DEFAULT_FIRESTORE_INSTANCE_PROVIDER = {
    provide: Firestore,
    useFactory: defaultFirestoreInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_FIRESTORE_INSTANCES],
        FirebaseApp,
    ]
};
class FirestoreModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'fst');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FirestoreModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.10", ngImport: i0, type: FirestoreModule });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FirestoreModule, providers: [
            DEFAULT_FIRESTORE_INSTANCE_PROVIDER,
            FIRESTORE_INSTANCES_PROVIDER,
        ] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.10", ngImport: i0, type: FirestoreModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_FIRESTORE_INSTANCE_PROVIDER,
                        FIRESTORE_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: function () { return []; } });
function provideFirestore(fn, ...deps) {
    return {
        ngModule: FirestoreModule,
        providers: [{
                provide: PROVIDED_FIRESTORE_INSTANCES,
                useFactory: firestoreInstanceFactory(fn),
                multi: true,
                deps: [
                    NgZone,
                    Injector,
                    ɵAngularFireSchedulers,
                    FirebaseApps,
                    // Firestore+Auth work better if Auth is loaded first
                    [new Optional(), AuthInstances],
                    [new Optional(), ɵAppCheckInstances],
                    ...deps,
                ]
            }]
    };
}

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const collectionChanges = ɵzoneWrap(collectionChanges$1, true);
const collectionSnapshots = ɵzoneWrap(collection$1, true);
const sortedChanges = ɵzoneWrap(sortedChanges$1, true);
const auditTrail = ɵzoneWrap(auditTrail$1, true);
const collectionData = ɵzoneWrap(collectionData$1, true);
const collectionCountSnap = ɵzoneWrap(collectionCountSnap$1, true);
const collectionCount = ɵzoneWrap(collectionCount$1, true);
const docSnapshots = ɵzoneWrap(doc$1, true);
const docData = ɵzoneWrap(docData$1, true);
const snapToData = ɵzoneWrap(snapToData$1, true);
const fromRef = ɵzoneWrap(fromRef$1, true);

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const addDoc = ɵzoneWrap(addDoc$1, true);
const aggregateFieldEqual = ɵzoneWrap(aggregateFieldEqual$1, true);
const aggregateQuerySnapshotEqual = ɵzoneWrap(aggregateQuerySnapshotEqual$1, true);
const and = ɵzoneWrap(and$1, true);
const arrayRemove = ɵzoneWrap(arrayRemove$1, true);
const arrayUnion = ɵzoneWrap(arrayUnion$1, true);
const average = ɵzoneWrap(average$1, true);
const clearIndexedDbPersistence = ɵzoneWrap(clearIndexedDbPersistence$1, true);
const collection = ɵzoneWrap(collection$2, true);
const collectionGroup = ɵzoneWrap(collectionGroup$1, true);
const connectFirestoreEmulator = ɵzoneWrap(connectFirestoreEmulator$1, true);
const count = ɵzoneWrap(count$1, true);
const deleteAllPersistentCacheIndexes = ɵzoneWrap(deleteAllPersistentCacheIndexes$1, true);
const deleteDoc = ɵzoneWrap(deleteDoc$1, true);
const deleteField = ɵzoneWrap(deleteField$1, true);
const disableNetwork = ɵzoneWrap(disableNetwork$1, true);
const disablePersistentCacheIndexAutoCreation = ɵzoneWrap(disablePersistentCacheIndexAutoCreation$1, true);
const doc = ɵzoneWrap(doc$2, true);
const documentId = ɵzoneWrap(documentId$1, true);
const enableIndexedDbPersistence = ɵzoneWrap(enableIndexedDbPersistence$1, true);
const enableMultiTabIndexedDbPersistence = ɵzoneWrap(enableMultiTabIndexedDbPersistence$1, true);
const enableNetwork = ɵzoneWrap(enableNetwork$1, true);
const enablePersistentCacheIndexAutoCreation = ɵzoneWrap(enablePersistentCacheIndexAutoCreation$1, true);
const endAt = ɵzoneWrap(endAt$1, true);
const endBefore = ɵzoneWrap(endBefore$1, true);
const getAggregateFromServer = ɵzoneWrap(getAggregateFromServer$1, true);
const getCountFromServer = ɵzoneWrap(getCountFromServer$1, true);
const getDoc = ɵzoneWrap(getDoc$1, true);
const getDocFromCache = ɵzoneWrap(getDocFromCache$1, true);
const getDocFromServer = ɵzoneWrap(getDocFromServer$1, true);
const getDocs = ɵzoneWrap(getDocs$1, true);
const getDocsFromCache = ɵzoneWrap(getDocsFromCache$1, true);
const getDocsFromServer = ɵzoneWrap(getDocsFromServer$1, true);
const getFirestore = ɵzoneWrap(getFirestore$1, true);
const getPersistentCacheIndexManager = ɵzoneWrap(getPersistentCacheIndexManager$1, true);
const increment = ɵzoneWrap(increment$1, true);
const initializeFirestore = ɵzoneWrap(initializeFirestore$1, true);
const limit = ɵzoneWrap(limit$1, true);
const limitToLast = ɵzoneWrap(limitToLast$1, true);
const loadBundle = ɵzoneWrap(loadBundle$1, true);
const memoryEagerGarbageCollector = ɵzoneWrap(memoryEagerGarbageCollector$1, true);
const memoryLocalCache = ɵzoneWrap(memoryLocalCache$1, true);
const memoryLruGarbageCollector = ɵzoneWrap(memoryLruGarbageCollector$1, true);
const namedQuery = ɵzoneWrap(namedQuery$1, true);
const onSnapshot = ɵzoneWrap(onSnapshot$1, true);
const onSnapshotsInSync = ɵzoneWrap(onSnapshotsInSync$1, true);
const or = ɵzoneWrap(or$1, true);
const orderBy = ɵzoneWrap(orderBy$1, true);
const persistentLocalCache = ɵzoneWrap(persistentLocalCache$1, true);
const persistentMultipleTabManager = ɵzoneWrap(persistentMultipleTabManager$1, true);
const persistentSingleTabManager = ɵzoneWrap(persistentSingleTabManager$1, true);
const query = ɵzoneWrap(query$1, true);
const queryEqual = ɵzoneWrap(queryEqual$1, true);
const refEqual = ɵzoneWrap(refEqual$1, true);
const runTransaction = ɵzoneWrap(runTransaction$1, true);
const serverTimestamp = ɵzoneWrap(serverTimestamp$1, true);
const setDoc = ɵzoneWrap(setDoc$1, true);
const setIndexConfiguration = ɵzoneWrap(setIndexConfiguration$1, true);
const setLogLevel = ɵzoneWrap(setLogLevel$1, true);
const snapshotEqual = ɵzoneWrap(snapshotEqual$1, true);
const startAfter = ɵzoneWrap(startAfter$1, true);
const startAt = ɵzoneWrap(startAt$1, true);
const sum = ɵzoneWrap(sum$1, true);
const terminate = ɵzoneWrap(terminate$1, true);
const updateDoc = ɵzoneWrap(updateDoc$1, true);
const waitForPendingWrites = ɵzoneWrap(waitForPendingWrites$1, true);
const where = ɵzoneWrap(where$1, true);
const writeBatch = ɵzoneWrap(writeBatch$1, true);

/**
 * Generated bundle index. Do not edit.
 */

export { Firestore, FirestoreInstances, FirestoreModule, addDoc, aggregateFieldEqual, aggregateQuerySnapshotEqual, and, arrayRemove, arrayUnion, auditTrail, average, clearIndexedDbPersistence, collection, collectionChanges, collectionCount, collectionCountSnap, collectionData, collectionGroup, collectionSnapshots, connectFirestoreEmulator, count, deleteAllPersistentCacheIndexes, deleteDoc, deleteField, disableNetwork, disablePersistentCacheIndexAutoCreation, doc, docData, docSnapshots, documentId, enableIndexedDbPersistence, enableMultiTabIndexedDbPersistence, enableNetwork, enablePersistentCacheIndexAutoCreation, endAt, endBefore, firestoreInstance$, fromRef, getAggregateFromServer, getCountFromServer, getDoc, getDocFromCache, getDocFromServer, getDocs, getDocsFromCache, getDocsFromServer, getFirestore, getPersistentCacheIndexManager, increment, initializeFirestore, limit, limitToLast, loadBundle, memoryEagerGarbageCollector, memoryLocalCache, memoryLruGarbageCollector, namedQuery, onSnapshot, onSnapshotsInSync, or, orderBy, persistentLocalCache, persistentMultipleTabManager, persistentSingleTabManager, provideFirestore, query, queryEqual, refEqual, runTransaction, serverTimestamp, setDoc, setIndexConfiguration, setLogLevel, snapToData, snapshotEqual, sortedChanges, startAfter, startAt, sum, terminate, updateDoc, waitForPendingWrites, where, writeBatch };
//# sourceMappingURL=angular-fire-firestore.mjs.map