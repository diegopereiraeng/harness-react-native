// File: App.tsx
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Dimensions } from 'react-native';
import Header from './components/Header'; // Import the custom Header component
import {
  FFContextProvider,
  useFeatureFlag,
} from '@harnessio/ff-react-native-client-sdk';

const { width } = Dimensions.get('window');

const Step: React.FC<{ title: string; content: string; featureFlag?: string }> = ({ title, content, featureFlag }) => {
  const flagValue = featureFlag ? useFeatureFlag(featureFlag, false) : true;

  if (!flagValue) return null; // Do not render this step if the feature flag is off

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
      apiKey="c19d34f7-f105-4c48-8676-b26ab4a6ecd8" // Replace "YOUR_API_KEY" with your actual Harness Feature Flag API key
      target={{
        identifier: 'uniqueUserOrDeviceIdentifier', // Use a unique identifier for the target
        name: 'UserOrDeviceName', // Optional: Provide a more human-readable name for the target
      }}
    >
      <SafeAreaView style={[styles.safeAreaView, backgroundStyle]}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Header />
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}
        >
          {/* Optionally, pass a featureFlag prop to Step components to control their rendering */}
          <Step
            title="Step One"
            content="Install Harness and configure your project for CI/CD pipelines."
            featureFlag="stepOneEnabled"
          />
          <Step
            title="Step Two"
            content="Define your build and test workflows within the Harness platform."
            featureFlag="stepTwoEnabled"
          />
          <Step
            title="Step Three"
            content="Set up your deployment strategy and distribution methods for iOS."
            // If no featureFlag prop is provided, the step is always rendered
          />
          <Step
            title="Step Four"
            content="Monitor your app's performance and user feedback after deployment."
            featureFlag="stepFourEnabled"
          />
        </ScrollView>
      </SafeAreaView>
    </FFContextProvider>
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
  // Add more styles as needed
});

export default App;
