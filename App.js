import {
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  View,
  Image,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";
import { ResponseType, useAuthRequest } from "expo-auth-session";
import { myTopTracks, albumTracks } from "./utils/apiOptions";
import { REDIRECT_URI, SCOPES, CLIENT_ID, ALBUM_ID } from "./utils/constants";
import Colors from "./Themes/colors";
// import { FlatList } from "react-native-web";
import Song from "./components/Song.js";
import millisToMinutesAndSeconds from "./utils/millisToMinuteSeconds";

// Endpoints for authorizing with Spotify
const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export default function App() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: CLIENT_ID,
      scopes: SCOPES,
      // In order to follow the "Authorization Code Flow" to fetch token after authorizationEndpoint
      // this must be set to false
      usePKCE: false,
      redirectUri: REDIRECT_URI,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response]);

  useEffect(() => {
    const fetchTracks = async () => {
      const res = await myTopTracks(token);
      // const res = await albumTracks(ALBUM_ID, token);
      setTracks(res);
    };

    if (token) {
      // Authenticated, make API request
      fetchTracks();
    }
  }, [token]);

  function SpotifyBtn() {
    return (
      <Pressable onPress={promptAsync}>
        <View style={styles.btn}>
          <Image
            source={require("./assets/spotify-logo.png")}
            style={{ width: 25, height: 25 }}
          />
          <Text style={styles.btnText}>Connect with Spotify</Text>
        </View>
      </Pressable>
    );
  }

  const renderSong = (item, index) => (
    <Song
      image={item.album.images[1].url}
      title={item.name}
      artist={item.artists[0].name}
      album={item.album.name}
      id={item.id}
      duration={millisToMinutesAndSeconds(item.duration_ms)}
      index={index}
    />
  );
  let contentDisplayed = null;

  if (token) {
    contentDisplayed = (
      <View>
        <View style={styles.headerContainer}>
          <Image
            source={require("./assets/spotify-logo.png")}
            style={{ width: 35, height: 35 }}
          />
          <Text style={styles.headerText}>My Top Tracks</Text>
        </View>
        <FlatList
          style={styles.flatList}
          data={tracks}
          renderItem={({ item, index }) => renderSong(item, index)}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  } else {
    contentDisplayed = <SpotifyBtn />;
  }

  return (
    <SafeAreaView style={styles.container}>{contentDisplayed}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    justifyContent: "center",
    // alignItems: "center",
    flex: 1,
  },
  flatList: {
    width: "100%",
    margin: 15,
  },
  btn: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    alignItems: "center",
    width: 230,
    height: 40,
    borderRadius: 99999,
  },
  btnText: {
    color: Colors.background,
    fontSize: 16,
  },
  headerContainer: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    marginLeft: 20,
    fontSize: 18,
  },
});
