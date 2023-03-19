- To open a simulator
  Library/Android/sdk/emulator
  ./emulator -avd Copy_of_Pixel_3a_API_32_arm64-v8a


- To run app in debug mode
    react-native start --reset-cache
    react-native run-android



- To create new typescript react native project
  --> npx react-native init toki --template react-native-template-typescript

- To create husky script<https://typicode.github.io/husky/#/?id=install>

  npx husky install
  npx husky add .husky/pre-commit "npm test"

  npx mrm@2 lint-staged

- To build debug apk
    - react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
    - gradlew assembleDebug
    - adb install
    - APK Path : android/app/build/outputs/apk/debug/app-debug.apk



* Check https://www.youtube.com/watch?v=ltOccWcwnxw&ab_channel=CallstackEngineers for latest updates on react paper UI library






### Issues faced and solution wokred 
 * https://stackoverflow.com/questions/71702392/viewproptypes-will-be-removed-from-react-native-migrate-to-viewproptypes-export

  npx patch-package react-native


 * https://medium.com/@iwiick/how-to-fix-rncsafeareaprovider-was-not-found-in-the-uimanager-error-1b762c15ee7f

 * Failed while making debug build 
   https://stackoverflow.com/questions/59937865/react-native-bundle-error-error-sha-1-for-file-is-not-computed

 * Developer error
    https://stackoverflow.com/questions/54417232/react-native-google-signin-gives-developer-error
    
 * Google sign in Default app created
    https://stackoverflow.com/questions/40563140/error-no-firebase-app-default-has-been-created-call-firebase-app-initiali




* To make release build 
  -- https://www.youtube.com/watch?v=A3--3Ozxz6o&ab_channel=notJust%E2%80%A4dev

  * Productino Build

  1. keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

  2. Move keystore to android/app folder
  3. Go to android/gradle.properties file paste EOF
      MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
      MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
      MYAPP_UPLOAD_STORE_PASSWORD=android
      MYAPP_UPLOAD_KEY_PASSWORD=android
  4. Go to android/app/build.gradle and fine signingConfigs

          release {
              if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                  storeFile file(MYAPP_UPLOAD_STORE_FILE)
                  storePassword MYAPP_UPLOAD_STORE_PASSWORD
                  keyAlias MYAPP_UPLOAD_KEY_ALIAS
                  keyPassword MYAPP_UPLOAD_KEY_PASSWORD
              }
          }
  5. To rename app and appid use lib
      npm i react-native-rename
      EX. npx react-native-rename "Toki App" -b "com.elite.toki"
  6. To increment version on every release 
      npm i -g react-native-version --save
      command to update : react-native-version --never-amend
  7. To create icon
      https://www.appicon.co/
  8. Now bundle release with this command
      ./gradlew bundleRelease

  Tools
  1. https://png2jpg.com/
  2. https://www.privacypolicies.com/blog/mobile-apps-privacy-policy/


  keytool -exportcert -v -alias my-key-alias -keystore my-upload-key.keystore