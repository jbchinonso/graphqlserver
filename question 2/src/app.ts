import createError,{HttpError} from 'http-errors';
import express, {Request, Response, NextFunction} from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { graphqlHTTP } from "express-graphql"
import mutation from "./schema/mutations"
import query from "./schema/queries"
import { GraphQLSchema } from 'graphql';

const schema = new GraphQLSchema({
  query,
  mutation
})




const app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/graphql2', graphqlHTTP({
  schema,
  graphiql: true
}))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err:HttpError, req:Request, res:Response, next:NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
