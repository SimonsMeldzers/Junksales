import { useEffect, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { client, urlFor } from "../../../sanity/lib/client";

import Link from "next/link";
import { Button, Typography } from '@mui/material';

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
const libraries = ["places"];

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper/modules";

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import RoomIcon from '@mui/icons-material/Room';
import CancelIcon from '@mui/icons-material/Cancel';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


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

function Map({ center }) {

    return (
      <GoogleMap className='slug-map' zoom={14} center={center} mapContainerClassName="map-container">
        <MarkerF position={center} />
      </GoogleMap>
    );
   }

export default function ItemDesc({ item }) {
    // For Expandable details text
    const [expanded, setExpanded] = useState(false);

    const handleExpandedChange = () => {
      setExpanded(true);
    };

    
    //Google Maps
    const [center, setCenter] = useState(null);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    
    const geocodeAddress = async (address) => {
        try {
            const geocoder = new window.google.maps.Geocoder();
            const results = await new Promise((resolve, reject) => {
                geocoder.geocode({ address }, (results, status) => {
                    if (status === window.google.maps.GeocoderStatus.OK) {
                        resolve(results);
                    } else {
                        reject(status);
                    }
                });
            });
            
            const { geometry } = results[0];
            const { lat, lng } = geometry.location;
            return { lat: lat(), lng: lng() };
        } catch (error) {
            console.error("Geocoding error:", error);
            return null;
        }
    };
    
    useEffect(() => {
        if (isLoaded && !loadError) {
            if (item?.address) {
                geocodeAddress(item?.address)
                .then((coordinates) => {
                    if (coordinates) {
                        setCenter(coordinates);
              } else {
                  console.error("Invalid address");
                }
            })
            .catch((error) => {
                console.error("Geocoding error:", error);
            });
        }
        }
    }, [isLoaded, loadError, item?.address]);

    useEffect(() => {
        if(item?.details.length < 430){
            setExpanded(true);
        }
    }, [])

    if (loadError) {
        return <div>Error loading Google Maps</div>;
    }

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      };

return (
    <ThemeProvider theme={theme}>

      <div className="slug">
        <span className="s-img" style={{backgroundImage: `url(${urlFor(item?.image[0] || item?.image[1])})`}}></span>
        <div className="s-img-container">
            <Link className="s-img-link" href='/'>
              <CancelIcon className="s-img-close"/>
            </Link>
            <div className="s-img-sub-container">
                <Swiper
                    navigation={true}
                    pagination={pagination}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                >
                    {item?.image.map((image, i) => (
                        <SwiperSlide className="swiper-slide" key={image._key}>
                            <img className="swiper-slide-img" src={urlFor(image)} alt={image._key} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        
        </div>
        <div className="s-text">
            <Typography className="s-text-name" variant="subtitle1" component="h1">
                {item?.name}
            </Typography>
            <Link className="s-text-link" href={`/?${item?.type}`}>
                <Typography className="s-text-category" variant="subtitle1" component="h2">
                    {
                        item?.type === "CarParts" ?
                        "Auto detaļas" :
                        item?.type === "ConstructionMaterials" ?
                        "Būvmateriāli" :
                        item?.type === "FarmItems" ?
                        "Lauksaimniecība" : 
                        item?.type === "ForHome" ?
                        "Mājai" :
                        "Cits"
                    }
                </Typography>
            </Link>
            <Typography className="s-text-price">
                {item?.price}€
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
                    item?.state === "New" ?
                    "Jauns" :
                    item?.state === "Used" ?
                    "Lietots" :
                    item?.state === "VeryUsed" ? 
                    "Stipri Lietots" : 
                    ""
                }
            </Typography>

            <div className={`slug-text-desc ${expanded === false ? 'gradient-text' : ''}`}>
              {expanded === false
                ? item?.details
                    .slice(0, 430)
                    .split(';')
                    .map((substring, index) => (
                      <div key={index}>
                        {substring}
                        {index < item.details.split(';').length - 1 && <br />} {/* Add line break except for the last substring */}
                      </div>
                    ))
                : item?.details.split(';').map((substring, index) => (
                    <div key={index}>
                      {substring}
                      {index < item.details.split(';').length - 1 && <br />} {/* Add line break except for the last substring */}
                    </div>
                  ))}
            </div>
            <Button className={`slug-text-desc-button ${expanded === false ? '' : 'hide-button'}`} onClick={() => { handleExpandedChange()}} color='primary' variant="contained"> Lasīt visu </Button>
                
            <div>
                {!isLoaded ? <div>Loading...</div> : center ? <Map center={center} /> : <div>Invalid address</div>}
            </div>
            
            <div style={{display: 'flex', marginTop: '5px'}}>
                <RoomIcon style={{color: "#407C86"}}/>
                <Typography style={{color: "#407C86"}}>
                    {item?.address}
                </Typography>
            </div>



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
        slug: item?.slug.current,
      },
    }));
  
    return {
      paths,
      fallback: 'blocking',
    };
  };
