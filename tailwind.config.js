export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "discord-bg": "#36393f",
        "discord-text": "#dcddde",
        // Discord-like layers for chat area
        dc: {
          "layer-1": "var(--chat-bg)", // main chat background
          "layer-2": "var(--nav-sidebar-bg)", // sidebar background
          "layer-3": "var(--server-sidebar-bg)", // borders/dividers
          input: "var(--input-bg)", // composer background
          text: "var(--text-primary)", // primary text
          muted: "var(--text-muted)", // secondary text
        },
        "server-sidebar-bg": "var(--server-sidebar-bg)",
        "nav-sidebar-bg": "var(--nav-sidebar-bg)",
        "chat-bg": "var(--chat-bg)",
        "user-panel-bg": "var(--user-panel-bg)",
        "input-bg": "var(--input-bg)",
        "primary-accent": "var(--primary-accent)",
        "hover-bg": "var(--hover-bg)",
        "primary-text": "var(--text-primary)",
        "muted-text": "var(--text-muted)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
