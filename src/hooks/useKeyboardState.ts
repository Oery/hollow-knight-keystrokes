import { useState, useEffect } from 'react';
import type { KeyState, LastDirections } from '../types';

const initialKeys: Record<string, KeyState> = {
	z: { pressed: false, lastPressed: 0 },
	q: { pressed: false, lastPressed: 0 },
	s: { pressed: false, lastPressed: 0 },
	d: { pressed: false, lastPressed: 0 },
	';': { pressed: false, lastPressed: 0 },
	'[': { pressed: false, lastPressed: 0 },
	']': { pressed: false, lastPressed: 0 },
	"'": { pressed: false, lastPressed: 0 },
};

function useKeyboardState() {
	const [keys, setKeys] = useState(initialKeys);
	const [lastDirections, setLastDirections] = useState<LastDirections>({ x: 'left', y: 'up' });

	useEffect(() => {
		const socket = new WebSocket('ws://localhost:8765');

		socket.onopen = () => {
			console.log('WebSocket connection established');
		};

		socket.onmessage = (event) => {
			const { key, type } = JSON.parse(event.data);

			if (['z', 'q', 's', 'd'].includes(key)) {
				const directions = lastDirections;
				if (key === 'q' && !keys.d.pressed) directions.x = 'left';
				else if (key === 'd' && !keys.q.pressed) directions.x = 'right';
				else if (key === 's') directions.y = type === 'keydown' ? 'down' : 'neutral';
				else if (key === 'z') directions.y = type === 'keydown' ? 'up' : 'neutral';
				setLastDirections(directions);
			}

			setKeys((prevKeys) => ({
				...prevKeys,
				[key]: {
					pressed: type === 'keydown',
					lastPressed: type === 'keydown' ? Date.now() : prevKeys[key].lastPressed,
				},
			}));
		};

		socket.onclose = () => {
			console.log('WebSocket connection closed');
		};

		return () => {
			socket.close();
		};
	}, []);

	return { keys, lastDirections };
}

export default useKeyboardState;
