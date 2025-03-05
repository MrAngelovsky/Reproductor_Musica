import { useState } from "react"
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from "react-native"
import { Text } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"

const { width } = Dimensions.get("window")

const PlayerScreen = ({ route, navigation }) => {
    const { cancion: cancionInicial, todasLasCanciones } = route.params
    const [cancion, setCancion] = useState(cancionInicial)
    const [reproduciendo, setReproduciendo] = useState(true)
    const [progreso, setProgreso] = useState(0.2)
    const [tiempoActual, setTiempoActual] = useState("0:52")

    const manejarReproducirPausar = () => {
        setReproduciendo(!reproduciendo)
    }

    const manejarSiguiente = () => {
        const indiceActual = todasLasCanciones.findIndex((c) => c.id === cancion.id)
        const indiceSiguiente = (indiceActual + 1) % todasLasCanciones.length
        setCancion(todasLasCanciones[indiceSiguiente])
    }

    const manejarAnterior = () => {
        const indiceActual = todasLasCanciones.findIndex((c) => c.id === cancion.id)
        const indiceAnterior = indiceActual === 0 ? todasLasCanciones.length - 1 : indiceActual - 1
        setCancion(todasLasCanciones[indiceAnterior])
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-down" color="#ccc" size={28} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>WEEKEND PLAYLIST</Text>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Icon name="heart-outline" color="#ccc" size={22} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 15 }}>
                        <Icon name="ellipsis-vertical" color="#ccc" size={22} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.albumContainer}>
                <Image source={{ uri: cancion.imagen }} style={styles.albumCover} />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.songTitle}>{cancion.titulo}</Text>
                <Text style={styles.artistName}>{cancion.artista}</Text>
            </View>

            <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progreso * 100}%` }]} />
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{tiempoActual}</Text>
                    <Text style={styles.timeText}>{cancion.duracion}</Text>
                </View>
            </View>

            <View style={styles.controlsContainer}>
                <TouchableOpacity>
                    <Icon name="shuffle" color="#ccc" size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={manejarAnterior}>
                    <Icon name="play-skip-back" color="#fff" size={35} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.playButton} onPress={manejarReproducirPausar}>
                    <Icon name={reproduciendo ? "pause" : "play"} color="#000" size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={manejarSiguiente}>
                    <Icon name="play-skip-forward" color="#fff" size={35} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="repeat" color="#ccc" size={20} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.lyricsButton}>
                <Text style={styles.lyricsText}>Lyrics</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        padding: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
    },
    albumContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    albumCover: {
        width: width - 60,
        height: width - 60,
        borderRadius: 10,
    },
    infoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },
    songTitle: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
    },
    artistName: {
        color: "#aaa",
        fontSize: 18,
    },
    progressContainer: {
        marginBottom: 20,
    },
    progressBar: {
        height: 4,
        backgroundColor: "rgba(255,255,255,0.3)",
        borderRadius: 2,
    },
    progressFill: {
        height: 4,
        backgroundColor: "#1DB954",
        borderRadius: 2,
    },
    timeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    timeText: {
        color: "#aaa",
        fontSize: 14,
    },
    controlsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    playButton: {
        backgroundColor: "#1DB954",
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    lyricsButton: {
        backgroundColor: "#1DB954",
        padding: 15,
        borderRadius: 50,
        alignItems: "center",
    },
    lyricsText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
})

export default PlayerScreen;