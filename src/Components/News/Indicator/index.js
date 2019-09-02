import React from 'react';
import { View, Animated, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

class Indicator extends React.Component {
	render() {
		let { items, scrollX } = this.props;
		let position = Animated.divide(scrollX, width);
		let total = [];

		for (var i = 0; i < items.length / 2; i++) {
			total.push({})
		}

		return (
			<View style={{ flexDirection: 'row' }}>
				{total.map((_, i) => {
					let opacity = position.interpolate({
						inputRange: [i - 1, i, i + 1],
						outputRange: [0.3, 1, 0.3],
						extrapolate: 'clamp'
					});

					return (
						<Animated.View
							key={i}
							style={{ opacity, height: 6, width: 6, backgroundColor: '#595959', margin: 5, borderRadius: 3 }}
						/>
					);
				})}
			</View>
		);
	}
}

export default Indicator;