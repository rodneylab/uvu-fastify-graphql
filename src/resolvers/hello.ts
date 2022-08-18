import { Arg, Query, Resolver } from 'type-graphql';
import { goodbyeResponse } from '../utilities/hello';

@Resolver()
export class HelloResolver {
	@Query(() => String)
	hello() {
		return 'Hello everybody!';
	}

	@Query(() => String)
	goodbye(@Arg('name') name: string) {
		return goodbyeResponse(name);
	}
}

export { HelloResolver as default };
