import React from 'react';
import {View, Text} from 'react-native';
import {useState} from 'react';

const ErrorPage = () => {
  const [texto, setTexto] = useState('DEU RUIM!');

  return (
    <View>
      <Text>{texto}</Text>
    </View>
  );
};

export default ErrorPage;
