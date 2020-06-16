import React, {useState, useContext, useEffect} from 'react'
import {withRouter} from 'react-router';
import './Home.css';
import Typography from '@material-ui/core/Typography';
import { getProducts, getStores } from '../../service/product-service';
import ProductList from '../ProductsList/ProductsList'
import StoreList from '../StoreList/StoreList'
import Total from '../Product/Total.jsx';
import { CoordenadasContext } from '../../context/location-context';
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';

const Home = () =>{
  const [coord] = useContext(CoordenadasContext)
  let [total, setTotal] = useState(0)
  const [productList, setProductList] = useState([])
  const [storeList, setStoreList] = useState([])
  const [setError] = useState("")
  const { t } = useTranslation();


  useEffect(() => {    
    async function fetchData() {
    await getStores(coord.lat,coord.lng)
    //await getStores(-58.258655, -34.721533)
      .then(response => setStoreList(response.data ))

    await getProducts(coord.lat,coord.lng)
    //await getProducts(-58.258655, -34.721533)
       .then(response => setProductList(response.data ))
    }
    fetchData();
  },[coord, setError, setStoreList, setProductList] );

  const addProduct = (product) => {
    setProductList({
      productList: productList.push(product)
    });
  }

  const addStore = (store) => {
    setStoreList({
      storeList: storeList.push(store)
    });
  }

  const calculateTotal = (price) => {
    setTotal(total + price);
  }
  
  const RenderProducts=  ()=> {
    return (
          <ProductList products = {productList}
          calculateTotal = {calculateTotal} ></ProductList>
    )
  }

  const RenderStores=  ()=> {
    return (
      <StoreList stores = {storeList} ></StoreList>
    )
  }


  return (
    <Box>
      <Box className= "coordenadas">
        <div> Longitude: {coord.lng} | Latitude: {coord.lat} </div>
      </Box>  
      <Typography variant="h4">{t("Home.Stores")} </Typography>
      <Grid container spacing={2}>
      {storeList ? <RenderStores> </RenderStores> : <p>{t("Home.SearchingStores")}</p>}
      </Grid>
      <Typography variant="h4">{t("Home.Products")}</Typography>
      <Box className="products" >
        <RenderProducts ></RenderProducts>
      </Box>
      <Total total = {total} />

    </Box>
  );
}
export default withRouter(Home);