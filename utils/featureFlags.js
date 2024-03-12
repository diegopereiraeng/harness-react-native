// utils/featureFlags.js
const featureFlags = {
    newUIEnabled: true, // Example flag
};

export const isFeatureEnabled = (flag) => {
    return featureFlags[flag];
};
