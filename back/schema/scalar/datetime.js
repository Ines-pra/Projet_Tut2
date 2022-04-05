const { GraphQLScalarType, Kind } = require('graphql');

module.exports = {
    DateTime: new GraphQLScalarType(
        {
            name: 'DateTime', 
            description: 'A valid DateTime',


            parseValue(value){
                return new date(value);
            },
            parseLiteral(ast){
                if (ast.kind === Kind.INT) {
                    return new Date(parseInt(ast.value, 10));
                  }
                return null;
            },
            serialize(value){
                const date = new Date(value);

                return date.toISOString();
            }

        }
    )
}