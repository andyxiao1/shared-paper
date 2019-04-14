import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import { getPapers, removeCanvas } from '../api';
import { onSignOut } from '../auth';

export default class CanvasIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      papers: [],
      isAddVisible: false,
      isRemoveVisible: false
    };
  }

  componentDidMount() {
    getPapers(papers => {
      this.setState({ papers });
    });
  }

  FlatListItemSeparator = () => <View style={styles.line} />;

  signOut() {
    onSignOut().then(() => this.props.navigation.navigate('Auth'));
  }

  renderItem = paper => (
    <TouchableOpacity
      style={styles.list}
      onPress={() => {
        this.props.navigation.navigate('Canvas', { paperName: paper.item });
      }}
    >
      <Text style={styles.lightText}>{paper.item}</Text>
    </TouchableOpacity>
  );

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Papers</Text>
        {this.FlatListItemSeparator()}
        <FlatList
          style={{ flex: 9 }}
          data={this.state.papers}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          renderItem={paper => this.renderItem(paper)}
          keyExtractor={item => item}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'flex-end'
          }}
        >
          <Icon
            reverse
            raised
            name="ios-log-out"
            type="ionicon"
            color="#517fa4"
            size={30}
            onPress={() => this.signOut()}
          />
          <Icon
            reverse
            raised
            name="ios-remove"
            type="ionicon"
            color="#517fa4"
            size={30}
            onPress={() => this.setState({ isRemoveVisible: true })}
          />
          <Icon
            reverse
            raised
            name="ios-add"
            type="ionicon"
            color="#517fa4"
            size={30}
            onPress={() => this.setState({ isAddVisible: true })}
          />
        </View>
        <DialogInput
          isDialogVisible={this.state.isRemoveVisible}
          title={'Remove Paper'}
          hintInput={'Paper Name'}
          submitInput={inputText => {
            removeCanvas(inputText);
            getPapers(papers => {
              this.setState({ papers });
            });
            this.showDialog();
          }}
          closeDialog={() => {
            this.showDialog();
          }}
        />
        <DialogInput
          isDialogVisible={this.state.isAddVisible}
          title={'Create/Join Paper'}
          hintInput={'Paper Name'}
          submitInput={inputText => {
            this.addPaper(inputText);
            this.showDialog();
          }}
          closeDialog={() => {
            this.showDialog();
          }}
        />
      </View>
    );
  }

  showDialog() {
    this.setState({ isAddVisible: false, isRemoveVisible: false });
  }

  addPaper(paper) {
    this.props.navigation.navigate('Canvas', { paperName: paper });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#192338',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  list: {
    paddingVertical: 15,
    margin: 3,
    flexDirection: 'row',
    backgroundColor: '#192338',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: -1
  },
  lightText: {
    color: '#f7f7f7',
    paddingLeft: 15,
    fontSize: 25
  },
  line: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  title: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 30,
    color: 'gray',
    margin: 20
  }
});
