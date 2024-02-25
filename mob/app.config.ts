import { type ExpoConfig } from "@expo/config-types";
import { withAppDelegate, type ConfigPlugin } from "expo/config-plugins";

const config: ExpoConfig = {
    "name": "client",
    "slug": "client",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.olegoleg232.client"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "3f344f62-53e2-4584-94ef-1d9512b07adb"
      }
    }
};

const withYandexMaps: ConfigPlugin = (config) => {
  return withAppDelegate(config, async (config) => {
    const appDelegate = config.modResults;

    // Add import
    if (!appDelegate.contents.includes("#import <YandexMapsMobile/YMKMapKitFactory.h>")) {
      // Replace the first line with the intercom import
      appDelegate.contents = appDelegate.contents.replace(
        /#import "AppDelegate.h"/g,
        `#import "AppDelegate.h"\n#import <YandexMapsMobile/YMKMapKitFactory.h>`
      );
    }

    const mapKitMethodInvocations = [
      `[YMKMapKit setApiKey:@"4dcbaad2-be4e-4626-9b1a-a7c4b15ca00b"];`,
      `[YMKMapKit setLocale:@"ru_RU"];`,
      `[YMKMapKit mapKit];`,
    ]
      .map((line) => `\t${line}`)
      .join("\n");

    // Add invocation
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!appDelegate.contents.includes(mapKitMethodInvocations)) {
      appDelegate.contents = appDelegate.contents.replace(
        /\s+return YES;/g,
        `\n\n${mapKitMethodInvocations}\n\n\treturn YES;`
      );
    }

    return config;
  });
};

export default withYandexMaps(config);