import KeyboardLayout from './components/KeyboardLayout';
import useKeyboardState from './hooks/useKeyboardState';

function App() {
	const { keys, lastDirections } = useKeyboardState();

	return (
		<div className='min-h-screen flex flex-col items-center justify-center text-white'>
			<KeyboardLayout keys={keys} lastDirections={lastDirections} />
		</div>
	);
}

export default App;
