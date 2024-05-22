import { initializeApp } from 'firebase/app';

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyDrvs-8rO-U6h_GdQOJQELCXQcuuUHUyfk',
    authDomain: 'angular-dash-27c09.firebaseapp.com',
    projectId: 'angular-dash-27c09',
    storageBucket: 'angular-dash-27c09.appspot.com',
    messagingSenderId: '726978515902',
    appId: '1:726978515902:web:010403f80f87f97c0b9fef',
  },
};

export const app = initializeApp(environment.firebaseConfig);
