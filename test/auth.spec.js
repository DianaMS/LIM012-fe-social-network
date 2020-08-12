import {
  registerUserEmail,
  logIn, logInGoogle, logInFacebook,
} from '../src/firebase/auth.js';

const firebaseMock = require('firebase-mock');

const mockAuth = new firebaseMock.MockFirebase();

mockAuth.autoFlush();
global.firebase = firebaseMock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockAuth,
);

describe('registerUserEmail', () => {
  it('Deberia poder crear un nuevo usuario', () => registerUserEmail('dmartinezs@uni.pe', '12345678')
    .then((user) => {
      expect(user.email).toBe('dmartinezs@uni.pe');
    }));
});

describe('logIn', () => {
  it('Deberia poder iniciar sesión', () => logIn('dmartinezs@uni.pe', '12345678')
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});

describe('logInGoogle', () => {
  it('Deberia poder iniciar sesión con Google', () => logInGoogle()
    .then((data) => {
      const provider = data.providerData[0].providerId;
      expect(provider).toBe('google.com');
    }));
});

describe('logInFacebook', () => {
  it('Deberia poder iniciar sesión con Facebook', () => logInFacebook()
    .then((data) => {
      const provider = data.providerData[0].providerId;
      expect(provider).toBe('facebook.com');
    }));
});
