import type { Config } from "@react-router/dev/config";

export default {
    // Config options...
    // serverBuildTarget: "static", // Uncomment if you want to deploy to static hosting
    ssr: false, // Set to false if you want a pure client-side app like standard React
} satisfies Config;
