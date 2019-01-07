const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

  // 1a - store in-memory in leiu of a database:
  // let links = [{
  //   id: 'link-0',
  //   url: 'www.howtographql.com',
  //   description: 'Fullstack tutorial for GraphQL'
  // }]
  // let idCount = links.length;

  // 2 - resolver is the implementation of the schema
  const resolvers = {
    Query,
    Mutation,
    User,
    Link
  }
  // const resolvers = {
  //   Query: {
  //     info: () => 'This is the API of a Hackernews clone', //resolver for 'info' in schema
  //     info2: () => 'info 2',
  //     feed_mock: () => links, //resolver for 'feed' in schema
  //     // moved feed resolver to src/resolvers/Query.js
  //   },

  //   Mutation: {
  //     post: (parent, args, context) => {
  //       return context.prisma.createLink({
  //         url: args.url,
  //         description: args.description,
  //       })
  //       // const link = {
  //       //   id: `link-${idCount++}`,
  //       //   description: args.description,
  //       //   url: args.url,
  //       // }
  //       // links.push(link)
  //       // return link
  //     },
  //     deleteLink: (parent, args) => {
  //       let link;
  //       for(let i = 0; i < links.length; i++) {
  //         if(links[i].id === args.id) {
  //           links.splice(i, 1)
  //           link = links[i]
  //         }
  //       }
  //       return link
  //     }
  //   }

  //   //3 resolvers for each field on the Link type (simple - not needed)
  //   // Link: {
  //   //   id: (parent) => parent.id,
  //   //   description: (parent) => parent.description,
  //   //   url: (parent) => parent.url,
  //   // }
  // }

  // 3 - schema/resolver bundled + passed to GQL server (yoga)
  const server = new GraphQLServer({
    typeDefs: './src/schema.graphql', //schema now in seperate file
    resolvers,
    context: request => { 
      return {
        ...request,
        prisma,
      }
    },
  })
  server.start(() => console.log(`Server is running on http://localhost:4000`))
  