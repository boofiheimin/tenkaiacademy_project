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
        <span
            className={`${className} p-2 rounded-xl text-white w-auto`}
            style={{ background: color || config.default.color }}
        >{`${icon ? `${icon} ` : config.default.icon}${tagNameEN}`}</span>
    );
};
