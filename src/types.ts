export interface KeyState {
	pressed: boolean;
	lastPressed: number;
}

export interface LastDirections {
	x: 'left' | 'right';
	y: 'up' | 'down' | 'neutral';
}
