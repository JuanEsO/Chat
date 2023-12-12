/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationManager} from './src/Navigation/NavigationManager';
import {Amplify} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import {syncUser} from './src/Services/UserService/User';
import AppWrapper from './src/lib/LocalDbManager/AppWrapper';
import Realm from 'realm';
import ServiceLayer from './src/Services/ServiceLayer';

Amplify.configure({...awsconfig, Analytics: {disabled: true}});

function App(): JSX.Element {
  useEffect(() => {
    syncUser();
    Realm.open({path: 'teral.realm'}).then(db => {
      console.log('[realm]', db, db.path);
    });
  }, []);

  return (
    <AppWrapper>
      <ServiceLayer />
    </AppWrapper>
  );
}

export default withAuthenticator(App);
