import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Image, Platform, Pressable, TextInput, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { EnginnersDataType } from "../context/globalContext";

interface EngineerFormType {
  engineerData?: EnginnersDataType;
  submitEngineerChanges?: (name: string, avatar: string, id: number) => void;
  submitButtonTitle?: string;
}

function EngineerForm({
  engineerData,
  submitEngineerChanges,
  submitButtonTitle,
}: EngineerFormType) {
  const [engineerName, setEngineerName] = useState("");

  const [engineerAvatar, setEngineerAvatar] = useState("");

  const [engineerId, setEngineerId] = useState<number>(1);

  useEffect(() => {
    if (engineerData) {
      setEngineerName(engineerData?.name);
      setEngineerAvatar(engineerData?.avatar);
      setEngineerId(engineerData?.id);
    }
  }, [engineerData]);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const changeAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setEngineerAvatar(result.uri);
    }
  };

  const onSubmit = () => {
    if (submitEngineerChanges)
      submitEngineerChanges(engineerName, engineerAvatar, engineerId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.engineerItemContainer}>
        <View style={styles.sectionContainer}>
          <Text style={{ marginBottom: 10 }}>Engineer Avatar</Text>

          {engineerAvatar ? (
            <View style={styles.avatarContainer}>
              <Pressable style={styles.editAvatar} onPress={changeAvatar}>
                <AntDesign name="edit" color={"black"} size={20} />
              </Pressable>

              <Image
                source={{
                  uri: engineerAvatar,
                }}
                style={styles.avatar}
              />
            </View>
          ) : (
            <Pressable onPress={changeAvatar} style={styles.addNewEngineer}>
              <AntDesign name="plus" color={"black"} size={80} />
            </Pressable>
          )}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ marginBottom: 10 }}>Engineer Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEngineerName}
            value={engineerName}
          />
        </View>

        {submitButtonTitle && (
          <Pressable style={styles.submitButton} onPress={onSubmit}>
            <Text style={{ color: "black" }}>{submitButtonTitle}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  engineerItemContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  sectionContainer: { marginBottom: 20 },
  submitButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(229, 229, 229,1)",
    borderRadius: 5,
    marginTop: 10,
  },
  avatarContainer: { height: 80, width: 80 },
  avatar: { width: 80, height: 80, borderRadius: 5 },
  editAvatar: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: "rgba(229, 229, 229,0.4)",
    padding: 1,
    borderRadius: 5,
  },
  addNewEngineer: {
    backgroundColor: "rgba(229, 229, 229,0.4)",
    height: 80,
    width: 80,
    borderRadius: 5,
  },
});

export default EngineerForm;
