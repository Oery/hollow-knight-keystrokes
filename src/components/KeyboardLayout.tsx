'use client';

import KeyButton from './KeyButton';
import { Sword, ArrowBigLeftDash, ArrowBigRightDash, Shell } from 'lucide-react';
import type { KeyState, LastDirections } from '../types';
import {
	ArrowLeft,
	ArrowDown,
	ArrowRight,
	ArrowUp,
	AbyssShriek,
	DescendingDark,
	ShadeSoulLeft,
	ShadeSoulRight,
	DreamNail,
} from './Arrow';

interface KeyboardLayoutProps {
	keys: Record<string, KeyState>;
	lastDirections: LastDirections;
}

const keyIcons = {
	z: ArrowUp,
	q: ArrowLeft,
	s: ArrowDown,
	d: ArrowRight,
	';': Sword,
	'[-left': ArrowBigLeftDash,
	'[-right': ArrowBigRightDash,
	']-neutral': Shell,
	']-up': AbyssShriek,
	']-down': DescendingDark,
	']-left': ShadeSoulLeft,
	']-right': ShadeSoulRight,
	"'": DreamNail,
};

function KeyboardLayout({ keys, lastDirections }: KeyboardLayoutProps) {
	const spellIcon =
		lastDirections.y === 'neutral'
			? keyIcons[`]-${lastDirections.x}`]
			: keyIcons[`]-${lastDirections.y}`];

	return (
		<div className='flex space-x-8 mb-8'>
			<div className='relative w-64 h-64'>
				<div className='absolute top-0 left-1/2 transform -translate-x-1/2'>
					<KeyButton keyName='z' state={keys.z} Icon={keyIcons.z} />
				</div>
				<div className='absolute top-1/2 left-0 transform -translate-y-1/2'>
					<KeyButton keyName='q' state={keys.q} Icon={keyIcons.q} />
				</div>
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
					<KeyButton keyName='s' state={keys.s} Icon={keyIcons.s} />
				</div>
				<div className='absolute top-1/2 right-0 transform -translate-y-1/2'>
					<KeyButton keyName='d' state={keys.d} Icon={keyIcons.d} />
				</div>
			</div>
			<div className='relative w-64 h-64'>
				<div className='absolute top-1/2 left-0 -translate-y-1/2'>
					<KeyButton keyName=';' state={keys[';']} Icon={keyIcons[';']} />
				</div>
				<div className='absolute top-0 left-1/2 transform -translate-x-1/2'>
					<KeyButton keyName='[' state={keys['[']} Icon={keyIcons[`[-${lastDirections.x}`]} />
				</div>
				<div className='absolute top-0 right-0'>
					<KeyButton keyName=']' state={keys[']']} Icon={spellIcon} />
				</div>
				<div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
					<KeyButton keyName="'" state={keys["'"]} Icon={keyIcons["'"]} />
				</div>
			</div>
		</div>
	);
}

export default KeyboardLayout;
