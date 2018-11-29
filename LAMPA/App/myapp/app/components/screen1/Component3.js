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
			Ljus: 50
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
						Ljus: resultat.ljus,
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

		insertToServer =() =>{
			const {Temp} = this.state;
			const {Ljus} = this.state;

				fetch("http://iot.abbindustrigymnasium.se:3001/grupp7/404",{
					method: "PATCH",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
					},
					body:JSON.stringify({
						temp: Temp,
						ljus: Ljus
					})
				}).then((response) => response.json()).then(responseJSON2 => {
					console.log(responseJSON2);
					alert(response.message+ " "+ Temp);
				}).catch((error) => {
					console.log(error);
				});

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
			<Text style={styles.text2}>{this.state.Temp}</Text>
			<View> 
			<Slider style={styles.containernew2}
			  step={1}
			  maximumValue={100}
				onValueChange={this.change.bind(this)}
				onSlidingComplete={ this.insertToServer}
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
		containernew2: {
			paddingRight: 25,
			paddingLeft: 25,
			paddingTop: 5,
			paddingBottom: 10,
			flex: 1,
			height: 20,
			justifyContent: 'center',
			},
	  text2: {
		fontSize: 50,
		textAlign: 'center',
	  },
	});