import { useContext } from 'react';
import ThemeContext, { colors } from '../../design/theme/themeColors';

export default function TestPage() {
	const { themeColor, setThemeColor } = useContext(ThemeContext);

	function toggleTheme() {
		console.log('toggle');
		themeColor === colors.dark ? setThemeColor(colors.light) : setThemeColor(colors.dark);
		console.log(themeColor === colors.dark);
	}

	return (
		<div>
			<button onClick={toggleTheme}></button>
		</div>
	);
}
