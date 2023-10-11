import { createClient } from 'next-sanity'
import imageUrlBuider from '@sanity/image-url'

// import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2021-08-31', 
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true,
})

const builder = imageUrlBuider(client);

export const urlFor = (source) => builder.image(source);