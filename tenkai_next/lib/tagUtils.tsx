interface TagConfig {
    [key: string]: {
        icon: string;
        color: string;
    };
}

export const tagConfig = (): TagConfig => ({
    Singing: {
        icon: '🎤',
        color: '#0EA5E9',
    },
    default: {
        icon: '',
        color: '#737373',
    },
});
