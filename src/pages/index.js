import Grid from '@mui/material/Unstable_Grid2';

import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { client, urlFor } from "../../sanity/lib/client";

import Image from "next/image";
import Logo from "../img/logo.png"
import Link from "next/link";
import { Button } from '@mui/material';


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

export default function Home() {
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

          <Grid container className="items" spacing={2}>
            <Grid md={3}> </Grid>
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
