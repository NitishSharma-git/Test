import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ name, description, category, url }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.category}>Category: {category}</Text>
      <Text style={styles.url}>URL: {url}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 2,
    borderColor:'#F44336',
    borderWidth:2,
    marginLeft:5
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8, 
    color:'black'
  },
  description:{
    color:"#6495ed"
  },
  category:{
    color:'hotpink' 
  },
  url:{
    color:'grey'
  }
});

export default Card;
