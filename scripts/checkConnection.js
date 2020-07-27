async function checkConnection(url) {
    return await fetch(url)
    .then(response => {
        return true;
    })
    .catch(err=>{
        return false;
    })                
}

module.exports = checkConnection;
