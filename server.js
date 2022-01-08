const { localsName } = require('ejs')
let express = require('express')
let app = express()
let session = require('express-session')
const { redirect } = require('express/lib/response')
const User = require('./classes/user')
// ejs use
app.set('view engine','ejs')

// session init
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// midllewear for hadling form post
app.use(require("./middlewares/flash"))
app.use(express.static(__dirname + '/views'))

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

// routing
app.get('/', (req,res)=>{
    //console.log(res.locals.flash.connected)
    try {
        if (res.locals.flash.connected!=undefined) {
            //console.log('waaaaa')
            res.redirect("/home")
        }else{
            res.render('./sign-in');
        }
    } catch (error) {
        res.render('./sign-in');
    }
})
app.get('/home', (req,res)=>{
    //console.log(res.locals.flash)
    let Posts=require('./classes/posts')
    if (res.locals.flash.connected!=undefined) {
        Posts.GetPosts((results)=>{
            res.render('./index',{infos:{name:'moha', following: 50, followers:50}, PostList: results});
        })
    }else{
        req.flash('erreur',"must connect first")
        res.redirect("./")
    }
})
app.get('/disconnect', (req,res)=>{
    req.session.flash.connected=undefined
    res.redirect('./')
})
app.post('/',(req,res)=>{
    //console.log("bla")
    if (req.body.username==='' || req.body.username===undefined || req.body.password==='' || req.body.password===undefined) {
        req.flash('erreur',"must fill fields")
        res.redirect("./")
    }else{
        let User=require('./classes/user');
        User.GetConnected(req.body.username,req.body.password,(result)=>{
            if(result.isconnected===1){
                req.flash('connected',result.isconnected)
                res.redirect("./home")
            }else{
                req.flash('erreur',"Wrong UserName Passeword")
                res.redirect("./")
            }
        })
    }
})
app.listen(8080)