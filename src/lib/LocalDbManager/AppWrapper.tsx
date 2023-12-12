import React from 'react';
import {RealmProvider} from './RealmConfig';

const AppWrapper = ({children}: {children: React.ReactNode}) => {
  // const realmRef = React.useRef<Realm | null>(null);
  return (
    <RealmProvider
      //realmRef={realmRef}
      closeOnUnmount={false}>
      {children}
    </RealmProvider>
  );
};

export default AppWrapper;
