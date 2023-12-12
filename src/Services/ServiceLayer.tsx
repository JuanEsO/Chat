import LocalDBManager from '../lib/LocalDbManager';
import React, { useEffect } from 'react';
import {eventType} from '../types/eventTypes';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationManager} from '../Navigation/NavigationManager';
import SubscriptionManager from './SubscriptionManager';
import InitialQueries from './InitialQueries';
import { Auth } from 'aws-amplify';

interface inputProps {
  event: eventType;
  setEvent: (event: eventType) => void;
}

const ServiceLayer = () => {
  const [userId, setUserId] = React.useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      setUserId(authUser.attributes.sub);
    };
    init();
  }, []);
  return (
    <>
      <SubscriptionManager userId={userId} />
      <InitialQueries />
      <NavigationContainer>
        <NavigationManager />
      </NavigationContainer>
    </>
  );
};
export default ServiceLayer;
