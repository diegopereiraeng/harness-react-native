jest.mock('@harnessio/ff-react-native-client-sdk', () => {
    return {
    FFContextProvider: ({ children }) => children, // Mock the FFContextProvider as a pass-through component
    useFeatureFlag: jest.fn().mockImplementation((flagName, defaultValue) => {
        // Mock implementation that returns a specific value based on the flag name
        // Customize this logic based on your test requirements
        const flags = {
        'step_feature': true, // Example flag
        // Add other flags and their mock values as needed
        };
        return flags[flagName] || defaultValue;
    }),
    useFeatureFlags: jest.fn().mockReturnValue({
        // Return an object with your mocked flag values
        'step_feature': true, // Example flag
        // Add other flags as needed
    }),
    // Mock other SDK hooks and functions as needed
    };
});
