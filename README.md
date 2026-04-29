# Cloud Summit Mobile App

A mobile app for Cloud Summit 2026

## Pre-requisites

- Node.js (LTS recommended)
- Java 17 (required for Android local builds)
- An Android phone or iPhone
- [Expo Go](https://expo.dev/go)

## Getting Started

1. Clone the repo
2. Install dependencies (`npm install`)
3. Run the project (`npm run start`)
4. Scan the provided QR code using Expo Go

## Run on Android (local build)

If you want to run a native Android build instead of Expo Go:

1. Ensure Java 17 is active:
   - `export JAVA_HOME=$(/usr/libexec/java_home -v 17)`
   - `export PATH="$JAVA_HOME/bin:$PATH"`
2. Run Android build:
   - `npm run android`

## Native run commands

```bash
npx expo run:android
npx expo run:ios
```

### Troubleshooting

- If Android build fails with `Unsupported class file major version 69` or
  `Error resolving plugin [id: 'com.facebook.react.settings']` and shows
  `25.0.1`, your Java version is too new (Java 25). Switch to Java 17 and rerun.

If Android native build continues to fail, run this clean rebuild flow:

```bash
rm -rf node_modules android/.gradle android/build
npm install
npx expo prebuild --clean
npx expo run:android
```

If needed, force Java 17 in the current shell and rerun:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
export PATH="$JAVA_HOME/bin:$PATH"
java -version
npx expo run:android
```

## Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started): If you have used React before, this is similar with minor differences in available components and styling
- [Expo Router](https://docs.expo.dev/router/basics/core-concepts/): Expo is a full-stack React Native framework that provides a lot of APIS and services to make working with React Native smoother. Expo Router is part of a pre-configured file-based router that makes it easy for developers to manage navigation in mobile apps. It is built on top of [React Navigation](https://reactnavigation.org/) so all concepts from React Navigation will work on Expo Router
  - [JavaScript tabs](https://docs.expo.dev/router/advanced/tabs/): A navigation layout supported by Expo Router
