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
			Temp: 50
		}
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
			const {Ljus} = this.state;
			const {Temp} = this.state;

				fetch("http://iot.abbindustrigymnasium.se:3001/grupp7/404",{
					method: "PATCH",
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
					},
					body:JSON.stringify({
						ljus: Ljus,
						temp: Temp
					})
				}).then((response) => response.json()).then(responseJSON2 => {
					console.log(responseJSON2);
					alert(response.message+ " "+ Ljus);
				}).catch((error) => {
					console.log(error);
				});

		}

	  change(Ljus) {
		this.setState(() => {
		  return {
			Ljus: parseFloat(Ljus),
		  };
		});
	  }
	
	  change2(Temp) {
			this.setState(() => {
				return {
				Temp: parseFloat(Temp),
				};
			});
			}
		

	  render() {
		const {Ljus} = this.state;
		const {Temp} = this.state;
		return (
		  <View style={styles.container}>
			<Text style={styles.text}>{this.state.Ljus}</Text>
			<View> 
			<Slider style={styles.containernew}
			  step={1}
			  maximumValue={100}
				onValueChange={this.change.bind(this)}
				onSlidingComplete={ this.insertToServer}
			  value={Ljus}
			/>
			<Text style={styles.text2}>{this.state.Temp}</Text>
			<View> 
			<Slider style={styles.containernew2}
			  step={1}
			  maximumValue={100}
				onValueChange={this.change2.bind(this)}
				onSlidingComplete={ this.insertToServer}
			  value={Temp}
			/>
			</View>
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
			paddingRight: 25,
			paddingLeft: 25,
			paddingTop: 5,
			paddingBottom: 10,
			flex: 1,
			height: 20,
			justifyContent: 'center',
			},
	  text: {
		fontSize: 50,
		textAlign: 'center',
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