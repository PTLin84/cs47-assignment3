import { View, Text, Image, StyleSheet } from "react-native";
import Colors from "../Themes/colors";

function OneLine({ text, style }) {
  return (
    <Text style={style} numberOfLines={1} ellipsizeMode={"tail"}>
      {text}
    </Text>
  );
}

export default function Song({
  image,
  title,
  artist,
  album,
  duration,
  id,
  index,
}) {
  return (
    <View style={styles.items}>
      <OneLine text={index + 1} style={styles.index} />
      <View style={styles.imageBlock}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.titleBlock}>
        <OneLine text={title} style={styles.text} />
        <OneLine text={artist} style={styles.text} />
      </View>
      <View style={styles.albumBlock}>
        <OneLine text={album} style={styles.text} />
      </View>
      <View style={styles.durationBlock}>
        <OneLine text={duration} style={styles.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  items: {
    marginBottom: 5,
    marginTop: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageBlock: {
    justifyContent: "center",
    justifyContent: "center",
    width: "20%",
  },
  titleBlock: {
    justifyContent: "center",
    justifyContent: "center",
    width: "27.5%",
  },
  albumBlock: {
    justifyContent: "center",
    justifyContent: "center",
    width: "27.5%",
  },
  durationBlock: {
    justifyContent: "center",
    justifyContent: "center",
    width: "15%",
    marginRight: 5,
  },
  index: {
    fontSize: 10,
    color: Colors.gray,
    marginRight: 5,
    fontWeight: "bold",
  },
  title_artist: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text: {
    color: Colors.gray,
    fontSize: 14,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
});
