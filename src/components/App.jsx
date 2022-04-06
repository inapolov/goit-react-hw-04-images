import {useState,useEffect} from "react";
import Searchbar from './Searchbar';
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Loader from "./Loader";
import Modal from "./Modal";
import fetchApi from "./fetchApi/fetchApi";

import styles from './App.module.css';


function App(){

  const [imageRequest, setImageRequest] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [page, setPage] = useState(0);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    if (!imageRequest) {
      return;
    };

    setLoading(true);
    setVisibleButton(false);

    fetchApi(imageRequest, page)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        throw Error('There is no image');
      })
      .then(response => {
        if (response.totalHits - page * 12 < 12) {
          setVisibleButton(false);
        } else {
          setVisibleButton(true);
        }
        if (response.hits.length === 0) {
          setVisibleButton(false);
          alert(
            'There are no images for this request, try another name'
          );
          setLoading(false);
          return;
        }
        setData(prevState => [...prevState, ...response.hits]);
        setLoading(false);
      })
      .catch(error => setError(error));
    
  }, [imageRequest, page]);  


  const handleFormSubmit = imageRequest => {
    setImageRequest(imageRequest);
    setData([]);
    setPage(1);
    setVisibleButton(true);
    
  };

  const handleButtonClick = () => {
    setPage(prevState => prevState + 1);
  };
  
  const toggleModal = largeImageURL => {

    setShowModal(prevState => !prevState);
    setLargeImageURL(largeImageURL);   
  };  
    
    return (
      <>
        <Searchbar onSubmit={handleFormSubmit} />
        {data.length !== 0 && (
          <ImageGallery data={data} onClick={toggleModal} />
        )}         
        <div className={styles.container}>
            {loading && <Loader />}
        </div>        
        <div className={styles.container}>
            {visibleButton && (
            <Button onClick={handleButtonClick} />
            )}
        </div>
         {showModal && (
          <Modal
            largeImageURL={largeImageURL}
            alt={imageRequest}
            onClose={toggleModal}
          />
        )}
        
      </>
    )
  

};

export default App;

