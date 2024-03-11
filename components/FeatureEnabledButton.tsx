// File: components/FeatureEnabledButton.tsx
import React from 'react';
import { Button, View } from 'react-native';
import { useFeatureFlag } from '@harnessio/ff-react-client-sdk';

const FeatureEnabledButton: React.FC = () => {
  const isEnabled = useFeatureFlag('step_feature', false);

  if (!isEnabled) {
    return null; // Don't render the button if the feature flag is disabled
  }

  return (
    <View style={{ margin: 20 }}>
      <Button title="Feature-Enabled Action" onPress={() => console.log('Action!')} />
    </View>
  );
};

export default FeatureEnabledButton;
