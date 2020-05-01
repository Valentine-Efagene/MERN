const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const GraphQLDate = new GraphQLScalarType({
  parseValue(value) {
    const dateValue = new Date(value);
    return Number.isNaN(dateValue.getTime()) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.Kind === Kind.STRING) {
      const value = new Date(ast.value);
      return Number.isNaN(value.getTime()) ? undefined : value;
    }
    return undefined;
  },
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
});

module.exports = GraphQLDate;
