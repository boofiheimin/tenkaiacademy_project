import { tagConfig } from '../lib/tagUtils';

interface Props {
    tagNameEN: string;
}

export const Tag = ({ tagNameEN }: Props) => {
    const config = tagConfig();
    const icon = config[tagNameEN]?.icon || '';
    const color = config[tagNameEN]?.color || '';

    return (
        <span
            className="p-2 rounded-xl text-white w-auto mr-2 last:mr-0"
            style={{ background: color || config.default.color }}
        >{`${icon ? `${icon} ` : config.default.icon}${tagNameEN}`}</span>
    );
};
