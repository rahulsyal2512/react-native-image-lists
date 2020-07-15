import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Share,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from '@react-native-community/cameraroll';

const ImageModal = (props) => {
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'This app needs access to your storage to download Photos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //Once user grant the permission start downloading
          downloadImage();
        } else {
          //If permission denied then show alert 'Storage Permission Not Granted'
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        //To handle permission related issue
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    let date = new Date();
    let image_URL = `${props.selectedItem.download_url}`;
    const {config, fs} = RNFetchBlob;

    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          'file:/' +
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2),
        appendExt: 'jpg',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        CameraRoll.saveToCameraRoll(res.data, 'photo')
          .then((resu) => console.log(resu))
          .catch((errr) => console.log(errr));
        console.log(JSON.stringify(res));
      });
  };

  const getExtention = (filename) => {
    //To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${props.selectedItem.download_url}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={props.open}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              style={styles.openButton}
              onPress={checkPermission}>
              <Text style={styles.textStyle}>Download Image</Text>
            </TouchableHighlight>

            <TouchableHighlight style={styles.openButton} onPress={onShare}>
              <Text style={styles.textStyle}>Share Image</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => {
                props.setOpenModal(!props.open);
              }}>
              <Text style={styles.crossButtonText}>x</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#ffffff8c',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  crossButtonText: {
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 10,
    color: 'black',
  },
});

export default ImageModal;
