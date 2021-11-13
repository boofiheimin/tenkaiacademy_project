import { Placement } from '@popperjs/core';
import { ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';

interface Props {
    text: string;
    children: ReactNode;
    className?: string;
    placement?: Placement;
    disabled?: boolean;
}

export const Tooltip = ({ text, children, className, placement = 'bottom', disabled = false }: Props) => {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes, update } = usePopper(referenceElement, popperElement, {
        placement,
        modifiers: [
            { name: 'arrow', options: { element: arrowElement } },
            {
                name: 'offset',
                options: {
                    offset: [0, 8],
                },
            },
        ],
    });
    const show = () => {
        if (!disabled) {
            update();
        }
    };

    return (
        <div className={`${className} group`} onMouseEnter={show}>
            <div ref={setReferenceElement}>{children}</div>
            <div
                id="tooltip"
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
                className="text-base bg-black text-white p-2 rounded-xl top-4 hidden canhover:group-hover:block font-bold z-40"
            >
                <span>{text}</span>
                <div id="arrow" ref={setArrowElement} style={{ ...styles.arrow }} />
            </div>
        </div>
    );
};
