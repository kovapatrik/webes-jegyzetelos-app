import { colors, useTheme } from '../../design/theme/themeColors';

export default function TestPage() {
	const { theme, setCurrentTheme } = useTheme();

	function toggleTheme() {
		if (setCurrentTheme) {
			console.log('toggle');
			theme === colors.dark ? setCurrentTheme(colors.light) : setCurrentTheme(colors.dark);
			console.log(theme === colors.dark);
		}
	}

	return (
		<div>
			<button onClick={toggleTheme}></button>
		</div>
	);
}
