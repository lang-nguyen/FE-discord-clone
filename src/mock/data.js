export const DUMMY_SERVERS = [
    {
        id: 'server-1',
        name: 'React Developers',
        icon: 'https://ui-avatars.com/api/?name=React+Developers&background=61dafb&color=fff',
    },
    {
        id: 'server-2',
        name: 'Gaming Lounge',
        icon: 'https://ui-avatars.com/api/?name=Gaming+Lounge&background=7289da&color=fff',
    },
];

export const DUMMY_CHANNELS = [
    { id: 'channel-1', name: 'general', type: 'text' },
    { id: 'channel-2', name: 'help', type: 'text' },
    { id: 'channel-3', name: 'voice-chat', type: 'voice' },
];

export const DUMMY_MESSAGES = [
    {
        id: 'msg-1',
        content: 'Hello everyone! Welcome to the server.',
        sender: {
            id: 'user-1',
            username: 'Admin',
            avatar: 'https://ui-avatars.com/api/?name=Admin',
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    },
    {
        id: 'msg-2',
        content: 'Hi! I am new here.',
        sender: {
            id: 'user-2',
            username: 'NewMember',
            avatar: 'https://ui-avatars.com/api/?name=New+Member',
        },
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    },
];
