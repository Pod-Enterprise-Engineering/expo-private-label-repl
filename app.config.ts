import { ConfigContext, ExpoConfig } from "expo/config";
import merge from "lodash.merge";

const configs: Record<string, ConfigContext["config"]> = {
  first: {
    icon: "./assets/images/icon.png",
  },
  second: {
    icon: "./assets/images/icon-flipped.png",
    slug: "second-expo-private-label-repl",
    name: "second-expo-private-label-repl",
    ios: {
      supportsTablet: true,
      bundleIdentifier:
        "com.pod-enterprise-engineering.second-expo-private-label-repl",
    },
  },
};

export default function ({ config }: ConfigContext): ExpoConfig {
  const privateLabelSchema = process.env.EXPO_PRIVATE_LABEL_SCHEMA ?? "first";

  const overrides =
    privateLabelSchema in configs ? configs[privateLabelSchema] : {};

  // Use lodash.merge to recursively merge configurations, allowing for shallow overrides
  const mergedConfig = merge(
    config, // Base config is loaded from app.json and package.json
    { slug: "expo-private-label-repl", name: "expo-private-label-repl" },
    overrides
  );

  return mergedConfig;
}
