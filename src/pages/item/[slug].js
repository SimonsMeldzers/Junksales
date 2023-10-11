import { createTheme, ThemeProvider } from "@mui/material/styles";
import { client, urlFor } from "../../../sanity/lib/client";

import Link from "next/link";
import { Button, Typography } from '@mui/material';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { useEffect, useState } from "react";


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

export default function ItemDesc({ item }) {
    // For Expandable details text
    const [expanded, setExpanded] = useState(false);

    const handleExpandedChange = () => {
      setExpanded(true);
    };

    useEffect(() => {
        if(item.details.length < 430){
            setExpanded(true);
        }
    }, [])
    

  return (
    <ThemeProvider theme={theme}>

      <div className="slug">
        <div className="s-img" style={{backgroundImage: `url(${urlFor(item.image[0] || item.image[1])})`}}>

        </div>
        <div className="s-text">
            <Typography className="s-text-name" variant="subtitle1" component="h1">
                {item.name}
            </Typography>
            <Link className="s-text-link" href={`/?${item.type}`}>
                <Typography className="s-text-category" variant="subtitle1" component="h2">
                    {
                        item.type === "CarParts" ?
                        "Auto detaļas" :
                        item.type === "ConstructionMaterials" ?
                        "Būvmateriāli" :
                        item.type === "FarmItems" ?
                        "Lauksaimniecība" : 
                        item.type === "ForHome" ?
                        "Mājai" :
                        "Cits"
                    }
                </Typography>
            </Link>
            <Typography className="s-text-price">
                {item.price}€
            </Typography>

            <Typography style={{fontWeight: "600"}}> 
                Sazināties:
            </Typography>

            <div style={{display: 'flex', marginTop: '5px'}}>
              <LocalPhoneIcon/>
              <p style={{marginLeft: '5px', marginTop: "1px"}}>+371 20116677</p>
            </div>
            <div style={{display: 'flex', marginTop: '5px'}}>
              <EmailIcon/>
              <p style={{marginLeft: '5px', marginTop: "2px"}}>ivonaplus@inbox.lv</p>
            </div>
            
            <Typography style={{fontWeight: "600", marginTop: "12px"}}> 
                Apraksts:
            </Typography>

            <Typography style={{marginTop: "5px", marginBottom: "5px"}}>
                <span style={{fontWeight: "500", marginRight: "5px"}}>Stāvoklis: </span>
                {
                    item.state === "New" ?
                    "Jauns" :
                    item.state === "Used" ?
                    "Lietots" :
                    item.state === "VeryUsed" ? 
                    "Stipri Lietots" : 
                    ""
                }
            </Typography>

            <div className={`slug-text-desc ${expanded === false ? 'gradient-text' : ''}`} >
              {expanded === false ? item.details.slice(0, 430) + '...' : item.details}
            </div>
            <Button className={`slug-text-desc-button ${expanded === false ? '' : 'hide-button'}`} onClick={() => { handleExpandedChange()}} color='primary' variant="contained"> Lasīt visu </Button>


        </div>
      </div>

    </ThemeProvider>

  )
}

export const getStaticProps = async ({ params }) => {
    const { slug } = params;
    const query = `*[_type == "item" && slug.current == '${slug}'][0]`;
  
    const item = await client.fetch(query);
  
    return {
      props: {
        item,
      },
    };
  };
  
  export const getStaticPaths = async () => {
    const query = `*[_type == "item"] {
      slug {
        current
      }
    }`;
  
    const items = await client.fetch(query);
  
    const paths = items.map((item) => ({
      params: {
        slug: item.slug.current,
      },
    }));
  
    return {
      paths,
      fallback: 'blocking',
    };
  };
