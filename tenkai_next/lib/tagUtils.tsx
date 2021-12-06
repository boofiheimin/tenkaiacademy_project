interface TagConfig {
    [key: string]: {
        icon?: string;
        color?: string;
        shortName?: string;
    };
}

const oshiMarkColor = {
    yellow: '#FFD300',
    black: '#28231D',
    red: '#DA012D',
    purple: '#7321B1',
    gray: '#777B7E',
    blue: '#3944BC',
    lightblue: '#6495ED',
    brown: '#795C34',
    orange: '#ED820E',
    pink: '#FD5DA8',
    green: '#32CD32',
};

export const HIDDEN_TAG = ['Collab'];

export const tagConfig = (): TagConfig => ({
    Game: {
        icon: '🎮',
        color: '#DC143C',
    },
    Music: {
        icon: '🎵',
        color: '#3944BC',
    },
    Talk: {
        icon: '💬',
        color: '#FD5DA8',
    },
    Announcement: {
        icon: '📢',
        color: '#32CD32',
    },
    Cooking: {
        icon: '🍳',
        color: '#FA8128',
    },
    Short: {
        icon: '▶',
        color: '#FF8A8A',
    },
    Drawing: {
        icon: '🎨',
        color: '#6495ED',
    },
    'Tokino Sora': {
        icon: '🐻',
        color: oshiMarkColor.blue,
        shortName: 'Sora',
    },
    Roboco: {
        icon: '🤖',
        color: oshiMarkColor.red,
    },
    'Sakura Miko': {
        icon: '🌸',
        color: oshiMarkColor.pink,
        shortName: 'Miko',
    },
    'Hoshimachi Suisei': {
        icon: '☄',
        color: oshiMarkColor.blue,
        shortName: 'Suisei',
    },
    AZKi: {
        icon: '⚒',
        color: oshiMarkColor.red,
    },
    'Akai Haato': {
        icon: '♥',
        color: oshiMarkColor.red,
        shortName: 'Haato',
    },
    'Shirakami Fubuki': {
        icon: '🌽',
        color: oshiMarkColor.lightblue,
        shortName: 'Fubuki',
    },
    'Natsuiro Matsuri': {
        icon: '🏮',
        color: oshiMarkColor.orange,
        shortName: 'Matsuri',
    },
    'Aki Rosenthal': {
        icon: '🍎',
        color: oshiMarkColor.green,
        shortName: 'Aki',
    },
    'Yozora Mel': {
        icon: '🌟',
        color: oshiMarkColor.yellow,
        shortName: 'Mel',
    },
    'Minato Aqua': {
        icon: '⚓',
        color: oshiMarkColor.pink,
        shortName: 'Aqua',
    },
    'Murasaki Shion': {
        icon: '🌙',
        color: oshiMarkColor.purple,
        shortName: 'Shion',
    },
    'Nakiri Ayame': {
        icon: '😈',
        color: oshiMarkColor.red,
        shortName: 'Ayame',
    },
    'Yuzuki Choco': {
        icon: '💋',
        color: oshiMarkColor.pink,
        shortName: 'Choco',
    },
    'Oozora Subaru': {
        icon: '🚑',
        color: oshiMarkColor.yellow,
        shortName: 'Subaru',
    },
    'Ookami Mio': {
        icon: '🌲',
        color: oshiMarkColor.black,
        shortName: 'Mio',
    },
    'Nekomata Okayu': {
        icon: '🍙',
        color: oshiMarkColor.purple,
        shortName: 'Okayu',
    },
    'Inugami Korone': {
        icon: '🥐',
        color: oshiMarkColor.brown,
        shortName: 'Korone',
    },
    'Houshou Marine': {
        icon: '🏴‍☠️',
        color: oshiMarkColor.red,
        shortName: 'Marine',
    },
    'Usada Pekora': {
        icon: '👯‍♀️',
        color: oshiMarkColor.lightblue,
        shortName: 'Pekora',
    },
    'Uruha Rushia': {
        icon: '🦋',
        color: oshiMarkColor.green,
        shortName: 'Rushia',
    },
    'Shirogane Noel': {
        icon: '⚔',
        color: oshiMarkColor.gray,
        shortName: 'Noel',
    },
    'Shiranui Flare': {
        icon: '🔥',
        color: oshiMarkColor.orange,
        shortName: 'Flare',
    },
    'Kiryu Coco': {
        icon: '🐉',
        color: oshiMarkColor.orange,
        shortName: 'Coco',
    },
    'Tokoyami Towa': {
        icon: '👾',
        color: oshiMarkColor.purple,
        shortName: 'Towa',
    },
    'Tsunomaki Watame': {
        icon: '🐏',
        color: oshiMarkColor.yellow,
        shortName: 'Watame',
    },
    'Himemori Luna': {
        icon: '🍬',
        color: oshiMarkColor.pink,
        shortName: 'Luna',
    },
    'Shishiro Botan': {
        icon: '♌',
        color: oshiMarkColor.gray,
        shortName: 'Botan',
    },
    'Yukihana Lamy': {
        icon: '☃',
        color: oshiMarkColor.lightblue,
        shortName: 'Lamy',
    },
    'Momosuzu Nene': {
        icon: '🍑',
        color: oshiMarkColor.orange,
        shortName: 'Nene',
    },
    'Omaru Polka': {
        icon: '🎪',
        color: oshiMarkColor.red,
        shortName: 'Polka',
    },
    'Moona Hoshinova': {
        icon: '🔮',
        color: oshiMarkColor.purple,
        shortName: 'Moona',
    },
    'Ayunda Risu': {
        icon: '🐿',
        color: oshiMarkColor.brown,
        shortName: 'Risu',
    },
    'Airani Iofifteen': {
        icon: '🎨',
        color: oshiMarkColor.gray,
        shortName: 'Iofi',
    },
    'Kureiji Ollie': {
        icon: '🧟‍♀️',
        color: oshiMarkColor.red,
        shortName: 'Ollie',
    },
    'Pavolia Reine': {
        icon: '🦚',
        color: oshiMarkColor.blue,
        shortName: 'Reine',
    },
    'Anya Melfissa': {
        icon: '🍂',
        color: oshiMarkColor.brown,
        shortName: 'Anya',
    },
    'Mori Calliope': {
        icon: '💀',
        color: oshiMarkColor.pink,
        shortName: 'Calli',
    },
    'Takanashi Kiara': {
        icon: '🐔',
        color: oshiMarkColor.orange,
        shortName: 'Kiara',
    },
    "Ninomae Ina'nis": {
        icon: '🐙',
        color: oshiMarkColor.purple,
        shortName: 'Ina',
    },
    'Gawr Gura': {
        icon: '🔱',
        color: oshiMarkColor.blue,
        shortName: 'Gura',
    },
    'Watson Amelia': {
        icon: '🔎',
        color: oshiMarkColor.yellow,
        shortName: 'Amelia',
    },
    IRyS: {
        icon: '💎',
        color: oshiMarkColor.red,
    },
    default: {
        icon: '',
        color: '#737373',
    },
});
