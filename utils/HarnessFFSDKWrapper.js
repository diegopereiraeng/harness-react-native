// src/utils/HarnessFFSDKWrapper.js
import { useEffect, useState } from 'react';
import { initialize, useFeatureFlag } from '@harnessio/ff-react-client-sdk';

const sdkConfig = {
    apiKey: "YOUR_API_KEY", // Your actual API key here
    target: {
        identifier: "diego", // Dynamic user identifier
        name: "diego", // Dynamic user name
        attributes: {
        email: "diego@harness.io", // Dynamic user email
        location: "LATAM", // Dynamic user location
        },
    },
};

let sdkClient;

export const initHarnessFFSDK = async () => {
    sdkClient = await initialize(sdkConfig.apiKey, sdkConfig.target);
};

export const useFeature = (featureKey, defaultValue) => {
    const [isEnabled, setIsEnabled] = useState(defaultValue);

    useEffect(() => {
        const fetchFeatureFlag = async () => {
        if (!sdkClient) {
            console.warn('Harness FF SDK client not initialized');
            return;
        }

        const flagValue = await sdkClient.boolVariation(featureKey, defaultValue);
        setIsEnabled(flagValue);
        };

        fetchFeatureFlag();
    }, [featureKey, defaultValue]);

    return isEnabled;
};
