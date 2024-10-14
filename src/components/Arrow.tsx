import ArrowImg from '../assets/arrow.png';
import AbyssShriekImg from '../assets/abyss-shriek.png';
import DescendingDarkImg from '../assets/descending-dark.png';
import ShadeSoulLeftImg from '../assets/shade-soul-left.png';
import ShadeSoulRightImg from '../assets/shade-soul-right.png';
import DreamNailImg from '../assets/dream-nail.png';

export function ArrowUp() {
	return (
		<div className='max-w-8 max-h-8 flex items-center justify-center -rotate-90'>
			<img src={ArrowImg} alt='arrow' />
		</div>
	);
}

export function ArrowDown() {
	return (
		<div className='max-w-8 max-h-8 flex items-center justify-center rotate-90'>
			<img src={ArrowImg} alt='arrow' />
		</div>
	);
}

export function ArrowLeft() {
	return (
		<div className='max-w-8 max-h-8 flex items-center justify-center rotate-180'>
			<img src={ArrowImg} alt='arrow' />
		</div>
	);
}

export function ArrowRight() {
	return (
		<div className='max-w-8 max-h-8 flex items-center justify-center'>
			<img src={ArrowImg} alt='arrow' />
		</div>
	);
}

export function AbyssShriek() {
	return (
		<div className='max-w-8 max-h-8 flex items-center justify-center '>
			<img src={AbyssShriekImg} alt='abyss_shriek' />
		</div>
	);
}

export function DescendingDark() {
	return (
		<div className='max-w-12 max-h-12 flex items-center justify-center '>
			<img src={DescendingDarkImg} alt='descending_dark' />
		</div>
	);
}

export function ShadeSoulLeft() {
	return (
		<div className='max-w-12 max-h-12 flex items-center justify-center '>
			<img src={ShadeSoulLeftImg} alt='shade_soul' />
		</div>
	);
}

export function ShadeSoulRight() {
	return (
		<div className='max-w-12 max-h-12 flex items-center justify-center '>
			<img src={ShadeSoulRightImg} alt='shade_soul' />
		</div>
	);
}

export function DreamNail() {
	return (
		<div className='max-w-12 max-h-12 flex items-center justify-center '>
			<img src={DreamNailImg} alt='dream_nail' />
		</div>
	);
}
