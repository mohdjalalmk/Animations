import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { MotiView } from "moti"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

const placesData = [
  { id: "1", name: "New York" },
  { id: "2", name: "Paris" },
  { id: "3", name: "Tokyo" },
  { id: "4", name: "London" },
  { id: "5", name: "Sydney" },
  { id: "6", name: "San Francisco" },
  { id: "7", name: "Rome" },
  { id: "8", name: "Berlin" },
  { id: "9", name: "Barcelona" },
  { id: "10", name: "Dubai" },
  // Add more places as needed
]

interface Anime1ScreenProps extends AppStackScreenProps<"Anime1"> {}

export const Anime1Screen: FC<Anime1ScreenProps> = observer(function Anime1Screen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const ref = useRef<FlatList>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      animated: true,
      // add definitions of below 
      viewPosition: 0.5,
      viewOffset: 10,
    })
  }, [index])

  const handleForward = () => {
    if (index < placesData.length - 1) {
      setIndex((prev) => prev + 1)
    }
    // Implement logic for moving forward in the list
  }

  const handleBackward = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1)
    }

    // Implement logic for moving backward in the list
  }

  const handleReset = () => {
    // Implement logic for resetting the list
  }

  return (
    <Screen preset="scroll">
      <View style={styles.container}>
        <FlatList
          ref={ref}
          initialScrollIndex={index}
          onScrollToIndexFailed={(info) => {
            const wait = new Promise((resolve) => setTimeout(resolve, 500))
            wait.then(() => {
              ref.current?.scrollToIndex({ index: info.index, animated: true })
            })
          }}
          data={placesData}
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ padding: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ index: findex, item }) => (
            <TouchableOpacity
              onPress={() => {
                setIndex(findex)
              }}
            >
              <MotiView
                animate={{
                  backgroundColor: findex === index ? "#CCCC00" : "#e0e0e0",
                  opacity: findex === index ? 1 : 0.5,
                }}
                transition={{ duration: 500 }}
                style={[styles.item, { backgroundColor: findex === index ? "#CCCC00" : "#e0e0e0" }]}
              >
                <Text>{item.name}</Text>
              </MotiView>
            </TouchableOpacity>
          )}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleBackward}>
            <Text>Backward</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleForward}>
            <Text>Forward</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    margin: 10,
    padding: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
})
