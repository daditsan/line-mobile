import { View, StyleSheet, Text } from 'react-native'

export function ProfilePictureS({ item }) {
    let initial = []

    if (item?.user?.name) {
        let convertName = item.user.name.split(" ");
        initial.push(convertName[0][0].toUpperCase())
    } else if (item?.user?.username) {
        let convertUsername = item.user.username.split(" ");
        initial.push(convertUsername[0][0].toUpperCase())
    } else if (item?.name) {
        let convertName = item.name.split(" ")
        initial.push(convertName[0][0].toUpperCase())
    } else if (item?.username) {
        let convertUsername = item.username.split(" ")
        initial.push(convertUsername[0][0].toUpperCase())
    }

    return (
        <View>
            <Text style={styles.profilePictureS}>{initial}</Text>
        </View>
    )
}

export function ProfilePictureM({ item }) {
    let initial = []

    if (item?.user?.name) {
        let convertName = item.user.name.split(" ");
        initial.push(convertName[0][0].toUpperCase())
    } else if (item?.user?.username) {
        let convertUsername = item.user.username.split(" ");
        initial.push(convertUsername[0][0].toUpperCase())
    } else if (item?.name) {
        let convertName = item.name.split(" ")
        initial.push(convertName[0][0].toUpperCase())
    } else if (item?.username) {
        let convertUsername = item.username.split(" ")
        initial.push(convertUsername[0][0].toUpperCase())
    }

    return (
        <View>
            <Text style={styles.profilePictureM}>{initial}</Text>
        </View>
    )
}

export function ProfilePictureL({ item }) {
    let initial = []

    if (item?.user?.name) {
        let convertName = item.user.name.split(" ");
        initial.push(convertName[0][0].toUpperCase())
    } else if (item?.user?.username) {
        let convertUsername = item.user.username.split(" ");
        initial.push(convertUsername[0][0].toUpperCase())
    } else if (item?.name) {
        let convertName = item.name.split(" ")
        initial.push(convertName[0][0].toUpperCase())
    } else if (item?.username) {
        let convertUsername = item.username.split(" ")
        initial.push(convertUsername[0][0].toUpperCase())
    }

    return (
        <View>
            <Text style={styles.profilePictureL}>{initial}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    profilePictureL: {
        paddingVertical: 35,
        paddingHorizontal: 48,
        fontSize: 32,
        backgroundColor: "#dbe9ff", 
        color: "#458dff",
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: 60,
        marginBottom: 16,
    },
    profilePictureS: {
        lineHeight: 40,
        height: 40,
        width: 40,
        fontSize: 18,
        backgroundColor: "#dbe9ff", 
        color: "#458dff",
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: 25,
    },
    profilePictureM: {
        lineHeight: 50,
        height: 50,
        width: 50,
        fontSize: 18,
        backgroundColor: "#dbe9ff", 
        color: "#458dff",
        fontWeight: "bold",
        textAlign: "center",
        borderRadius: 25,
        marginRight: 8,
    }
})