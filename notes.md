# Notes

<https://reactnative.dev/docs/signed-apk-android>

- Keys for release apk build are generated with. Note that you have remember your_password:

```TS
keytool -genkeypair -v
  -keystore ci-release-key.jks
  -alias ci-release-key
  -keyalg RSA
  -keysize 2048
  -validity 10000
  -storepass <strong-password>
  -keypass <strong-password>
  -dname "CN=canned-imp, OU=, O=, L=, S=, C="
```

To convert file to base64 to be able to store as secret:

```TS
[Convert]::ToBase64String([IO.File]::ReadAllBytes("ci-release-key.jks"))
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

Working ADB that doesn't break and not responsed on `avd emu`:
<https://dl.google.com/android/repository/platform-tools_r35.0.2-win.zip>

Though it doesn't work also. Only the patch helped a little;

Replace contents in `USERPROFILE\AppData\Local\Android\Sdk\platform-tools`

Install companion:

```TS
adb -s adb-TS6PNJIFWCQ4O7TG-TFivOk._adb-tls-connect._tcp install -r "C:\Projects\canned-imp\node_modules\appium-uiautomator2-driver\node_modules\io.appium.settings\apks\settings_apk-debug.apk"
```
