import type { SVGProps } from 'react';

interface SendMessageSendShareProps extends SVGProps<SVGSVGElement> {
    color?: string;
}

const SendMessageSendShare = ({
    color = '#FFF',
    ...props
}: SendMessageSendShareProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
        <path fill="none" d="M0 0h24v24H0z" />
        <path
            fill={color}
            d="m2.874 5.995 2.142 6.002-2.142 6.01c-.61 1.703 1.122 3.313 2.765 2.551l14.429-6.699c1.577-.731 1.577-2.989 0-3.72L5.638 3.442c-1.642-.762-3.374.848-2.764 2.553m2.133-1.193 14.43 6.697a.555.555 0 0 1 0 1l-14.43 6.699c-.427.198-.885-.228-.72-.687l2.232-6.262a.75.75 0 0 0 0-.504L4.286 5.49c-.164-.46.294-.887.721-.689"
        />
        <path
            fill={color}
            d="M20.5 11.25a.75.75 0 0 1 .102 1.493l-.102.007H5.81a.75.75 0 0 1-.102-1.493l.102-.007z"
        />
    </svg>
);
export default SendMessageSendShare;
