import { tagConfig } from '../lib/tagUtils';

interface Props {
    tagNameEN: string;
    className?: string;
}

export const Tag = ({ tagNameEN, className = '' }: Props) => {
    const config = tagConfig();
    const icon = config[tagNameEN]?.icon || '';
    const color = config[tagNameEN]?.color || '';

    return (
        <div
            className={`${className} py-1 px-2 rounded-xl text-white w-auto max-w`}
            style={{
                background: color || config.default.color,
                maxWidth: '7.5rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}
        >{`${icon ? `${icon} ` : config.default.icon}${tagNameEN}`}</div>
    );
};
