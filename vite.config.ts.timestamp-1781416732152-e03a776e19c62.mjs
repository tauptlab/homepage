// vite.config.ts
import { defineConfig } from "file:///C:/WorkSpace/Projects/_personal/taupt-official/node_modules/vite/dist/node/index.js";
import react from "file:///C:/WorkSpace/Projects/_personal/taupt-official/node_modules/@vitejs/plugin-react/dist/index.js";
import { vanillaExtractPlugin } from "file:///C:/WorkSpace/Projects/_personal/taupt-official/node_modules/@vanilla-extract/vite-plugin/dist/vanilla-extract-vite-plugin.cjs.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\WorkSpace\\Projects\\_personal\\taupt-official";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin()
  ],
  resolve: {
    alias: {
      "@app": resolve(__vite_injected_original_dirname, "src/app"),
      "@pages": resolve(__vite_injected_original_dirname, "src/pages"),
      "@widgets": resolve(__vite_injected_original_dirname, "src/widgets"),
      "@features": resolve(__vite_injected_original_dirname, "src/features"),
      "@entities": resolve(__vite_injected_original_dirname, "src/entities"),
      "@shared": resolve(__vite_injected_original_dirname, "src/shared")
    }
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          state: ["zustand"],
          router: ["react-router-dom"],
          markdown: ["gray-matter", "marked"]
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxXb3JrU3BhY2VcXFxcUHJvamVjdHNcXFxcX3BlcnNvbmFsXFxcXHRhdXB0LW9mZmljaWFsXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxXb3JrU3BhY2VcXFxcUHJvamVjdHNcXFxcX3BlcnNvbmFsXFxcXHRhdXB0LW9mZmljaWFsXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Xb3JrU3BhY2UvUHJvamVjdHMvX3BlcnNvbmFsL3RhdXB0LW9mZmljaWFsL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IHZhbmlsbGFFeHRyYWN0UGx1Z2luIH0gZnJvbSAnQHZhbmlsbGEtZXh0cmFjdC92aXRlLXBsdWdpbidcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB2YW5pbGxhRXh0cmFjdFBsdWdpbigpLFxuICBdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAYXBwJzogICAgICByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9hcHAnKSxcbiAgICAgICdAcGFnZXMnOiAgICByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9wYWdlcycpLFxuICAgICAgJ0B3aWRnZXRzJzogIHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL3dpZGdldHMnKSxcbiAgICAgICdAZmVhdHVyZXMnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9mZWF0dXJlcycpLFxuICAgICAgJ0BlbnRpdGllcyc6IHJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2VudGl0aWVzJyksXG4gICAgICAnQHNoYXJlZCc6ICAgcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvc2hhcmVkJyksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICdkaXN0JyxcbiAgICBzb3VyY2VtYXA6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nXSxcbiAgICAgICAgICBzdGF0ZTogIFsnenVzdGFuZCddLFxuICAgICAgICAgIHJvdXRlcjogWydyZWFjdC1yb3V0ZXItZG9tJ10sXG4gICAgICAgICAgbWFya2Rvd246IFsnZ3JheS1tYXR0ZXInLCAnbWFya2VkJ10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVSxTQUFTLG9CQUFvQjtBQUNuVyxPQUFPLFdBQVc7QUFDbEIsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxlQUFlO0FBSHhCLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLHFCQUFxQjtBQUFBLEVBQ3ZCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFhLFFBQVEsa0NBQVcsU0FBUztBQUFBLE1BQ3pDLFVBQWEsUUFBUSxrQ0FBVyxXQUFXO0FBQUEsTUFDM0MsWUFBYSxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUM3QyxhQUFhLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQzlDLGFBQWEsUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDOUMsV0FBYSxRQUFRLGtDQUFXLFlBQVk7QUFBQSxJQUM5QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQSxVQUM3QixPQUFRLENBQUMsU0FBUztBQUFBLFVBQ2xCLFFBQVEsQ0FBQyxrQkFBa0I7QUFBQSxVQUMzQixVQUFVLENBQUMsZUFBZSxRQUFRO0FBQUEsUUFDcEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
