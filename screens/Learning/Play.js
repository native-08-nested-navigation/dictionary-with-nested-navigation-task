import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { COLORS } from "../../constants";

export default function Play({ words, route }) {
  // Ініціалізуємо список слів з урахуванням кількості правильних відповідей (knewCount)
  const [wordsList, setWordsList] = useState(() => {
    const rawWords = words || route?.params?.words || [];
    return rawWords.map((item) => ({ ...item, knewCount: 0 }));
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!wordsList || wordsList.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.congratsTitle}>Congrats!</Text>
        <Text style={styles.congratsSub}>
          For now you have learned all the words
        </Text>
      </View>
    );
  }

  const activeIndex = currentIndex >= wordsList.length ? 0 : currentIndex;
  const currentWord = wordsList[activeIndex];

  const handleKnewIt = () => {
    setIsFlipped(false);

    setWordsList((prevList) => {
      const updatedItem = {
        ...prevList[activeIndex],
        knewCount: (prevList[activeIndex].knewCount || 0) + 1,
      };

      // Видаляємо слово зі списку ТІЛЬКИ якщо його знали 2 рази
      if (updatedItem.knewCount >= 2) {
        const newList = prevList.filter((_, index) => index !== activeIndex);
        
        setCurrentIndex((prevIndex) => {
          if (newList.length === 0) return 0;
          return prevIndex >= newList.length ? 0 : prevIndex;
        });

        return newList;
      }

      // Якщо натиснули 1-й раз — оновлюємо лічильник для слова та переходимо далі
      const newList = [...prevList];
      newList[activeIndex] = updatedItem;

      if (newList.length > 1) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newList.length);
      }

      return newList;
    });
  };

  const handleDidntKnowIt = () => {
    setIsFlipped(false);
    if (wordsList.length > 1) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % wordsList.length);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.card}
        onPress={() => setIsFlipped((prev) => !prev)}
      >
        <Text style={styles.wordText}>{currentWord.word}</Text>
        {isFlipped && (
          <View style={styles.detailsContainer}>
            <Text style={styles.phoneticsText}>{currentWord.phonetics}</Text>
            <Text style={styles.meaningText}>{currentWord.meaning}</Text>
            <Pressable style={styles.soundButton}>
              <Text style={styles.soundText}>🔊 Play Sound</Text>
            </Pressable>
          </View>
        )}
      </Pressable>

      <View style={styles.buttonsRow}>
        <Button
          title="Didn't know it"
          onPress={handleDidntKnowIt}
          color={COLORS.primary900}
        />
        <Button
          title="Knew it"
          onPress={handleKnewIt}
          color={COLORS.primary900}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.appBackground,
  },
  card: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: COLORS.cardBg || "#333",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  wordText: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.fontMain,
  },
  detailsContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  phoneticsText: {
    fontSize: 18,
    color: COLORS.fontMain,
    marginBottom: 10,
  },
  meaningText: {
    fontSize: 16,
    color: COLORS.fontMain,
    textAlign: "center",
    marginBottom: 15,
  },
  soundButton: {
    padding: 8,
  },
  soundText: {
    color: COLORS.primary900,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  congratsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.fontMain,
    marginBottom: 10,
  },
  congratsSub: {
    fontSize: 16,
    color: COLORS.fontMain,
  },
});