# Hello There! Colors App

A simple app to help you find the perfect color.

## Features List

- [x] Generate random colors
- [x] Smooth color transition
- [x] Gestures to navigate through colors
- [x] History of generated colors
- [x] Copy color hex to clipboard
- [x] Get color information from API, such as name, hex, rgb, hsl, etc.
- [x] Get color palettes from API
- [x] Speech color name
- [x] Share color with other apps
- [x] Add or remove color from favorites
- [x] Dark and light theme
- [x] Achievements for generating colors
- [x] Caching API responses with React Query
- [x] Data persistence with Redux Persist

## Tech Stack

- React Native 0.78 (React 18)
- Expo 52

## Requirements

- Java JDK 17
- Node.js 22
- Expo CLI

## How to run the app

1. Clone the repository
2. Run `npm install`
3. Run `npx expo start` to start the development server (to run with Expo Go)
5. Run `npx expo prebuild` and `npx expo run:android` or `npx expo run:ios` to run the app on your device

## How to build the app

1. Run `npm install -g eas-cli`
2. Run `eas login`
3. Run `eas build:configure`
4. Run `eas build --platform android --profile development` for Android
5. Run `eas build --platform ios --profile development` for iOS

[Download the build here](https://expo.dev/accounts/lucasvribeiro/projects/hello-there-colors-app/builds/93fb904c-b0e4-4f42-8bd5-573142114004)