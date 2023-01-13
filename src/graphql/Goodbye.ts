import { extendType, nonNull, stringArg } from 'nexus';
import { goodbyeResponse } from '../utilities/hello';

export const GoodbyeQuery = extendType({
	type: 'Query',
	definition(t) {
		t.field('goodbye', {
			type: 'String',
			args: {
				name: nonNull(stringArg()),
			},
			resolve(_root, args: { name: string }) {
				const { name } = args;
				return goodbyeResponse(name);
			},
		});
	},
});
