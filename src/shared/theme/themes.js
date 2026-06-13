export const THEMES = {
  default: {
    name: "Default Dark",
    colors: {
      "--server-sidebar-bg": "#1e1f22",
      "--nav-sidebar-bg": "#2b2d31",
      "--chat-bg": "#313338",
      "--user-panel-bg": "#232428",
      "--input-bg": "#383a40",
      "--primary-accent": "#5865F2",
      "--hover-bg": "#35373C",
      "--text-primary": "#f2f3f5",
      "--text-muted": "#949ba4",
    },
  },
  light: {
    name: "Light Theme",
    colors: {
      "--server-sidebar-bg": "#e3e5e8",
      "--nav-sidebar-bg": "#f2f3f5",
      "--chat-bg": "#ffffff",
      "--user-panel-bg": "#ebedf0",
      "--input-bg": "#e3e5e8",
      "--primary-accent": "#5865F2",
      "--hover-bg": "#dbdee1",
      "--text-primary": "#060607",
      "--text-muted": "#4f5660",
    },
  },
};

export const THEME_STORAGE_KEY = "app_theme";
