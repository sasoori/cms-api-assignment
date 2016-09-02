exports.init = (server)=>{

    server.get('/', (req, res)=>{

        res.render('home',{});

    });

};