exports.get_404 = (req, res ,next) => {
    // add layout property to use layout or not to
    res.status(404).render('404', {
        pageTitle: '404', 
        path: 'none'
    });
};