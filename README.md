# MuteParrot - Android

This is a React Native for Android prototype app, based on React and Redux

## Getting started

```
react-native run-android
adb reverse tcp:8081 tcp:8081
```

### Packaging a release

- Create bundle
```
react-native bundle --platform android --dev false --entry-file index.android.js \
  --bundle-output android/app/src/main/assets/index.android.bundle \
    --assets-dest android/app/src/main/res/
```

```
cd android && ./gradlew assembleRelease
cd android && ./gradlew installRelease
```

## Tools
[Debugger](http://localhost:8081/debugger-ui)

## Samples
- https://github.com/KevinOfNeu/xReddit/
- Redux examples: https://github.com/reactjs/redux/blob/master/examples/

## Articles

### General
- http://marmelab.com/blog/2015/12/17/react-directory-structure.html

### List View
- https://medium.com/@spencer_carli/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8#.e6n37x3nx
- http://richardkho.com/section-headers-in-react-native-listview-components/

### Routing
- http://blog.paracode.com/2016/01/05/routing-and-navigation-in-react-native/
