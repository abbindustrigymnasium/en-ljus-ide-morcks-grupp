import React from 'react';


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
			lampname: 404,
		};
		}
		
		ComponentDidMount(){
			let self = this;
			fetch("http://iot.abbindustrigymnasium.se/api/routes/Light7/" + this.state.lampname,{
				
			method: "GET"
			
		}).then((response) => response.json()).then((responseJSON) =>
		{
			console.log(responseJSON);

			var resultat = responseJSON.result;
			console.log(resultat);
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
	  change(Ljus) {
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