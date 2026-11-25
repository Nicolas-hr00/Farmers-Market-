import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function CustomerScreen () {
    return ( 
        <SafeAreaView style={styles.container}>
            <View>
                <Text style= {styles.title}>Customer area</Text>
                <Text>Later customer will be able to use this screen</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    container: 
    {
        flex:1,
        justifyContent: 'center', 
        padding: 24,
    },
    title: 
    { 
        fontSize:28,
        fontWeight: '700',
        marginBottom: 12, 
    }
}) 
