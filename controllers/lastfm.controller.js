const config = require('../config');
const axios = require('axios');

module.exports = {

    lastActivity: async function(req, res) {

        var user = req.params.user ? req.params.user : 'skorotkiewicz';
        var fullname = req.query.fullname ? req.query.fullname : '';
        var avatar = req.query.avatar ? req.query.avatar : '';
        
        await axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${config.api}&format=json`)
        .then(response => {

            var recenttracks = response.data.recenttracks.track;

            res.setHeader('Cache-Control', 's-maxage=300');
            return res.status(200).render('lastfm', { tracks: recenttracks, cached: new Date().getTime(), user: user, fullname: fullname, avatar: avatar });

        }, error => {
          console.log(error);
        });        
        

    }

}