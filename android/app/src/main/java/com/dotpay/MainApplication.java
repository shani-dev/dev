package com.dotpay;

import android.app.Application;
import android.content.Context;
import android.support.multidex.MultiDex;

import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;

import cl.json.ShareApplication;
import fr.greweb.reactnativeviewshot.RNViewShotPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import cl.json.RNSharePackage;
import io.github.mazurco066.RNSettingsPagePackage;
import com.swmansion.reanimated.ReanimatedPackage;
import community.revteltech.nfc.NfcManagerPackage;
import com.oblador.keychain.KeychainPackage;
import com.imagepicker.ImagePickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import io.invertase.firebase.RNFirebasePackage;
import com.rt2zz.reactnativecontacts.ReactNativeContacts;
import org.reactnative.camera.RNCameraPackage;
import ui.bottomactionsheet.RNBottomActionSheetPackage;
import com.centaurwarchief.smslistener.SmsListenerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;

public class MainApplication extends Application implements ReactApplication, ShareApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AsyncStoragePackage(),
            new RNViewShotPackage(),
            new ReactNativeContacts(),
            new RNSharePackage(),
            new RNFirebasePackage(),
            new RNFetchBlobPackage(),
            new RNSettingsPagePackage(),
            new RNBottomActionSheetPackage(),
            new NfcManagerPackage(),
            new ImagePickerPackage(),
            new ReanimatedPackage(),
            new FingerprintAuthPackage(),
            new SplashScreenReactPackage(),
            new RNFirebaseMessagingPackage(),
            new RNFirebaseNotificationsPackage(),
            new RNCameraPackage(),
            new KeychainPackage(),
            new SmsListenerPackage(),
            new LinearGradientPackage(),
            new RNGestureHandlerPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  protected void attachBaseContext(Context base) {
    super.attachBaseContext(base);
    MultiDex.install(this);
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override
  public String getFileProviderAuthority() {
    return BuildConfig.APPLICATION_ID + ".provider";
  }
}
