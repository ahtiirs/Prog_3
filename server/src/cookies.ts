import {Request, Response, } from 'express';

var myCookie = function (req: Request, res: Response, next: any ){
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)
 
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
    next()
  }

export default myCookie;
