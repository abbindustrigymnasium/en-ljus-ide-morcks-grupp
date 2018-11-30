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


                		<View style={styles.itemcontainer1}>

                			<View style={styles.itemcontainer1Inner}>

                                <ImageBackground 
										source={require('../../img/screen1/img2km3mk3keujor69ntw.png')} 
										style={styles.item1}
									>
										
									</ImageBackground>

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
		paddingTop: 30,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
		backgroundColor: "#000000",
		height: 112,
	},
	
	layouts: {
	    flexDirection: 'row',
	    flexWrap: 'wrap',
	},
	
	
	itemcontainer1: {
	    width: '100%',
		height: '100%',
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
	},
	
});