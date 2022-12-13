import { TouchableOpacity, StyleSheet, Text, View, SafeAreaView, TextInput, Image } from 'react-native';
import { useState } from 'react';
import { primaryButtonStyles } from '../styles/primaryButton';





export default function SignUpScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {

    }

    return (
        <SafeAreaView style={styles.container}>
            {/* <Image  source={require('')} style={styles.image}/> */}

            <Text style={styles.title}>Welcome to Kruppa</Text>

            <View style={styles.inputContainer}>
                <TextInput placeholder="your username" onChangeText={(value) => setUsername(value)} value={username} style={styles.input} />
                <TextInput placeholder="your email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input} />
                <TextInput placeholder="your password" onChangeText={(value) => setPassword(value)} value={password} style={styles.input} />
                <TouchableOpacity style={primaryButtonStyles.button} activeOpacity={0.8}>
                    <Text style={primaryButtonStyles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        /*   alignItems: 'center',
          justifyContent: 'center', */
        backgroundColor: '#374146',
    },

    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },

    image: {


    },

    title: {
        alignSelf: 'center',
        marginTop: '50%',
        fontSize: 30,
        fontWeight: "bold",
    },

    input: {


    }
})