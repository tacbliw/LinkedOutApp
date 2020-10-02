# LinkedOutApp

## Install

Java SDK: [https://www.oracle.com/java/technologies/javase-jdk15-downloads.html](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html)
Node: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
Yarn: [https://classic.yarnpkg.com/en/docs/install/#windows-stable](https://classic.yarnpkg.com/en/docs/install/#windows-stable)
Android Studio: [https://developer.android.com/studio](https://developer.android.com/studio)

## Prepare

Cài `react-native` và `ignite-cli`
```
yarn global add react-native ignite-cli
```

Cài Android SDK cho Android Studio. Chạy Android Studio -> làm theo hướng dẫn

Cài emulator cho Android Studio. Chạy Android Studio -> Configure -> AVD Manager -> Bấm download bản emulator có trong list.

Đảm bảo tất cả các lệnh sau đều cho ra kết quả, nếu không thì kiểm tra lại PATH.
```
java -version        # folder cài đặt java sdk
emulator -list-avds  # folder Android/Sdk/emulator
adb                  # folder Android/Sdk/platform-tools
react-native -h
ignite
```

## Run
Mở cmd trong folder LinkedOutApp
```
react-native run-android
```
