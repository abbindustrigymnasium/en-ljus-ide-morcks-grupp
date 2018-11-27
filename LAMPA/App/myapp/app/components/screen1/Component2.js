import React from 'react';
import LinearGradient from 'react-native-linear-gradient';


import { 
	StyleSheet,
	View,
	Text,
	Slider,
} from 'react-native';

constructor(props)
{
	super(props);

}

export default class Component2 extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		  value: 50,
		};
	  }
	
	  change(value) {
		this.setState(() => {
		  return {
			value: parseFloat(value),
		  };
		});
	  }
	
	  render() {
		const {value} = this.state;
		return (
		  <View style={styles.container}>
			<Text style={styles.text}>{String(value)}</Text>
			<View> 
			<Slider style={styles.containernew}
			  step={1}
			  maximumValue={100}
			  onValueChange={this.change.bind(this)}
			  value={value}
			/>

			</View>
		  </View>
		);
	  }
	}
	
	const styles = StyleSheet.create({
	  container: {
		padding: 10,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		},
		containernew: {
			padding: 25,
			paddingTop: 5,
			flex: 1,
			height: 25,
			justifyContent: 'center',
			},
	  text: {
		fontSize: 50,
		textAlign: 'center',
	  },
	});