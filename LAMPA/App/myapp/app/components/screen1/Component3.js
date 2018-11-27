import React from 'react';


import { 
	StyleSheet,
	View,
	Text,
	Slider,
} from 'react-native';

export default class Component3 extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			Temp: 50,
		};
		}
		
		componentDidMount(){
			let self = this;
			fetch("http://iot.abbindustrigymnasium.se:3001/grupp7/404",{
				
			method: "GET"
			
		}).then((response) => response.json()).then((responseJSON) =>
		{
			console.log(responseJSON);

			var resultat = responseJSON;
			console.log(resultat);
			if (message = "Light7"){
				if(responseJSON.length != 0 ){
					self.setState({
						Temp: resultat.temp
					})
				}
				else
				alert("Not found")
				console.log(this.state)
			}
		}
	)

		}
	  change(Temp) {
		this.setState(() => {
		  return {
			Temp: parseFloat(Temp),
		  };
		});
	  }
	
	  render() {
		const {Temp} = this.state;
		return (
		  <View style={styles.container}>
			<Text style={styles.text}>{this.state.Temp}</Text>
			<View> 
			<Slider style={styles.containernew}
			  step={1}
			  maximumValue={100}
			  onValueChange={this.change.bind(this)}
			  value={Temp}
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