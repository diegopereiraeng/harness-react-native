// File: App.tsx

import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Dimensions } from 'react-native';
import Header from './components/Header';
import { FFContextProvider, useFeatureFlag } from '@harnessio/ff-react-native-client-sdk';

const { width } = Dimensions.get('window');

const Step: React.FC<{ title: string; content: string }> = ({ title, content }) => {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepContent}>{content}</Text>
    </View>
  );
};

const FeatureButton = () => {
  // Replace 'harnessappdemodarkmode' with your actual feature flag key
  const isFeatureEnabled = useFeatureFlag(flagIdentifier: 'button_feature');

  if (!isFeatureEnabled) return null;

  return <Button title="Feature Enabled Button" onPress={() => alert("Feature Flag Button Clicked")} />;
};

const StepFeature = () => {
  // Replace 'harnessappdemodarkmode' with your actual feature flag key
  const isFeatureEnabled = useFeatureFlag('step_feature');

  if (!isFeatureEnabled) return null;

  return <Step title="Step Five" content="enable Feature Flags in Production" />;
};

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#0E1D34' : '#FFFFFF',
  };

  return (
    <SafeAreaView style={[styles.safeAreaView, backgroundStyle]}>
        <FFContextProvider
          apiKey="1aaff08c-acde-44e0-aab6-abb8b40ae4f9"
          target={{ name: 'ReactNativeClientSDK', identifier: 'reactnativeclientsdk' }}
        >
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Header />
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}  
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          <Step title="Step One" content="Install Harness and configure your project for CI/CD pipelines." />
          <Step title="Step Two" content="Define your build and test workflows within the Harness platform." />
          <Step title="Step Three" content="Set up your deployment strategy and distribution methods for iOS." />
          <Step title="Step Four" content="Monitor your app's performance and user feedback after deployment." />
          <StepFeature />
        </ScrollView>
        <FeatureButton />
      </FFContextProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  stepContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0292E3',
    marginBottom: 15,
  },
  stepContent: {
    fontSize: 18,
    color: '#5C5C5C',
  },
});

export default App;