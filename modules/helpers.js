module.exports = {
  delay: async ( ms ) => {
    return new Promise( resolve => setTimeout( resolve, ms ) );
  }
};
