<p align="center">
  <img src="https://github.com/user-attachments/assets/0a516a83-ba52-4927-b896-6e5967f4bacf" alt="Logo Hello There! Colors App" width="200"/>
</p>


# 🎨 Hello There! Colors App

A React Native mobile app to discover amazing random colors.

## 📋 Features List

- [x] Generate amazing random colors.
- [x] Easiy copy color hex code to clipboard.
- [x] Keep track of all generated colors with a colors history layout.
- [x] Add or remove colors from favorites.
- [x] Know other color codes like RGB, HSL and CMYK and easily copy them.
- [x] Discover color palettes (monochromatic, analogic, complementary, triad and tetrad).
- [x] Display and speech the color name.
- [x] Share color with other apps.
- [x] Easily navigate (swipe) between colors through gestures.
- [x] Pixel perfect user interface with dark and light theme.
- [x] Achievements system based on the number of generated colors.

## 📚 Tech Stack

- React Native 0.78 (React 18)
- Expo 52

## ⚙️ Project Requirements

- Java JDK 17
- Node.js 22
- Expo CLI

## 🏃 How to Run

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `npx expo start` to start the development server (to run with Expo Go)
Or run `npx expo prebuild` and `npx expo run:android` or `npx expo run:ios` to build and run the app on your device

## 🔨 How to Build

1. Run `npm install -g eas-cli`
2. Run `eas login`
3. Run `eas build:configure`
4. Run `eas build --platform android --profile development` for Android
5. Run `eas build --platform ios --profile development` for iOS

[Android build available here](https://expo.dev/accounts/lucasvribeiro/projects/hello-there-colors-app/builds/93fb904c-b0e4-4f42-8bd5-573142114004)
