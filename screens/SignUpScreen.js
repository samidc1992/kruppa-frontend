import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';



export default function SignUpScreen({ navigation }) {

    const submitAccount = () => {
        const newUser = { username: 'username1', email: 'test@mail.fr', password: '123456' }
        fetch(`http://192.168.10.176:3000/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            });
    }

    const submitProfile = () => {
        const newProfile = {
            gender: 'female',
            photo: '.jpeg',
            birthDate: new Date(),
            description: 'hello',
            favoriteSports: [{ sport: 'football', level: 'beginner' }],
            token: 'axJMtPpr3R7XzjpK87rC6hZpp-qNIhLK'
        }
        fetch(`http://192.168.10.176:3000/users/signup`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProfile),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            });
    }


    return (
        <View style={styles.container}>
            <Text>Sign Up Page</Text>
            <TouchableOpacity
                onPress={() => submitAccount()}
            >
                <Text>Sign Up Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => submitProfile()}
            >
                <Text>Sign Up Profile</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
    }
})