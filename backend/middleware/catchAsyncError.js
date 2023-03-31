// for Async Eroor Handler
module.exports=theFunc=>(req ,res ,next )=>{

    Promise.resolve(theFunc(req ,res,next)).catch(next)
}
