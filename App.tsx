import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Dimensions } from 'react-native';
import Header from './components/Header'; // Import the custom Header component
import { FFContextProvider, useFeatureFlag } from '@harnessio/ff-react-client-sdk'; // Importing SDK

const { width } = Dimensions.get('window');

const Step: React.FC<{ title: string; content: string; featureFlag?: string }> = ({ title, content, featureFlag }) => {
  // Conditionally using a feature flag if provided
  const isEnabled = featureFlag ? useFeatureFlag(featureFlag, false) : true;

  if (!isEnabled) return null; // Do not render this step if the feature flag is off

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepContent}>{content}</Text>
    </View>
  );
};

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#0E1D34' : '#FFFFFF',
  };

  return (
    <FFContextProvider
      apiKey="c19d34f7-f105-4c48-8676-b26ab4a6ecd8" // Replace with your actual Harness Feature Flag SDK key
      target={{
        identifier: 'diego', // Unique identifier for the user or device
        name: 'Diego', // Optional: Name of the user or device
        // You can also pass additional attributes here
      }}>
      <SafeAreaView style={[styles.safeAreaView, backgroundStyle]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Header />
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          {/* Optionally use feature flags to conditionally render steps */}
          <Step
            title="Step One"
            content="Install Harness and configure your project for CI/CD pipelines."
            featureFlag="featureFlagForStepOne" // Replace with actual flag key
          />
          <Step
            title="Step Two"
            content="Define your build and test workflows within the Harness platform."
            featureFlag="featureFlagForStepTwo" // Replace with actual flag key
          />
          {/* Other steps remain unchanged */}
          <Step
            title="Step Three"
            content="Set up your deployment strategy and distribution methods for iOS."
          />
          <Step
            title="Step Four"
            content="Monitor your app's performance and user feedback after deployment."
          />
        </ScrollView>
      </SafeAreaView>
    </FFContextProvider>
  );
};

const styles = StyleSheet.create({
  // Styles remain unchanged
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
