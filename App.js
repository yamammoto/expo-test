import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Container, Header, Form, Item, Input, Label, Button, CheckBox } from 'native-base';


export default class App extends Component {
  state = {
    title: '',
    content: '',
    todos: [],
  }

  todoList() {
    const { todos } = this.state;
    let list = [];
    if (todos.length <= 0) {
      list = <Text style={{ textAlign: 'center' }}>GIT と連携</Text>
    } else {
      for (const [i, t] of todos.entries()) {
        list = [
          ...list, 
          <TouchableOpacity style={styles.list} key={i}>
            <View style={styles.listBox}>
              <View style={styles.titleBox}>
                <CheckBox
                  color='#399392'
                  style={styles.check}
                  onPress={() => this.onCheckTodo(i)}
                  checked={t.check}
                />
                <Text style={styles.listTitle} >
                  TITLE: {t.title}
                </Text>
              </View>
              <Text style={styles.listContent} >
                CONTENT: {t.content}
              </Text>
            </View>
          </TouchableOpacity>
        ]
      }
    }
    return (<View>{list}</View>)
  }

  pressButton() {
    const { title, content, todos } = this.state;
    const todo = {
      title: title,
      content: content,
      check: false,
    };
    this.setState({
      todos: [...todos, todo],
      content: '',
      title:''
    });
    Alert.alert('確認', '登録しました。')
  }

  onCheckTodo(index) {
    const { todos } = this.state;
    todos[index].check = !todos[index].check
    this.setState({ todos });
  }

  render() {
    const { content, title } = this.state;
    return (
      <Container>
        <Header />
        <View style={styles.formContainer}>
          <Form style={styles.form}>
            <Item floatingLabel>
              <Label style={styles.colorW} >title</Label>
              <Input
                onChangeText={(input) => this.setState({ title: input })}
                value={title}
              />
            </Item>
            <Item floatingLabel last>
              <Label style={styles.colorW} >content</Label>
              <Input
                onChangeText={(input) => this.setState({ content: input })}
                value={content}
              />
            </Item>
            <View style={styles.buttonArea} >
              <Button
                small
                block
                style={styles.button}
                onPress={() => this.pressButton()}
              >
                <Text>Submit</Text>
              </Button>
            </View>
          </Form>
        </View>
        <ScrollView style={styles.listContainer}>
          {this.todoList()}
        </ScrollView>
      </Container>
    );
  }
}



const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    padding: 20,
    height: '30%',
    width: '100%',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    height: '70%',
    backgroundColor: '#ffffff',
  },
  form: {
    backgroundColor: '#399392',
    width: '80%',
    padding: 20,
    color: '#ffffff'
  },
  colorW: {
    color: '#ffffff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#ffffff'
  },
  buttonArea: {
    height: 50,
    width: '100%',
  },
  list: {
    flex: 1,
    backgroundColor: '#399392',
    borderBottomWidth: 2,
    borderColor: '#ffffff',
    padding: 10,
  },
  listBox: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 10
  },
  listTitle: {
    flex: 1,
    color: '#399392',
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#399392',
    marginLeft: 40,
  },
  check: {
    marginRight: 10,
    position: 'absolute',
    bottom: 0,
    color: '#399392'
  },
  listContent: {
    flex: 1,
    color: '#399392',
    fontSize: 15,
    paddingTop: 10,
  },
  titleBox: {
    flexDirection: 'row',
    flex: 1,
  }
});
