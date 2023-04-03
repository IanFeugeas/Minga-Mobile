import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Welcome from "./Welcome";
import LoginForm from "./FormLogIn";

export default function LogIn() {
  return (
    <ScrollView style={styles.view}>
      <Welcome text="Welcome!" />
      <LoginForm/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    gap: 40,
    paddingTop: 180,
    height: 900,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});