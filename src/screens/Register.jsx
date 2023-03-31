import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Welcome from "../components/Welcome";
import FormRegister from "../components/FormRegister";

export default function Register({ handleRender }) {
  return (
    <ScrollView style={styles.container}>
      <Welcome text="Welcome!" />
      <FormRegister handleRender={handleRender} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 900,
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 70
  },
});