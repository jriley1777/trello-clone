import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_UNSPLASH_API_KEY! });

export {
    unsplash,
    toJson
};