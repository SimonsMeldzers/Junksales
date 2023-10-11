import Grid from '@mui/material/Unstable_Grid2';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { client, urlFor } from "../../sanity/lib/client";

import Image from "next/image";
import Logo from "../img/logo.png"
import Link from "next/link";
import { Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


const theme = createTheme({
  palette: {
    primary: {
      main: "#407C86",
      contrastText: "#f9f9f9",
      color: "#f9f9f9",
    },
    secondary: {
      main: "#A5DBDD",
      contrastText: "#f9f9f9",
    },
    info: {
      main: "#f9f9f9",
      contrastText: "#000000",
    }
  },
  typography: {
    fontFamily: `"Raleway"`,
    fontWeightRegular: 400,
  },
});

export default function Home({ item }) {
    const router = useRouter();
    const [filteredItems, setFilteredItems] = useState([]);


    useEffect(() => {
      let itemCategory = router.asPath.replace(/^\/\?/, '');
      if (itemCategory === '/') {
        itemCategory = '';
      }
      let filteredItems = item;

      if (itemCategory !== '') {
        filteredItems = filteredItems.filter((item) => item.type === itemCategory);
      }

      setFilteredItems(filteredItems);
    }, [item, router.asPath]);

    console.log(filteredItems)
  return (
    <ThemeProvider theme={theme}>

      <div className="main">
        <div className="container">
          <div className="navbar">
            <Link href="/">
              <Image src={Logo} width={90} alt="logo"/>
            </Link>
          </div>

          <Grid container className="categories" spacing={2}>
              
            <Grid><Button variant='contained' className='category-button'> Viss </Button></Grid>
            <Grid><Button variant='contained' className='category-button'> Būvmateriāli </Button></Grid>
            <Grid><Button variant='contained' className='category-button'> Auto detaļas </Button></Grid>
            <Grid><Button variant='contained' className='category-button'> Lauksaimniecība </Button></Grid>
            <Grid><Button variant='contained' className='category-button'> Mājai </Button></Grid>
            <Grid><Button variant='contained' className='category-button'> Cits </Button></Grid>

          </Grid>

          <Grid container className="items" gap={2}>
            {filteredItems.map((item) => (
              <Grid 
                xl={3}
                lg={3}
                md={3}
                sm={6}
                xs={6}
                className="items-item"
                key={item._rev}
              >
                <Link href="/">
                  <img 
                    src={urlFor(item.image[1] || item.image[0])}
                    alt={item._key}
                    className='items-item-img'
                    key={item._rev}
                  />
                  <Typography variant='subtitle1' component='h1' className='items-item-name'>{item.name}</Typography>
                  <Typography variant='subtitle1' component='h2' className='items-item-address'>{item.address}</Typography>
                  <Typography variant='subtitle1' component='p' className='items-item-price'>{item.price}€</Typography>
                </Link>

              </Grid>
            ))}
            
          </Grid>

        </div>
      </div>

    </ThemeProvider>

  )
}

// export const getStaticProps = async () => {
//   const itemsQuery = `*[_type == "item"]`;
//   const items = await client.fetch(itemsQuery);

//   return {
//     props: {
//       items,
//     },
//   };
// };

export const getServerSideProps = async () => {
  const query = `*[_type == "item"]`;
  const item = await client.fetch(query);

  return{
    props: { item }
  }
}
