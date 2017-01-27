Redshirts.debug = function(flag, message) {
    if (Redshirts.config.debug[flag]) {
        console.log(message);
    }
}
