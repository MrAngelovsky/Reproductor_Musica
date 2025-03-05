import { useState } from "react"
import { StyleSheet, View, FlatList, StatusBar, Image, TouchableOpacity } from "react-native"
import { Text } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"
import { canciones } from "../data/canciones"
import ElementoCancion from "../components/ElementoCancion"

const PlaylistScreen = ({ navigation }) => {
    const [listaDeReproduccion, setListaDeReproduccion] = useState(canciones)
    const [cancionActualId, setCancionActualId] = useState(null)

    const manejarFavorita = (id) => {
        setListaDeReproduccion(
            listaDeReproduccion.map((cancion) => (cancion.id === id ? { ...cancion, favorita: !cancion.favorita } : cancion)),
        )
    }

    const listaConFeaturing = [{ tipo: "featuring" }, ...listaDeReproduccion];

    const reproducirCancion = (cancion) => {
        setCancionActualId(cancion.id)
        navigation.navigate("Reproductor", { cancion, todasLasCanciones: listaDeReproduccion })
    }

    const HeaderComponent = () => (
        <View style={styles.header}>
            <View style={styles.headerBackground}>
                <Image source={{ uri: canciones[0].imagen }} style={styles.headerImage} />
                <View style={styles.headerOverlay} />
            </View>
            <View style={styles.headerContent}>
                <View style={styles.headerTop}>
                    <TouchableOpacity>
                        <Icon name="chevron-back" size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.headerIcons}>
                        <TouchableOpacity>
                            <Icon name="heart-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name="ellipsis-vertical" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.playlistTitle}>WEEKEND PLAYLIST</Text>
                <View style={styles.statsContainer}>
                    <Icon name="heart" size={16} color="#fff" />
                    <Text style={styles.statsText}>25,00000 Likes</Text>
                    <Icon name="time-outline" size={16} color="#fff" style={styles.timeIcon} />
                    <Text style={styles.statsText}>2h 25 mins</Text>
                </View>
            </View>


            <View style={styles.playButtonContainer}>
                <TouchableOpacity style={styles.playButton} onPress={() => reproducirCancion(canciones[0])}>
                    <Icon name="play" size={32} color="#000" />
                </TouchableOpacity>
            </View>


        </View>
    )

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <FlatList
                data={listaConFeaturing}
                keyExtractor={(item, index) => item.tipo === "featuring" ? "featuring" : item.id}
                renderItem={({ item }) => {
                    if (item.tipo === "featuring") {
                        return (
                            <View style={styles.featuringContainer}>
                                <Text style={styles.featuringText}>Featuring</Text>
                            </View>
                        );
                    }

                    return (
                        <ElementoCancion
                            cancion={item}
                            alPresionar={reproducirCancion}
                            alMarcarFavorita={manejarFavorita}
                            reproduciendo={item.id === cancionActualId}
                        />
                    );
                }}
                ListHeaderComponent={HeaderComponent}
                contentContainerStyle={styles.listContent}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    header: {
        height: 500,
        position: "relative",
    },
    headerBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 500,
        backgroundColor: "##ffffff00",
    },
    headerImage: {
        width: "100%",
        height: "100%",
        opacity: 0.5,
    },
    headerOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 255, 0.3)",
    },
    headerContent: {
        padding: 20,
        paddingTop: 40,
    },
    headerTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },

    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    playlistTitle: {
        color: "#fff",
        fontSize: 40,
        fontWeight: "bold",
        marginTop: 180,
    },
    statsContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    statsText: {
        color: "#fff",
        marginLeft: 6,
        fontSize: 14,
    },
    timeIcon: {
        marginLeft: 16,
    },
    playButtonContainer: {
        position: "absolute",
        right: 20,
        bottom: 80,
        zIndex: 10,
    },
    playButton: {
        backgroundColor: "#1DB954",
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: "center",
        alignItems: "center",
    },
    listContent: {
        paddingBottom: 20,
    },
    featuringContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#111",
    },
    featuringText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
})

export default PlaylistScreen

