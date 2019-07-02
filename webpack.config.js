var path = require('path');

module.exports={
    entry:"./app/clientside/scripts/app.js",
    output:{
        path:path.resolve(__dirname,"./app/public/scripts"),
        filename:"App.js"
    },
    module:{
        loaders:[
            {
                loader:'babel-loader',
                query:{
                    presets:['es2015']
                },
                test:/\.js$/,
                exclude:/node_modules/
            }
        ]
    }
}