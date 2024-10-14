'use client';

import type { KeyState } from '../types';

interface KeyButtonProps {
	keyName: string;
	state: KeyState;
	Icon?: React.ElementType;
}

function KeyButton({ keyName, state, Icon }: KeyButtonProps) {
	const style = {
		transform: `scale(${state.pressed ? 1.1 : 1})`,
		opacity: state.pressed ? 0.8 : 0.5,
		transition: 'all 0.1s ease-out',
	};

	return (
		<div
			className={`w-20 h-20 bg-gray-950 rounded-md flex items-center justify-center text-3xl font-bold uppercase ${
				state.pressed ? 'key-pressed' : ''
			}`}
			style={style}
		>
			{Icon ? <Icon className='w-10 h-10' /> : keyName}
			<span className='sr-only'>{keyName}</span>
		</div>
	);
}

export default KeyButton;
