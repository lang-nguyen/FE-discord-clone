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
    {
        id: 'server-3',
        name: 'Study Group',
        icon: 'https://ui-avatars.com/api/?name=Study+Group&background=ffcc00&color=000',
    },
    {
        id: 'server-4',
        name: 'Design Hub',
        icon: 'https://ui-avatars.com/api/?name=Design+Hub&background=ff6699&color=fff',
    },
    {
        id: 'server-5',
        name: 'Music Club',
        icon: 'https://ui-avatars.com/api/?name=Music+Club&background=9933ff&color=fff',
    },
];

export const DUMMY_CHANNELS = [
    { id: 'channel-1', name: 'general', type: 'text' },
    { id: 'channel-2', name: 'help', type: 'text' },
    { id: 'channel-3', name: 'random', type: 'text' },
    { id: 'channel-4', name: 'voice-chat', type: 'voice' },
    { id: 'channel-5', name: 'gaming-voice', type: 'voice' },
];

export const DUMMY_MESSAGES = [
    {
        id: 'msg-1',
        content: 'Hello everyone! Welcome to the server.',
        sender: { id: 'user-1', username: 'Admin', avatar: 'https://ui-avatars.com/api/?name=Admin' },
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    },
    {
        id: 'msg-2',
        content: 'Hi! I am new here.',
        sender: { id: 'user-2', username: 'NewMember', avatar: 'https://ui-avatars.com/api/?name=New+Member' },
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
        id: 'msg-3',
        content: 'Welcome! Make yourself at home.',
        sender: { id: 'user-3', username: 'Moderator', avatar: 'https://ui-avatars.com/api/?name=Moderator' },
        timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    },
    {
        id: 'msg-4',
        content: 'Does anyone want to play a game?',
        sender: { id: 'user-4', username: 'GamerGuy', avatar: 'https://ui-avatars.com/api/?name=Gamer+Guy' },
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    },
    {
        id: 'msg-5',
        content: 'I am down for some Valorant!',
        sender: { id: 'user-5', username: 'ProSniper', avatar: 'https://ui-avatars.com/api/?name=Pro+Sniper' },
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
        id: 'msg-6',
        content: 'Cool, join the voice channel.',
        sender: { id: 'user-4', username: 'GamerGuy', avatar: 'https://ui-avatars.com/api/?name=Gamer+Guy' },
        timestamp: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    },
    {
        id: 'msg-7',
        content: 'Can someone help me with React hooks?',
        sender: { id: 'user-2', username: 'NewMember', avatar: 'https://ui-avatars.com/api/?name=New+Member' },
        timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
    {
        id: 'msg-8',
        content: 'Sure, what do you need help with?',
        sender: { id: 'user-1', username: 'Admin', avatar: 'https://ui-avatars.com/api/?name=Admin' },
        timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    },
    {
        id: 'msg-9',
        content: 'I am confused about useEffect dependencies.',
        sender: { id: 'user-2', username: 'NewMember', avatar: 'https://ui-avatars.com/api/?name=New+Member' },
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
        id: 'msg-10',
        content: 'Let\'s hop in the voice chat and I\'ll explain.',
        sender: { id: 'user-1', username: 'Admin', avatar: 'https://ui-avatars.com/api/?name=Admin' },
        timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    },
];
