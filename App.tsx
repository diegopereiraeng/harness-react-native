// File: App.tsx

import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Dimensions } from 'react-native';
import Header from './components/Header'; // Import the custom Header component
import { FFContextProvider } from '@harnessio/ff-react-client-sdk';
import FeatureEnabledButton from './components/FeatureEnabledButton';

const { width } = Dimensions.get('window');

const Step: React.FC<{ title: string; content: string }> = ({ title, content }) => {
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
    backgroundColor: isDarkMode ? '#0E1D34' : '#FFFFFF', // Example of dark and light theme
  };

  return (
    <FFContextProvider
      apiKey="c19d34f7-f105-4c48-8676-b26ab4a6ecd8"
      target={{
        identifier: 'diego', // unique identifier for the user
        name: 'Diego',
        attributes: {
          email: 'diego@harness.io',
          location: 'LATAM',
        },
      }}
      options={{
        streamEnabled: true,
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
          {/* Each Step component is a page in the horizontal scroll view */}
          <Step
            title="Step One"
            content="Install Harness and configure your project for CI/CD pipelines."
          />
          <Step
            title="Step Two"
            content="Define your build and test workflows within the Harness platform."
          />
          <Step
            title="Step Three"
            content="Set up your deployment strategy and distribution methods for iOS."
          />
          <Step
            title="Step Four"
            content="Monitor your app's performance and user feedback after deployment."
          />
        </ScrollView>
        <FeatureEnabledButton />
      </SafeAreaView>
    </FFContextProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  stepContainer: {
    width: width, // Each step will be the full width of the screen
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0292E3', // Harness brand color for titles
    marginBottom: 15,
  },
  stepContent: {
    fontSize: 18,
    color: '#5C5C5C', // Subdued text color for content
  },
  // ... Add more styles as needed
});

export default App;
