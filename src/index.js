

const resolvers = { 
  }
 

const project = 'prisma';
const stage = 'dev2';
 


 
const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
 
 
 

const start = async () => {


  const db = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4477/prisma/dev2',
    secret: 'mysecret123',
    debug: false,
  });

 
  const context = async options => {

    const {
      request,
      response,
    } = options || {};

 

    return {
      ...options,
      db, 
    };

  };



  const server = new GraphQLServer({
    typeDefs: 'src/schema/schema.graphql',
    resolvers,
    context,
  })

  server 
    // .start(() => console.log('Server is running on http://localhost:4000'))
    .start(async () => {
 
 
      console.log(`Server is running on http://${process.env.HOST || "localhost"}:${process.env.PORT || 4000}`);

    })

}

start();

