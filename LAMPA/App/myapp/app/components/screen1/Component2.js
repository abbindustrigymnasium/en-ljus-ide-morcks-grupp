import React from 'react';
import LinearGradient from 'react-native-linear-gradient';


import { 
	StyleSheet,
	View,
	Text,
	Slider,
} from 'react-native';

export default class Component2 extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			Ljus: 50,
			
		};
		}
		
		componentDidMount(){
			let self = this;
			fetch("http://iot.abbindustrigymnasium.se/api/routes/grupp7",{
				
			method: "GET"
			
		}).then((response) => response.json()).then((responseJSON) =>
		{
			console.log(responseJSON);

			var resultat = responseJSON.result
			if (message = "Light7"){
				if(response.lenght != 0 ){
					self.setState({
						Ljus: resultat
					})
				}
				else
				alert("Not found")
				console.log(this.state)
			}
		}
	)
			

		}

	/*	getFromBack() {
			return this.state.Ljus.map(Ljus) => {
				return (
					<
				)
			}
		}
*/
	  change(value) {
		this.setState(() => {
		  return {
			Ljus: parseFloat(Ljus),
		  };
		});
	  }
	
	  render() {
		const {Ljus} = this.state;
		return (
		  <View style={styles.container}>
			<Text style={styles.text}>{this.state.Ljus}</Text>
			<View> 
			<Slider style={styles.containernew}
			  step={1}
			  maximumValue={100}
			  onValueChange={this.change.bind(this)}
			  value={Ljus}
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