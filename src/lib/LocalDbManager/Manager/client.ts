import Realm from 'realm';
import {realmConfig} from '../RealmConfig';

// Base class for the local database manager
// DO NOT INSTANTIATE THIS CLASS DIRECTLY
// OR ADD ANY METHODS TO THIS CLASS
class CoreManager {
  private static instance: CoreManager;

  // https://www.typescriptlang.org/docs/handbook/2/classes.html#readonly
  // Fields may be prefixed with the readonly modifier. This prevents assignments to the field outside of the constructor.

  // to track and identify the instance
  public readonly instanceId: string | undefined;
  public readonly realm: Realm | undefined;

  // Private constructor prevents external instantiation
  private constructor() {
    // generate a random id to identify the instance
    this.instanceId = Math.random().toString(36).substring(7);
    // create a new realm instance
    this.realm = new Realm(realmConfig);
  }

  /**
   * restricts the instantiation of a class and ensures that only
   * one instance of the class exists at any given time
   * @returns the instance of the class
   */
  static getInstance() {
    // check if instance does not exist then create new one
    // otherwise return the existing one
    if (!CoreManager.instance) {
      CoreManager.instance = new CoreManager();
    }
    return CoreManager.instance;
  }
}

export default CoreManager;
