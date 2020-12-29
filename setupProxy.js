import proxy from 'http-proxy-middleware'

export default (app)=>{
    app.use(proxy('','localhost:9000'))
}