import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";

export default function App() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState(1);

  const [wordCount, setWordCount] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  const handleTextChange = (text: string) => {
    setText(text);

    if (!text.length) {
      setWordCount(0);
      setLineCount(0);
      setSentenceCount(0);
      setCharCount(0);
      return;
    }

    setWordCount(text.trim().split(/\s+/).length);
    setLineCount(text.split("\n").length);
    setSentenceCount(
      text
        .trim()
        .split(/[.?!]/)
        .filter((sentence) => sentence.trim().length > 0).length
    );
    setCharCount(text.length);
  };

  const handleInputBlur = () => {
    Keyboard.dismiss();
  };

  const handleClearText = () => {
    setText("");
    setWordCount(0);
    setLineCount(0);
    setSentenceCount(0);
    setCharCount(0);
  };

  const handleCopyText = () => {
    Clipboard.setString(text);
  };

  const handleLandscapeMode = async () => {
    const mode = await ScreenOrientation.getOrientationAsync();
    if (mode === ScreenOrientation.Orientation.PORTRAIT_UP) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

      setMode(0);
    } else {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
      setMode(1);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleInputBlur}>
      <View
        style={[
          styles.container,
          mode ? {} : { paddingLeft: 50, paddingTop: 40 },
        ]}
      >
        <View style={styles.inputContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCopyText}>
              <MaterialIcons name="content-copy" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleClearText}>
              <MaterialIcons name="clear" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLandscapeMode}>
              <MaterialIcons name="screen-rotation" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.detailContainer}>
            <TextInput
              style={[
                styles.input,
                mode ? {} : { height: mode ? undefined : 150 },
              ]}
              multiline
              onChangeText={handleTextChange}
              value={text}
              placeholder="Enter text here"
            />
            {!mode && (
              <View style={styles.counterContainer}>
                <Text style={styles.counterText}>Word count: {wordCount}</Text>
                <Text style={styles.counterText}>Line count: {lineCount}</Text>
                <Text style={styles.counterText}>
                  Sentence count: {sentenceCount}
                </Text>
                <Text style={styles.counterText}>
                  Character count: {charCount}
                </Text>
              </View>
            )}sh
          </View>
        </View>
        {!!mode && (
          <View style={styles.counterContainer}>
            <Text style={styles.counterText}>Word count: {wordCount}</Text>
            <Text style={styles.counterText}>Line count: {lineCount}</Text>
            <Text style={styles.counterText}>
              Sentence count: {sentenceCount}
            </Text>
            <Text style={styles.counterText}>Character count: {charCount}</Text>
          </View>
        )}
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    // justifyContent: "center",
    paddingLeft: 20,
    paddingTop: 80,
    paddingRight: 20,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    rowGap: 12,
  },
  detailContainer: {
    flexDirection: "row",
    gap: 12,
  },
  input: {
    padding: 10,
    height: 350,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "30%",
    marginLeft: "auto",
  },
  counterContainer: {
    flexDirection: "column",
    width: "100%",
  },
  counterText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
