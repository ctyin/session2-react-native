import React, { useState } from "react";
import { Text, StyleSheet, Button, TouchableHighlight } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StringLiteral } from "@babel/types";

type PersonType = {
  name: string;
  phone: string;
  address: string;
};

type RootStackParamList = {
  Home: undefined;
  Person: PersonType;
  Add: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Person">;

let person_arr: PersonType[] = [
  {
    name: "Roger",
    phone: "1234",
    address: "123 Sesame Street",
  },
  {
    name: "Chris",
    phone: "5678",
    address: "999 Oak Drive",
  },
  {
    name: "John",
    phone: "1111",
    address: "234 Birch Lane",
  },
];

const PersonButton = ({ navigation }: Props) => {
  return (
    <>
      <TouchableHighlight
        onPress={() => {
          navigation.push("Add");
        }}
      >
        <Text style={styles.add_button}>+</Text>
      </TouchableHighlight>

      {person_arr.map((person) => (
        <TouchableHighlight
          style={styles.row_button}
          underlayColor="green"
          onPress={() => {
            navigation.push("Person", {
              name: person.name,
              phone: person.phone,
              address: person.address,
            });
          }}
        >
          <Text>{person.name}</Text>
        </TouchableHighlight>
      ))}
    </>
  );
};

const PersonView = ({ navigation, route }: Props) => {
  return (
    <>
      <Text>Name: {route.params.name}</Text>
      <Text>Phone: {route.params.phone}</Text>
      <Text>Address: {route.params.address}</Text>
    </>
  );
};

const AddView = ({ navigation }: Props) => {
  return (
    <>
      <Text>Add A Contact</Text>
    </>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={PersonButton}
          options={{ title: "Home page" }}
        />
        <Stack.Screen name="Person" component={PersonView} />
        <Stack.Screen name="Add" component={AddView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  row_button: {
    backgroundColor: "#bbbdbb",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
  add_button: {
    fontSize: 20,
  },
});
