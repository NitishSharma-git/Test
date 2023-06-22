import React, { Component } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Card from './Card';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apis: [],
      filteredApis: [],
      searchText: '',
      sortOrder: 'asc',
    };
  }

  componentDidMount() {
    this.fetchApis();
  }

  fetchApis = async () => {
    try {
      const response = await fetch('https://api.publicapis.org/entries');
      const json = await response.json();
      const apiData = json.entries;
      this.setState({ apis: apiData, filteredApis: apiData });
    } catch (error) {
      console.error(error);
    }
  };

  handleSearch = (text) => {
    this.setState({ searchText: text });
    const { apis } = this.state;
    const filteredData = apis.filter((api) =>
      api.API.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({ filteredApis: filteredData });
  };

  handleSortOrder = () => {
    const { filteredApis, sortOrder } = this.state;
    const sortedData = [...filteredApis].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.API.localeCompare(b.API);
      } else {
        return b.API.localeCompare(a.API);
      }
    });
    this.setState({
      filteredApis: sortedData,
      sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  renderCard = ({ item }) => (
    <Card
      name={item.API}
      description={item.Description}
      category={item.Category}
      url={item.Link}
    />
  );

  render() {
    const { filteredApis, searchText, sortOrder } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by API name"
            value={searchText}
            onChangeText={this.handleSearch}
          />
          <View style={styles.sortContainer}>
            <Text>Sort by API name:</Text>
            <Picker
              style={styles.picker}
              selectedValue={sortOrder}
              onValueChange={this.handleSortOrder}
            >
              <Picker.Item label="Ascending" value="asc" />
              <Picker.Item label="Descending" value="desc" />
            </Picker>
          </View>
        </View>
        <FlatList
          data={filteredApis}
          keyExtractor={(item) => item.API}
          renderItem={this.renderCard}
          numColumns={2}
          contentContainerStyle={styles.cardContainer}
        />
      </SafeAreaView>
    );
  }
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 16,
    paddingHorizontal: 8,
    fontWeight:'bold',
    borderWidth:2,
    borderColor:'#6495ed',
   
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    marginLeft: 8,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  cardContainer: {
    justifyContent: 'space-between',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    width: 150,
    marginLeft: 8,
  },
});

export default HomeScreen;
