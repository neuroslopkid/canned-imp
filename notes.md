# Notes

<https://reactnative.dev/docs/signed-apk-android>

- Keys for release apk build are generated with. Note that you have remember your_password:

```TS
keytool -genkeypair -v -keystore release-key.jks -alias release-key  -keyalg RSA -keysize 2048 -validity 100000 -storepass your_password -keypass your_password -dname "CN=canned-imp, OU=, O=, L=, ST=, C="
```

- Configuration is at android/app/build.gradle:

```TS
MYAPP_UPLOAD_STORE_FILE=release-key.jks
MYAPP_UPLOAD_KEY_ALIAS=release-key
MYAPP_UPLOAD_STORE_PASSWORD=your_password
MYAPP_UPLOAD_KEY_PASSWORD=your_password
```

- Also update android/app/build.gradle:

```GROOVY
android {
    ...
    signingConfigs {
      debug {
        ...
      }
      release {
        if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
          storeFile file(MYAPP_UPLOAD_STORE_FILE)
          storePassword MYAPP_UPLOAD_STORE_PASSWORD
          keyAlias MYAPP_UPLOAD_KEY_ALIAS
          keyPassword MYAPP_UPLOAD_KEY_PASSWORD
        }
      }
    }

    buildTypes {
        debug {
          ...
        }
    release {
      **signingConfig signingConfigs.release**
        ...
        }
    }
    ...
}
```
