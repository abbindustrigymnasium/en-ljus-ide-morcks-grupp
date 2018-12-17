import React from 'react';


import { 
	StyleSheet,
	View,
	Text,
  Slider,
  Image
} from 'react-native';

export default class Component2 extends React.Component {

	constructor(props) {
		super(props);
		this.state = { //skapar de lokala variablerna för ljusstyrka och färgtemp och ger dem värdet 50
			Ljus: 50,
			Temp: 50
		}
		}
		
		componentDidMount(){
			let self = this;
			fetch("http://iot.abbindustrigymnasium.se:3000/grupp7/404",{ //ansluter till backenden
				
			method: "GET" //säger att metoden vi ska använda till databasen är GET
			
		}).then((response) => response.json()).then((responseJSON) =>
		{
			console.log(responseJSON);

			var resultat = responseJSON;
			console.log(resultat);
			if (message = "Light7"){ //om backenden skickar meddelandet "Light7" så ska följande kod
				if(responseJSON.length != 0 ){ //om svaret inte är tomt så ska följande kod köras
					self.setState({
						Ljus: resultat.ljus, //säger att variabeln Ljus ska bli resultet av variabeln ljus från databasen
						Temp: resultat.temp //säger att variabeln Temp ska bli resultet av variabeln temp från databasen
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

				fetch("http://iot.abbindustrigymnasium.se:3000/grupp7/404",{ //ansluter till backenden
					method: "PATCH", //säger att metoden vi ska använda är PACTH
					headers: {
						"Accept": "application/json",
						"Content-Type": "application/json",
					},
					body:JSON.stringify({
						ljus: Ljus, // gör variablerna Ljus och Temp till ett JSON-objekt
						temp: Temp
					})
				}).then((response) => response.json()).then(responseJSON2 => {
					console.log(responseJSON2);
				}).catch((error) => {
					console.log(error);
				});

		}

	  change(Ljus) { //funktionen som ändrar värdet som tas från ljus-sliden till variabeln Ljus 
		this.setState(() => {
		  return {
			Ljus: parseFloat(Ljus),
		  };
		});
	  }
	
	  change2(Temp) { //funktionen som ändrar värdet som tas från temp-sliden till variabeln Temp 
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
      <View style={styles.images}>
      <Image 
      	source={require('../ABB_Industrigymnasium.png')} //Abb-logotypen
      	style={styles.item1}
      >

      </Image>
      <Image 
				source={require('../light-bulb.png')} //En bild på en glödlampa
				style={styles.item2}
			>
				
			</Image>
      </View>
			<Text 
			style={styles.item2Text}
			>
			Ljusstyrka
			</Text>
			<Text style={styles.text}>{this.state.Ljus}%</Text>
			<View> 
			<Slider style={styles.containernew} //slidern för ljusstyrka
			  step={1}
			  maximumValue={100}
				onValueChange={this.change.bind(this)}
				onSlidingComplete={ this.insertToServer} //när slidern släpps så körs funktionen som skickar det nya värdet till databasen
			  value={Ljus}
			/>
			<View style={styles.item6Text}>
			<Text style={styles.item5Text} >Min </Text><Text style={styles.item4Text}> Max </Text>
			</View>
			<Text 
			style={styles.item3Text}
			>
			Färgtemperatur
			</Text>
			<Text style={styles.text2}>{this.state.Temp}%</Text>
			<View> 
			<Slider style={styles.containernew2} //slidern för Färgtemperatur
			  step={1}
			  maximumValue={100}
				onValueChange={this.change2.bind(this)}
				onSlidingComplete={ this.insertToServer} //när slidern släpps så körs funktionen som skickar det nya värdet till databasen
			  value={Temp}
			/>

			<View style={styles.item6Text}>
			<Text style={styles.item5Text} >Kallt </Text><Text style={styles.item4Text}> Varmt </Text>
			</View>
			</View>
			</View>
		  </View>
		);
	  }
	}
	
	const styles = StyleSheet.create({
	  container: {
		padding: 0,
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
    marginTop: 0,
    },
    images: {
      padding: 20,
      backgroundColor: "#000000",
      },
		containernew: {
			paddingRight: 30,
			paddingLeft: 30,
			paddingTop: 15,
			paddingBottom: 15,
			flex: 1,
			height: 25,
			justifyContent: 'center',
			},
	  text: {
		fontSize: 45,
		textAlign: 'center',
		},
		containernew2: {
			paddingRight: 30,
			paddingLeft: 30,
			paddingTop: 15,
			paddingBottom: 15,
			flex: 1,
			height: 25,
			justifyContent: 'center',
			},
	  text2: {
		fontSize: 45,
		textAlign: 'center',
		},
		item2Text: {
	    color: '#181818',
	    fontSize: 16,
      textAlign: 'center',
      paddingTop: 20,
	    width: '100%',
	},
	item3Text: {
		color: '#181818',
		fontSize: 16,
		textAlign: 'center',
		width: '100%',
		paddingTop: 75,
},
item4Text: {
	color: '#181818',
	fontSize: 13 ,
	textAlign: 'right',
	width: '100%',
	flex: 1,
},
item5Text: {
	color: '#181818',
	fontSize: 13,
	textAlign: 'left',
	width: '100%',
	flex: 1,
},
item6Text: {
	flexDirection: 'row',
	paddingRight: 5,
	paddingLeft: 5,
},
item1: {
  width: "100%",
    flexDirection: 'row',
    resizeMode: "contain",
		paddingLeft: 10,
		paddingRight:10,
		backgroundColor: "#000000",
    height: 110,
},
item2: {
  width: '100%',
    flexDirection: 'row',
    resizeMode: "contain",
		paddingTop: 30,
		paddingBottom: 0,
		paddingLeft: 0,
		paddingRight: 0,
		backgroundColor: "#000000",
    height: 110,
}
	});