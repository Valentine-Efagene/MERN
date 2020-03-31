const fs = require('fs');
const { GraphQLScalarType } = require('graphql');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { Kind } = require('graphql/language');

let aboutMessage = "Issue Tracker API v1.0";

const issuesDB = [
  {
      id: 1, 
      status: 'New',
      owner: 'Ravan',
      effort: 5,
      created: new Date('2018-08-15'),
      due: undefined,
      title: 'Error in console when clicking Add'
  },
  {
      id: 2, 
      status: 'Assigned',
      owner: 'Eddie',
      effort: 14,
      created: new Date('2018-08-16'),
      due: new Date('2018-08-30'),
      title: 'Missing bottom border on panel'
  }
];

const GraphQLDate = new GraphQLScalarType({ 
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
  },
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  }
});

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList
  },
  Mutation: {
    setAboutMessage,
    issueAdd
  },
  GraphQLDate
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

function issueAdd (_, {issue}) {
  issue.created = new Date();
  issue.id = issuesDB.length + 1;
  if (issue.status == undefined) issue.status = 'New';
  issuesDB.push(issue);
  return issue;
}

function issueList() {
  return issuesDB;
}

const server = new ApolloServer({
  typeDefs : fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers
});

const app = express();
app.use(express.static('public'));
server.applyMiddleware({app, path: '/graphql'});

app.listen(3000, function() {
  console.log('App started on port 3000');
})


app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.get('/echo/:msg', (req, res) => {
  res.send(req.params.msg);
});