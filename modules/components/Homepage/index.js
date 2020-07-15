import React, {useState, useEffect} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import styled from 'styled-components';
import {getAllImages} from '../../common/utils';
import ImageCard from '../ImageCard';
import ImageModal from '../ImageModal';

const Heading = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 5%;
  text-align: center;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const Homepage = () => {
  const [selectedItem, setItem] = useState(null);
  const [imagesList, setImagesList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    retrieveImages(page);
  }, [page]);

  const renderItem = ({item}) => {
    return (
      <ImageCard
        item={item}
        onPress={() => {
          setOpenModal(true);
          setItem(item);
        }}
      />
    );
  };

  const retrieveImages = (pageNumber) => {
    setLoading(true);
    getAllImages(pageNumber).then((result) => {
      const images = [...imagesList, ...result];
      setImagesList(images);
    });
  };

  const renderFooter = () => {
    if (!loading) {
      return null;
    }
    return <ActivityIndicator color="black" size="large" />;
  };

  return (
    <>
      <Heading>INFINITE IMAGES LIST</Heading>
      <Container>
        <FlatList
          data={imagesList}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={() => setPage(page + 1)}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.1}
        />
        <ImageModal
          open={openModal}
          setOpenModal={setOpenModal}
          selectedItem={selectedItem}
        />
      </Container>
    </>
  );
};

export default Homepage;
