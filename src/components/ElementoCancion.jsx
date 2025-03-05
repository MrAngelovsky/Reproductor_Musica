import { StyleSheet, View, TouchableOpacity, Image } from "react-native"
import { Text } from "react-native-elements"
import Icon from "react-native-vector-icons/Ionicons"

const ElementoCancion = ({ cancion, alPresionar, alMarcarFavorita, reproduciendo }) => {
  return (
    <TouchableOpacity style={styles.contenedor} onPress={() => alPresionar(cancion)}>
      <View style={styles.contenedorIzquierdo}>
        <Image source={{ uri: cancion.imagen }} style={styles.imagen} />
        <View style={styles.contenedorTexto}>
          <Text style={[styles.titulo, reproduciendo && styles.reproduciendo]}>{cancion.titulo}</Text>
          <Text style={styles.artista}>{cancion.artista}</Text>
        </View>
      </View>

      <View style={styles.contenedorDerecho}>
        <TouchableOpacity style={styles.botonFavorito} onPress={() => alMarcarFavorita(cancion.id)}>
          <Icon
            name={cancion.favorita ? "heart" : "heart-outline"}
            size={24}
            color={cancion.favorita ? "#1DB954" : "#ffffff"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="ellipsis-vertical" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  contenedorIzquierdo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  imagen: {
    width: 56,
    height: 56,
    borderRadius: 4,
  },
  contenedorTexto: {
    marginLeft: 12,
    flex: 1,
  },
  titulo: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  reproduciendo: {
    color: "#1DB954",
  },
  artista: {
    color: "#9f9f9f",
    fontSize: 14,
  },
  contenedorDerecho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  botonFavorito: {
    padding: 4,
  },
})

export default ElementoCancion

