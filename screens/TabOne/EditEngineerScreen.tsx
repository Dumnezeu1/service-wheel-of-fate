import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Pressable, TextInput, View } from "react-native";
import { StyleSheet, Text } from "react-native";
import { useEngineersContext } from "../../context/engineersContext";

interface EditEngineerScreenProps {
  route: {
    params: {
      engineerId: string;
      engineerName: string;
      engineerAvatar: string;
    };
  };
}

function EditEngineerScreen({ route }: EditEngineerScreenProps) {
  const { engineerAvatar, engineerId, engineerName } = route.params;

  const navigation = useNavigation();

  const [name, setName] = useState("");

  const [avatar, setAvatar] = useState("");

  const [engineersData, setEngineersData] = useEngineersContext();

  useEffect(() => {
    setName(engineerName);
    setAvatar(engineerAvatar);
  }, [engineerName]);

  const submitEngineerChanges = () => {
    const newItemObject = {
      id: engineerId,
      avatar,
      name,
    };
    const listWithItemEdited = engineersData.engineersDataCx.map((item) => {
      if (item.id === engineerId) {
        return newItemObject;
      }
      return item;
    });

    setEngineersData((prev) => {
      return {
        ...prev,
        engineersDataCx: listWithItemEdited,
      };
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.engineerItemContainer}>
        <View style={styles.sectionContainer}>
          <Text style={{ marginBottom: 10 }}>Engineer Avatar</Text>

          {avatar ? (
            <Image
              source={{
                uri: avatar,
              }}
              style={styles.avatar}
            />
          ) : null}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={{ marginBottom: 10 }}>Engineer Name</Text>
          <TextInput style={styles.input} onChangeText={setName} value={name} />
        </View>

        <Pressable style={styles.submitButton} onPress={submitEngineerChanges}>
          <Text style={{ color: "black" }}>Change details</Text>
        </Pressable>
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
  avatar: { width: 80, height: 80 },
});

export default EditEngineerScreen;
