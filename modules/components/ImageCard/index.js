import React from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';

import styled from 'styled-components';

const ITEM_WIDTH = Dimensions.get('window').width;

const Card = styled.View`
  width: ${(ITEM_WIDTH - 30) / 2};
  background: white;
  height: 200px;
  elevation: 2;
  margin-top: 4%;
  border-radius: 3px;
  margin-left: 10px;
  margin-bottom: 20px;
`;

const CustomImage = styled.Image`
  width: 100%;
  height: 75%;
  resize-mode: cover;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
`;

const ImageDescription = styled.Text`
  height: 25%;
  width: 90%;
  overflow: hidden;
  font-size: 15px;
  margin-left: 2%;
  margin-right: 2%;
  text-align: center;
  text-align-vertical: center;
`;

const ImageCard = ({item, onPress}) => (
  <TouchableOpacity onPress={() => onPress()}>
    <Card>
      <CustomImage source={{uri: item.download_url + '.jpg'}} />
      <ImageDescription numberOfLines={1} ellipsizeMode="tail">
        {item.author}
      </ImageDescription>
    </Card>
  </TouchableOpacity>
);

export default ImageCard;
