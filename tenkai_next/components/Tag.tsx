import { tagConfig } from '../lib/tagUtils';

interface Props {
    tagNameEN: string;
    className?: string;
    full?: boolean;
}

export const Tag = ({ tagNameEN, className = '', full }: Props) => {
    const config = tagConfig();
    const tagSetting = config[tagNameEN];
    const icon = tagSetting?.icon || '';
    const color = tagSetting?.color || '';
    const tagName = full ? tagNameEN : tagSetting?.shortName || tagNameEN;

    return (
        <div
            className={`${className} py-1 px-2 rounded-xl text-white w-auto max-w-full`}
            style={{
                background: color || config.default.color,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            }}
        >{`${icon ? `${icon} ` : config.default.icon}${tagName}`}</div>
    );
};
