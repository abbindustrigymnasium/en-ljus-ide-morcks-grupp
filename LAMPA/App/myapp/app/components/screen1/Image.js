import React from 'react';
import { 
	StyleSheet,
	View,
	ImageBackground,
} from 'react-native';


export default class Component1 extends React.Component {


    render() {

        if (!this.props.visible) {
            return false;
        }
        

        return (

            <View 
                style={styles.component}
            >

                <View style={styles.layouts}>

                	<View style={styles.layout1}>

                		<View style={styles.itemcontainer1}>

                			<View style={styles.itemcontainer1Inner}>

                                <ImageBackground 
										source={require('../../img/screen1/standard-light-bulb.png')} 
										style={styles.item1}
									>
										
									</ImageBackground>

                			</View>

                		</View>

                	</View>
                	
                </View>

            </View>
            
        );

    }

}

const styles = StyleSheet.create({
    
	component: {
	    width: '100%',
	    flexDirection: 'row',
	    paddingLeft: 0,
	    paddingRight: 0,
		paddingTop: 0,
		paddingBottom: 0,
		backgroundColor: "#000000",
	},
	
	layouts: {
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	},
	
	layout1: {
	    width: '100%',
	    height: 95,
	},
	
	itemcontainer1: {
	    width: '100%',
	    height: '100%',
	    paddingTop: 0,
	    paddingBottom: 10,
	    paddingLeft: 160,
	    paddingRight: 160,
	},
	
	itemcontainer1Inner: {
	    width: '100%',
	    height: '100%',
	    position: 'relative',
	    alignItems: 'center',
	    justifyContent: 'center',
	},
	
	item1: {
	    width: '100%',
	    height: '100%',
	    overflow: 'hidden',
	},
	
});